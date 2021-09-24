<template>
	<view class="assitant">
		<view class="title">--- {{$t("yuebao.messageHelp")}} ---</view>
		<view class="tools">
			<view>
				<image src="../../static/yuebao/money.png"></image>
				<view>{{$t("yuebao.labelCalculate")}}</view>
			</view>
			
			<view>
				<image src="../../static/yuebao/save.png"></image>
				<view>{{$t("yuebao.labelGetInOut")}}</view>
			</view>
			
			<view>
				<image src="../../static/yuebao/man.png"></image>
				<view>{{$t("yuebao.labelAssitant")}}</view>
			</view>
			
			<view>
				<image src="../../static/yuebao/plus.png"></image>
				<view>{{$t("yuebao.labelInsurance")}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
	.assitant{
		padding: 40upx;
		
		.title{
			text-align: center;
			padding: 40upx;
			color: #58340c;
		}
		
		.tools{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: center;
			font-size: 0.8em;
			
			image{
				width: 100upx;
				height: 100upx;
			}
		}
	}
</style>
