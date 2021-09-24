<template>
	<view class="header">
		<text>{{$t("yuebao.balance")}}({{systemConfig.currency_unit}})：</text>
		<text class="balance">{{userInfo.abalance | toThousandslsFilter}}</text>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	
	export default{
		computed:{
			...mapGetters(["userInfo","systemConfig"])
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background-color: #fff;
		margin: 40upx;
		padding: 40upx;
		border-radius: 20upx;
		
		.balance{
			font-size: 2em;
		}
	}
</style>
