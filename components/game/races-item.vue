<template>
	<view class="item" @click="open">
		<view class="l">
			<image :src="item.master_logo"></image>
			<p>{{item.team_a}}</p>
			<p class="time">{{item|time}}</p>
		</view>
		<view class="m">
			<p>{{item.game}}</p>
			<p class="score" v-if="item.status===2">{{item.score_a}} - {{item.score_b}}</p>
			<p class="score vs" v-else>VS</p>
		</view>
		<view class="r">
			<image :src="item.client_logo"></image>
			<p>{{item.team_b}}</p>
			<p class="sale-volume" v-if="config.showSaleVolume===1"><i>{{$t("game.saleVolume")}}</i>
				{{item.sale_volume}}</p>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		getCurrentTime
	} from "../../common/js/util/util.js"
	import vm from "../../main.js"

	export default {
		props: ["item"],
		filters: {
			time(val) {
				let now = getCurrentTime();

				if (val.status === 2) {
					return vm.$t("game.finished");
				} else if (now > val.time) {
					return vm.$t("game.matching")
				} else {
					return vm.$t("game.unstart");
				}
			}
		},
		computed: {
			...mapGetters(["config"]),
		},
		methods: {
			open() {
				this.$emit("open");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20upx;
		background-color: #fff;
		border-radius: 15upx;
		margin: 20upx;
		font-size: 0.9em;

		.l,
		.m,
		.r {
			flex: 1;
			overflow: hidden;
			text-align: center;
			position: relative;

			image {
				width: 100upx;
				height: 100upx;
				margin-top: 50upx;
			}

		}

		.m {
			padding-top: 20upx;

			.score {
				font-size: 2.5em;
				padding: 20upx 0;

				&.vs {
					color: #999;
				}
			}
		}

		.time {
			position: absolute;
			top: 10upx;
			left: 10upx;
			color: #555;
			font-size: 0.9em;
		}

		.sale-volume {
			position: absolute;
			right: 10upx;
			top: 10upx;
			color: #f2994a;
			font-size: 0.9em;

			i {
				color: #999;
				font-style: normal;
				margin-right: 10upx;
			}
		}
	}
</style>
