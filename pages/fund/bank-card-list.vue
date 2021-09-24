<template>
	<view class="bank-card-list-container">
		<uni-nav-bar left-icon="back" :title="$t('withdraw.withdrawalAccountList')" shadow="false"
			backgroundColor="transparent" @clickLeft="$back"></uni-nav-bar>

		<view class="item" v-for="(item,index) in bankCardList" :key="index">
			<view class="header">
				<view class="l">
					<image :src="bankImage" class="logo"></image>
					<view>{{item.bank}}</view>
				</view>
				<view class="r">
					<image src="../../static/fund/union-pay.png" class="union-pay"></image>
				</view>
			</view>
			<view class="account">{{item.account}}</view>
		</view>

		<button type="default" class="add-bank-card" @click="$push('/pages/fund/add-bank-card')">
			<uni-icons type="plusempty"></uni-icons> <text>{{$t("withdraw.addBankCard")}}</text>
		</button>
		<view class="tips">
			<ul v-html="tips">
			</ul>
		</view>
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
		methods: {
			...mapActions(["getBankCardList"])
		},
		computed: {
			...mapGetters(["bankCardList", "userInfo"]),
			bankImage(item) {
				return "/static/banks/" + item.bankcode + ".png";
			},
			tips() {
				if (this.userInfo) {
					return this.$t("wallet.addBankCardTip", {
						count: this.userInfo.user_max_bankcard_count
					})
				}
				return "";
			}
		},
		created() {
			this.getBankCardList();
		}
	}
</script>

<style lang="scss" scoped>
	.bank-card-list-container {
		padding-bottom: 100upx;

		.item {
			border-radius: 10upx;
			background-color: #fd9675;
			margin: 20upx 30upx;
			padding: 30upx;
			color: #fff;

			.logo {
				width: 100upx;
				height: 100upx;
			}

			.header {
				display: flex;
				align-items: center;

				.l {
					flex: 1;
					display: flex;
					align-items: center;
					font-size: 0.9em;
				}

				.r {
					padding: 0 0 0 20upx;
					margin-top: -30upx;
					margin-right: 0upx;
				}
			}

			.union-pay {
				width: 50upx;
				height: 50upx;
			}

			.account {
				text-align: center;
				font-size: 1.5rem;
				margin-top: 30upx;
			}
		}

		.add-bank-card {
			background-color: #fff;
			text-align: center;
			border-radius: 10upx;
			padding: 30upx;
			margin: 30upx;
			font-size: 1.2rem;
			color: $uni-color-primary;

			.uni-icons {
				color: $uni-color-primary !important;
			}
		}

		.tips {
			margin: 30upx;
			color: #777;
			font-size: 0.9em;
			line-height: 1.6;
			
			/deep/ li{
				padding: 10upx 0;
			}
		}
	}
</style>
