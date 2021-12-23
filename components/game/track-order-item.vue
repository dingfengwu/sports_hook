<template>
	<view class="track-order-item" @click="open">
		<view class="header">
			<text>{{item.game}}</text>
			<text>{{item|remainder}}</text>
		</view>
		<view class="body">
			<view class="title">
				<view class="l">
					<text>{{item.match}}</text>
				</view>
				<view class="r">
					<text class="site">{{item.way}}</text>
					<text class="status">{{item.formatted_status}}</text>
				</view>
			</view>
			<view class="content">
				<view><text class="label">{{$t("trackOrder.labelOrderNo")}}：</text>{{item.serial_number}}</view>
				<view><text class="label">{{$t("trackOrder.labelTradeTime")}}：</text>{{item.bought_at}}</view>
				<view><text class="label">{{$t("trackOrder.labelMarket")}}：</text>{{item.way}} {{item.bet_number}}
					@{{item.odds | formatOdds}}%</view>
				<view class="bottom">
					<text>{{$t("trackOrder.labelBetAmount")}}：{{systemConfig.currency_symbol}}{{item.amount | toThousandslsFilter}}</text>
					<text
						v-if="showPrize">{{$t("trackOrder.labelPrize")}}：{{systemConfig.currency_symbol}}{{item.prize | toThousandslsFilter}}</text>
					<text
						v-else>{{$t("trackOrder.labelExpectProfit")}}：{{systemConfig.currency_symbol}}{{item | expectProfit | toThousandslsFilter}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		getCurrentTime,
		formatDate
	} from "../../common/js/util/util.js"
	import vm from "../../main.js"
	import {
		MATCH_STATUS_MATCHING,
		MATCH_STATUS_BETABLE,
		MATCH_STATUS_FINISHED,
		SPORT_ALL_SITE_WAY_ID,
		SPORT_HALF_SITE_WAY_ID
	} from "../../common/js/util/const.js";
	import {
		ORDER_COMPLETED,
		ORDER_UNCOMPLETED
	} from "../../common/js/util/const.js";
	import {
		getHandFee
	} from "../../common/js/util/game.js";
	import {
		getSystemConfigCache
	} from "../../common/js/cache/config.js";
	export default {
		props: ["item", "openable"],
		data() {
			return {
				MATCH_STATUS_FINISHED,
				MATCH_STATUS_MATCHING,
				SPORT_ALL_SITE_WAY_ID,
				SPORT_HALF_SITE_WAY_ID
			}
		},
		filters: {
			status(val) {
				let now = getCurrentTime();

				if (MATCH_STATUS_MATCHING.indexOf(val.status) >= 0) {
					return vm.$t("game.matching");
				} else if (val.status === 7) {
					return vm.$t("game.finished");
				} else {
					return vm.$t("game.unstart");
				}
			},
			costTime(val) {
				if (!val || !val.time) return "";

				let now = getCurrentTime();
				let time = new Date(val.time.replace(/\-/g, "/"));
				let span = now.getTime() - time.getTime();
				span = parseInt(span / 1000 / 60);

				return `${span}'`;
			},
			remainder(val) {
				if (!val || !val.match_start_time) return "";

				let time = new Date(val.match_start_time.replace(/\-/g, "/"));
				return formatDate(time, "MM-dd HH:mm");
			},
			expectProfit(val) {
				if (!val || !val.amount) return "--";

				let systemConfig = getSystemConfigCache();
				let handleFee = getHandFee(val.amount, systemConfig.profit_fee_rules);
				if (handleFee.type === "rate") {
					return val.amount * val.odds * (1 - handleFee.value);
				} else {
					return val.amount * val.odds - handleFee.value;
				}
			}
		},
		computed: {
			...mapGetters(["config", "systemConfig"]),
			wayText() {
				if (this.item === undefined) return "";
				if (+this.item.wayId === SPORT_ALL_SITE_WAY_ID) {
					return this.$t("game.labeAllSite");
				} else if (+this.item.wayId === SPORT_HALF_SITE_WAY_ID) {
					return this.$t("game.labHalfSite");
				}
			},
			showPrize() {
				if (this.item === undefined) return false;
				if (ORDER_COMPLETED.indexOf(this.item.status) >= 0) return true;
				return false;
			}
		},
		methods: {
			open() {
				if (this.openable === false) return;

				let now = getCurrentTime();
				let time = new Date(this.item.time.replace(/-/igm, "/"));
				let span = now.getTime() - time.getTime();
				if (MATCH_STATUS_BETABLE.indexOf(this.item.status) >= 0) {
					if (span > 1 * 24 * 3600 * 1000) {
						console.warn("此场比赛超过一天未开始不能下注");
					} else {
						this.$store.commit("setCurrentMatch", this.item);
						this.$push("/pages/game/bet");
					}
				} else {
					uni.showToast({
						title: this.$t("game.stopSale"),
						icon: "error"
					});
				}

				this.$emit("open");
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.track-order-item {
		margin: 0upx 20upx 20upx 20upx;
		background-color: #fff;
		//padding-bottom: 20upx;
		@include primary-border-color;
		//border-color: #00562F;
		border-style: solid;
		border-width: 1upx;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;

		//border-bottom-left-radius: 15upx;
		//border-bottom-right-radius: 15upx;

		.header {
			padding: 10upx 10upx;
			//@include background-color;
			border-top-left-radius: 10upx;
			border-top-right-radius: 10upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			font-size: 1.2em;
			font-weight: 700;
			//background-color: #00562F;
			@include background-color;
		}

		.body {
			.title {
				display: flex;
				justify-content: space-between;
				padding: 10upx;

				.l {
					.vs {
						margin: 0 10upx;
					}
				}

				.r {
					width: 290upx;
					flex-shrink: 0;

					.status,
					.site {
						color: #a50000;
						border-radius: 5upx;
						padding: 5upx 10upx;
						background-color: #ffc6c6;
						margin-left: 10upx;
						min-width: 90upx;
						display: inline-block;
						text-align: center;
					}

					.site {
						color: #613086;
						background-color: #dcb0ff;
					}
				}
			}

			.content {
				padding: 10upx;
				display: flex;
				flex-direction: column;
				line-height: 2;
				font-size: 0.9em;

				text {
					display: inline-block;
					width: 140upx;
				}

				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					//background-color: #42C090;
					@include light-background-color;
					color: #fff;
					padding: 0 10upx;
					border-radius: 5upx;

					text {
						display: inline-block;
						width: inherit;
					}
				}
			}
		}
	}
</style>
