<template>
	<view class="header">
		<view class="title">{{$t("yuebao.balance")}}({{systemConfig.currency_unit}})
		<uni-icons :type="show?'eye-slash-filled':'eye-filled'" class="eye" color="#c0c4cc"
					@click="changeState"></uni-icons></view>
		
		<view class="balance">{{balance|toThousandslsFilter}}</view>
		
		<view class="notice" v-html="$t('yuebao.messageNotice',{rate})"></view>
		
		<view class="profit">
			<view class="l">
				<view class="label">{{$t("yuebao.totalProfit")}}</view>
				<view>{{totalProfit}}</view>
			</view>
			<view class="r">
				<view class="label">{{$t("yuebao.weekProfit")}}</view>
				<view>{{weekProfit}}</view>
			</view>
		</view>
		
		<!-- <view class="operation">
			<button>{{$t("yuebao.transferOut")}}</button>
			<button>{{$t("yuebao.transferIn")}}</button>
		</view> -->
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	
	export default{
		computed:{
			...mapGetters(["userInfo", "balanceState","systemConfig"]),
			balance() {
				if (this.userInfo === undefined) return "--";
				if (this.balanceState === undefined) {
					return this.userInfo.abalance;
				}
				return this.balanceState.balance;
			},
			show() {
				if (this.balanceState === undefined) return true;
				return this.balanceState.state;
			},
			rate(){
				if(!this.systemConfig.yuebao_rate) return "6.00";
				return this.systemConfig.yuebao_rate;
			},
			totalProfit(){
				return 100;
			},
			weekProfit(){
				return (+this.rate*7*0.01).toFixed(2);
			}
		},
		methods:{
			...mapActions(["toggleBalanceState"]),
			changeState() {
				this.toggleBalanceState();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		margin: 20upx;
		padding: 40upx;
		background-color: #fff;
		border-radius: 20upx;
		
		.title{
			text-align: center;
			
			uni-text{
				margin-left: 10upx;
			}
		}
		
		.balance{
			font-weight: 700;
			font-size: 2em;
			padding: 40upx;
			text-align: center;
		}
		
		.notice{
			text-align: center;
			padding: 20upx 0;
			margin: 0upx 80upx;
			background-color: #f4f5f7;
			border-radius: 20upx;
			
			/deep/ i{
				font-style: normal;
				color: #ff6600;
			}
		}
		
		.profit{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30upx 0;
			font-size: 1.2em;
			margin-top: 60upx;
			font-weight: 700;
			
			.l,.r{
				flex: 1;
				text-align: center;
				line-height: 1.5;
			}
			
			.label{
				font-weight: normal;
				color: #777;
				font-size: 0.8em;
			}
		}
		
		.operation{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 60upx;
			
			button{
				flex: 1;
				padding: 10upx 0;
				
				&:first-child{
					margin-right: 30upx;
				}
				
				&:last-child{
					color: #fff;
					background-color: #edc379;
				}
			}
		}
	}
</style>
