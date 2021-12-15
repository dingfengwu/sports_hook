<template>
	<view class="header">
		<view class="more" @click="$push('/pages/fund/profit-list')">{{$t("common.more")}}</view>
		<view class="profit">
			<view class="item">
				<view class="value">{{previousMonth|toThousandslsFilter}}</view>
				<view>{{$t("agent.previousMonthProfit")}}</view>
			</view>

			<view class="item">
				<view class="value">{{currentMonth|toThousandslsFilter}}</view>
				<view>{{$t("agent.currentMonthProfit")}}</view>
			</view>

			<view class="item">
				<view class="value">{{totalMonth|toThousandslsFilter}}</view>
				<view>{{$t("agent.totalMonthProfit")}}</view>
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
		getUserProfitData
	} from "../../common/js/api/fund.js";
	import {
		thisMonth,
		lastMonth,
		allTime
	} from "../../common/js/util/util.js";

	export default {
		data() {
			return {
				previousMonth: "--",
				currentMonth: "--",
				totalMonth: "--"
			};
		},
		methods: {
			//...mapActions(["getUserProfitData"]),
			getUserProfitSummary(mode) {
				let dateSpan = [];
				switch (mode) {
					case 0:
						dateSpan = thisMonth();
						break;
					case 1:
						dateSpan = lastMonth();
						break;
					case 2:
						dateSpan = allTime();
						break;
				}
				getUserProfitData({
					beginDate: dateSpan[0],
					endDate: dateSpan[1],
					pagesize: 1,
					page: 1
				}).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						switch (mode) {
							case 0:
								this.previousMonth = data.summary.profit;
								break;
							case 1:
								this.currentMonth = data.summary.profit;
								break;
							case 2:
								this.totalMonth = data.summary.profit;
								break;
						}
					}
				})
			}
		},
		created() {
			this.getUserProfitSummary(0);
			this.getUserProfitSummary(1);
			this.getUserProfitSummary(2);
		}
	}
</script>

<style scoped lang="scss">
	.header {
		margin: 30upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 40upx;
		font-size: 0.8em;
		padding-bottom: 60upx;

		.more {
			padding: 20upx;
			text-align: right;
			color: #555555;
		}

		.profit {
			display: flex;
			justify-content: space-between;

			.item {
				flex: 1;
				text-align: center;
				line-height: 1.5;

				.value {
					font-size: 1.5em;
				}
			}
		}
	}
</style>
