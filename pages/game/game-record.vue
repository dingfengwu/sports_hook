<template>
	<view class="game-record">
		<uni-nav-bar :title="$t('gameRecord.title')" shadow="false"></uni-nav-bar>
		<tabs :tab-list="tabList" :load-completed="loadCompleted" @refresh="refreshData" @load="loadData"
			@tabChanged="tabChanged" :show-completed="gameRecordList.length>0">
			<view class="swiper-header" v-if="gameRecordList.length>0">
				<text>{{$t("gameRecord.header",{total,amount,prize,currency_unit:systemConfig.currency_unit})}}</text>
			</view>
			<view v-for="(inner,idx) in gameRecordList" :key="idx" class="game-record-item" @click="openDetail(inner)">
				<view class="title">
					<view>{{inner.series}}</view>
					<view>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="content">
					<view class="l">
						<view>{{inner.lottery_name}}</view>
						<view class="way">{{inner.way}} @--%</view>
					</view>
					<view class="r">
						<image v-if="inner.prize!=='--'" src="../../static/game/win.png"></image>
					</view>
				</view>
				<view class="bottom">
					<view><text class="label">{{$t("gameRecord.betAmount")}}</text>
						{{systemConfig.currency_symbol}}{{inner.amount}}
					</view>
					<view><text class="label">{{$t("gameRecord.winAmount")}}</text>
						{{systemConfig.currency_symbol}}{{inner.prize}}
					</view>
				</view>
			</view>
			<empty v-if="this.loadCompleted&&gameRecordList.length===0"></empty>
		</tabs>
		
		<bottom-menu current="3"></bottom-menu>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import tabs from "../../components/common/tabs.vue";
	import {
		formatDate,
		addDays
	} from "../../common/js/util/util.js"
	import empty from "../../components/common/empty-list.vue"

	export default {
		components: {
			tabs,
			empty
		},
		data() {
			return {
				currentTab: 0,
				loadCompleted: false,
				tabList: [{
					name: this.$t("gameRecord.today")
				}, {
					name: this.$t("gameRecord.yesterday")
				}, {
					name: this.$t("gameRecord.thisWeek")
				}, {
					name: this.$t("gameRecord.lastWeek")
				}],
				filter: {
					lotteryId: "",
					page: 1,
					status: "",
					beginTime: "",
					endTime: "",
					isTeam: 0,
					username: ""
				}
			}
		},
		computed: {
			...mapGetters(["gameRecordList", "lotteryMenuList", "systemConfig", "gameRecordSummary"]),
			total() {
				return this.gameRecordSummary.total_count;
			},
			amount() {
				return 10000;
			},
			prize() {
				return 1000;
			}
		},
		methods: {
			...mapActions(["getProjectList"]),
			refreshData() {
				this.showDataList(1);
			},
			loadData() {
				this.showDataList(this.filter.page+1);
			},
			tabChanged(index) {
				this.currentTab = index;
				this.setFilterTime();
				this.showDataList(1);
			},
			setFilterTime() {
				let week = new Date().getDay();
				switch (this.currentTab) {
					case 0:
						this.filter.beginTime = formatDate(new Date(), "yyyy-MM-dd");
						this.filter.endTime = formatDate(addDays(new Date(), 1), "yyyy-MM-dd");
						break;
					case 1:
						this.filter.beginTime = formatDate(addDays(new Date(), -1), "yyyy-MM-dd");
						this.filter.endTime = formatDate(new Date(), "yyyy-MM-dd");
						break;
					case 2:
						this.filter.beginTime = formatDate(addDays(new Date(), 0 - week), "yyyy-MM-dd");
						this.filter.endTime = formatDate(addDays(new Date(), 7 - week), "yyyy-MM-dd");
						break;
					case 3:
						this.filter.beginTime = formatDate(addDays(new Date(), 0 - week - 7), "yyyy-MM-dd");
						this.filter.endTime = formatDate(addDays(new Date(), 0 - week), "yyyy-MM-dd");
						break;
				}
			},
			initFilter() {
				if (this.lotteryMenuList.length > 0) {
					let recommand = this.lotteryMenuList[0].lotteries;
					if (recommand.length > 0) {
						this.filter.lotteryId = recommand[0].lottery_id;
					}
				}
				this.setFilterTime();
			},
			showDataList(page) {
				this.loadCompleted = false;
				this.$showLoading();
				this.filter.page = page;
				this.getProjectList(this.filter).then(data => {
					this.$hideLoading();
					this.loadCompleted = data.completed;
				});
			},
			openDetail(item){
				this.$store.commit("setCurrentGameDetail",item);
				this.$push("/pages/game/game-detail");
			}
		},
		created() {

		},
		onShow() {
			this.initFilter();
			this.showDataList(1);
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.game-record {
		height: 100%;
		display: flex;
		flex-direction: column;

		/deep/ .uni-navbar {
			background-color: $uni-color-primary !important;
			color: #fff;
		}

		/deep/ .uni-navbar-header {
			color: #fff !important;
		}

		/deep/ .swiper-header {
			padding: 20upx;
			color: #999;
			font-size: 0.85em;
			background-color: #fff;
			border-radius: 20upx;
			margin: 20upx;
		}

		.game-record-item {
			margin: 20upx;
			padding: 20upx;
			background-color: #fff;
			border-radius: 20upx;
			overflow: hidden;

			.title {
				display: flex;
				justify-content: space-between;
				padding: 10upx;
				font-size: 0.9em;
				color: #777;

				.uni-icons {
					color: #777 !important;
				}
			}

			.content {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.l {
					.way {
						padding: 30upx;
						font-size: 1.1em;
					}
				}

				.r {
					image {
						width: 100upx;
						height: 100upx;
						transform: translateX(40upx);
					}
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				font-size: 0.8em;
				padding-top: 40upx;

				.label {
					color: #777;
					margin-right: 10upx;
					font-size: 1.2em;
				}
			}
		}
	}
</style>
