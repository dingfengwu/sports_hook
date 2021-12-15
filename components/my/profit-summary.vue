<template>
	<view class="profit-summary">
		<uni-card>
			<view class="card-body">
				<view class="column">
					<view class="item">
						<text class="label">{{$t("trackOrder.labelUsername")}}</text>
						<text
							class="value black">{{userInfo.username}}</text>
					</view>
					<view class="item">
						<text class="label">{{$t("trackOrder.labelAccountBalance")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{userInfo.abalance | toThousandslsFilter}}</text>
					</view>
				</view>
				<view class="column">
					<view class="item">
						<text class="label">{{$t("trackOrder.labelUncompleted")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{orderSummary.turnover | toThousandslsFilter}}</text>
					</view>
					<view class="item">
						<text class="label">{{$t("trackOrder.labelCompleted")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{todaySummary.turnover | toThousandslsFilter}}</text>
					</view>
				</view>
			</view>
		</uni-card>

		<uni-card>
			<view class="card-body">
				<view class="column">
					<view class="item">
						<text class="label">{{$t("trackOrder.labelYesterdayProfit")}}</text>
						<text class="value"
							:class="returnToNumber(yesterdaySummary.profit)<0?'green':''">{{systemConfig.currency_symbol}}{{yesterdaySummary.profit | toThousandslsFilter}}</text>
					</view>
					<view class="item">
						<text class="label">{{$t("trackOrder.labelTodayProfit")}}</text>
						<text class="value"
							:class="returnToNumber(todaySummary.profit)<0?'green':''">{{systemConfig.currency_symbol}}{{todaySummary.profit | toThousandslsFilter}}</text>
					</view>
				</view>
				<view class="column">
					<view class="item">
						<text class="label">{{$t("trackOrder.labelAllProfit")}}</text>
						<text class="value"
							:class="returnToNumber(totalSummary.profit)<0?'green':''">{{systemConfig.currency_symbol}}{{totalSummary.profit | toThousandslsFilter}}</text>
					</view>
					<view class="item">
						<text class="label">{{$t("trackOrder.labelTradeAmount")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{totalOrderAmount | toThousandslsFilter}}</text>
					</view>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		computed: {
			...mapGetters(["userInfo", "systemConfig", "userProfitSummary"]),
			yesterdaySummary() {
				if (this.userProfitSummary === undefined || this.userProfitSummary.yesterdaySummary === undefined)
					return {};
				return this.userProfitSummary.yesterdaySummary;
			},
			todaySummary() {
				if (this.userProfitSummary === undefined || this.userProfitSummary.todaySummary === undefined) return {};
				return this.userProfitSummary.todaySummary;
			},
			totalSummary() {
				if (this.userProfitSummary === undefined || this.userProfitSummary.totalSummary === undefined) return {};
				return this.userProfitSummary.totalSummary;
			},
			orderSummary() {
				if (this.userProfitSummary === undefined || this.userProfitSummary.orderSummary === undefined) return {};
				return this.userProfitSummary.orderSummary;
			},
			totalOrderAmount() {
				if (this.totalSummary.turnover === undefined || this.orderSummary.turnover === undefined) return "--";

				return this.convertFormattedNumberToNumber(this.totalSummary.turnover) + this.orderSummary.turnover;
			},
			returnToNumber() {
				return this.convertFormattedNumberToNumber;
			}
		},
		methods: {
			convertFormattedNumberToNumber(val) {
				if (val === undefined) return 0;
				return +(val.replace(/,/igm, ""));
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.profit-summary {
		.column {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10px 0;

			.value {
				//@include primary-text-color;
				font-size: 1.4em;
				font-weight: 700;
				color: #A50000;
			}
			
			.black{
				color: #333;
			}
		}
	}
</style>
