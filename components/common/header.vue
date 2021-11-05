<template>
	<view class="header">
		<view class="avatar">
			<image src="../../static/my/avatar.png"></image>
		</view>
		<view class="info">
			<view class="username">{{userInfo.username}}</view>
			<view>ID:{{userInfo.id}}</view>
			<view class="money">
				<span>{{systemConfig.currency_symbol}} {{userInfo.abalance | toThousandslsFilter}}</span>
			</view>
		</view>
		<view class="operation">
			<button @click="download">{{$t("account.download")}}</button>
			<button @click="logout">{{$t("account.exit")}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {openUrlInNewWindow} from "../../common/js/util/util.js"

	export default {
		computed: {
			...mapGetters(["userInfo", "systemConfig"])
		},
		methods: {
			...mapActions(["logout"]),
			download(){
				openUrlInNewWindow(window.config.appUrl);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		padding: 20upx;

		.avatar {
			image {
				width: 150upx;
				height: 150upx;
				border-radius: 75upx;
			}
		}

		.info {
			flex: 1;
			padding: 15upx;
			color: #fff;
			// flex-shrink: 0;
			// flex-grow: 0;
			line-height: 1.5;

			.username {
				font-weight: 700;
			}

			.money {
				span {
					background-color: rgba($color: #000, $alpha: .4);
					border-radius: 100upx;
					padding: 8upx 20upx;
					display: inline-block;
					line-height: 1;
				}
			}
		}

		.operation {
			display: flex;
			flex-shrink: 0;
			flex-grow: 0;
			flex-direction: column;

			button {
				padding: 0upx 20upx;
				background-color: transparent;
				border: solid 1px #fff;
				color: #fff;
				line-height: 2;
				font-size: 1em;
				margin-top: 10px;

				&:first-child {
					margin-top: 0upx;
				}
				
			}
		}
	}
</style>
