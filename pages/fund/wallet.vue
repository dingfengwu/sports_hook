<template>
	<view class="wallet-container">
		<uni-nav-bar :right-text="$t('wallet.bill')" :title="$t('wallet.title')" shadow="false"
			backgroundColor="transparent"></uni-nav-bar>
		<view class="title"></view>
		<view class="card">
			<view class="header">{{$t("wallet.balance")}}
				<uni-icons :type="show?'eye-slash-filled':'eye-filled'" class="eye" color="#c0c4cc"
					@click="changeState"></uni-icons>
			</view>
			<view class="balance">{{balance |toThousandslsFilter }}</view>
			<view class="operation">
				<button type="primary" class="normal" @click="deposit">{{ $t("wallet.deposit")}}</button>
				<button type="default" class="normal" @click="withdraw">{{ $t("wallet.withdraw")}}</button>
			</view>
		</view>

		<uni-list>
			<uni-list-item :title="$t('yuebao.title')" :rightText="balance" link to="/pages/yuebao/index">
			</uni-list-item>
		</uni-list>

		<view class="tips">
			<ul v-html="tips">
				
			</ul>
		</view>

		<bottom-menu current="1"></bottom-menu>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(["userInfo", "balanceState", "systemConfig"]),
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
			tips() {
				let show = "hide";
				let mutiple = this.systemConfig.withdrawal_need_turnover || 0;
				if (mutiple > 0) {
					show = "show";
				}
				return this.$t("deposit.tips", {
					show,
					mutiple
				})
			}
		},
		methods: {
			...mapActions(["toggleBalanceState"]),
			changeState() {
				this.toggleBalanceState();
			},
			deposit() {
				this.$push("/pages/fund/deposit");
			},
			withdraw() {
				this.$push("/pages/fund/withdraw");
			}
		},
		created() {}
	}
</script>

<style lang="scss" scoped>
	.wallet-container {
		.title {
			background-image: url(../../static/fund/wallet.png);
			background-repeat: no-repeat;
			background-position: center;
			height: 60upx;
			margin-top: 50upx;
		}

		.card {
			background-image: url(../../static/fund/card.png);
			background-repeat: no-repeat;
			background-position: center;
			height: 360upx;
			padding: 30upx;
			box-sizing: border-box;
			margin-bottom: 50upx;

			.header {
				text-align: center;
				padding: 20upx 0;
				font-size: 1.1em;

				uni-text {
					margin-left: 10upx;
				}

				.eye {
					cursor: pointer;
				}
			}

			.balance {
				font-size: 2rem;
				text-align: center;
			}
		}

		.operation {
			display: flex;
			justify-content: center;
			margin-top: 50upx;

			button {
				margin-left: 50upx;
				padding: 0 80upx;
				font-size: 1.1em;
				border-radius: 50upx;

				&:first-child {
					margin-left: 0;
				}

				&:last-child {
					color: $uni-color-primary;
				}
			}
		}

		.tips {
			padding: 20upx;
			margin-top: 50upx;
			line-height: 1.6;
			color: #777;
			font-size: 0.9em;
			
			/deep/ li{
				padding: 10upx 0;
			}
		}
	}
</style>
