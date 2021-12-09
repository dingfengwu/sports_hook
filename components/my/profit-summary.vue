<template>
	<view class="profit-summary">
		<uni-card>
			<view class="card-body">
				<view class="item">
					<text class="label">{{$t("trackOrder.labelAccountBalance")}}</text>
					<text
						class="value">{{systemConfig.currency_symbol}}{{userInfo.abalance | toThousandslsFilter}}</text>
				</view>
				<view class="column">
					<view class="item">
						<text class="label">{{$t("trackOrder.labelYesterdayProfit")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{yesterdaySummary.profit | toThousandslsFilter}}</text>
					</view>
					<view class="item">
						<text class="label">{{$t("trackOrder.labelTodayProfit")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{todaySummary.profit | toThousandslsFilter}}</text>
					</view>
				</view>
				<view class="column">
					<view class="item">
						<text class="label">{{$t("trackOrder.labelAllProfit")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{totalSummary.profit | toThousandslsFilter}}</text>
					</view>
					<view class="item">
						<text class="label">{{$t("trackOrder.labelTradeAmount")}}</text>
						<text
							class="value">{{systemConfig.currency_symbol}}{{totalSummary.turnover | toThousandslsFilter}}</text>
					</view>
				</view>
			</view>
		</uni-card>

		<view>
			<button type="warn" @click="logout">{{$t("account.exit")}}</button>
		</view>
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
		},
		methods: {
			...mapActions(["logout"])
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
				@include primary-text-color;
				font-size: 1.4em;
				font-weight: 700;
			}
		}
	}
</style>
