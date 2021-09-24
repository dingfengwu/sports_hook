<template>
	<view class="game-record-header">
		<view>
			<view class="value">--</view>
			<view>{{$t("gameRecord.billCount")}}</view>
		</view>
		<view>
			<view class="value">{{userProfitSummary.turnover}}</view>
			<view>{{$t("gameRecord.betAmount")}}</view>
		</view>
		<view>
			<view class="value">{{userProfitSummary.profit}}</view>
			<view>{{$t("gameRecord.betResult")}}</view>
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
			...mapGetters(["userProfit"]),
			userProfitSummary() {
				if (this.userProfit) {
					return this.userProfit.summary;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game-record-header {
		display: flex;
		align-items: center;
		background-color: #fff;
		margin: 20upx;
		padding: 40upx;
		border-radius: 20upx;
		box-shadow: 0 0.2rem 0.5rem 0 rgb(20, 25, 44/56%);

		>view {
			flex: 1;
			border-right: solid 1px rgba($color: #000000, $alpha: 0.1);
			text-align: center;
			line-height: 1.5;
			color: #777;

			.value {
				color: $uni-color-primary;
				font-weight: 700;
				font-size: 1.2em;
			}

			&:last-child {
				border: 0;
			}
		}
	}
</style>
