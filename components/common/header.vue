<template>
	<view class="header">
		<view class="avatar">
			<image src="../../static/my/avatar.png"></image>
		</view>
		<view class="info">
			<view><text class="label">{{$t("account.labelUsername")}}:</text><text>{{userInfo.username}}</text></view>
			<view>
				<text
					class="label">{{$t("account.balance")}}:</text><text>{{systemConfig.currency_symbol}}{{userInfo.abalance | toThousandslsFilter}}</text>
			</view>
			<view>
				<text
					class="label">{{$t("account.labelProfitToday")}}:</text><text>{{systemConfig.currency_symbol}}{{todayProfit | toThousandslsFilter}}</text>
			</view>
		</view>
		<view class="operation">
			<button @click="download" v-if="showDownload">{{$t("account.download")}}</button>
			<button @click="logoutApp">{{$t("account.exit")}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		openUrlInNewWindow
	} from "../../common/js/util/util.js"

	export default {
		computed: {
			...mapGetters(["userInfo", "systemConfig", "todayProfitList"]),
			todayProfit() {
				if (this.todayProfitList === undefined || this.todayProfitList.summary === undefined) return "--";
				return this.todayProfitList.summary.profit
			},
			showDownload() {
				return window.navigator.userAgent.indexOf("gameapp") < 0;
			}
		},
		methods: {
			...mapActions(["logout", "getTodayProfitData"]),
			download() {
				openUrlInNewWindow(window.config.appUrl);
			},
			logoutApp(){
				this.logout().then(res=>{
					console.log("sssssss");
					this.$push("/pages/account/login");
				});
			}
		},
		created() {
			this.getTodayProfitData();
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
			line-height: 1.6;
			font-size: 0.9em;

			.label {
				margin-right: 10upx;
				display: inline-block;
				min-width: 120upx;
				white-space: nowrap;
				
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
				font-size: 0.9em;
				margin-top: 10px;

				&:first-child {
					margin-top: 0upx;
				}

			}
		}
	}
</style>
