<template>
	<view class="my-header-container">
		<view class="avatar">
			<image src="../../static/my/avatar.png"></image>
		</view>
		<view class="balance">
			<text>{{userInfo.username}}</text>
			<text>{{$t("common.balance")}}: {{systemConfig.currency_symbol}}{{userInfo.abalance|toThousandslsFilter}}</text>
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
			...mapGetters(["userInfo","systemConfig"])
		}
	}
</script>

<style lang="scss" scoped>
	.my-header-container {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 20upx;
		padding: 30upx;
		
		.avatar{
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 100upx;
			}
		}
		
		.balance{
			padding: 20upx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			font-size: 1.1em;
			line-height: 1.5;
		}
	}
</style>
