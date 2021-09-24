<template>
	<view class="header">
		<view class="more">{{$t("common.more")}}</view>
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
	export default {
		data(){
			return{
				previousMonth:500.45,
				currentMonth:600,
				totalMonth:1500.3
			};
		}
	}
</script>

<style scoped lang="scss">
	.header{
		margin: 30upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 40upx;
		font-size: 0.8em;
		padding-bottom: 60upx;
		
		.more{
			padding: 20upx;
			text-align: right;
			color: #555555;
		}
		.profit{
			display: flex;
			justify-content: space-between;
			
			.item{
				flex: 1;
				text-align: center;
				line-height: 1.5;
				
				.value{
					font-size: 1.5em;
				}
			}
		}
	}
</style>
