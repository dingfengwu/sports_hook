<template>
	<view class="deposit-container">
		<uni-nav-bar left-icon="back" right-icon="headphones" :title="$t('deposit.title')" shadow="false"
			backgroundColor="transparent" @clickLeft="$back" @clickRight="openCustomerService"></uni-nav-bar>
		<view class="label">{{$t("deposit.depositType")}}</view>
		<view class="deposit-type">
			<view class="item" :class="{active:activedType===index}" v-for="(item,index) in depositTypeList"
				:key="index" @click="activedType=index">
				<view>
					<image src="../../static/fund/bank-card.png"></image>
				</view>
				<text>{{item.type_name}}</text>
				<view class="mask"></view>
				<uni-icons type="checkmarkempty" class="icon"></uni-icons>
			</view>
		</view>
		<view class="label">{{$t("deposit.depositChannel")}}</view>
		<view class="payment-channel">
			<view class="channel-list">
				<view class="item" :class="{active:activedChannel===index}"
					v-for="(item,index) in currentDepositPlatformList" :key="index"
					@click="selectChannel(index)">
					<view class="title">{{item.name}}</view>
					<view class="limit-volume">{{item.min_amount}}~{{item.max_amount}}</view>
					<view class="mask"></view>
					<uni-icons type="checkmarkempty" class="icon"></uni-icons>
				</view>
			</view>

			<bank-card v-if="selectedDepositType===1"></bank-card>
			<virtual-currency v-if="selectedDepositType===2"></virtual-currency>
			<third-party v-if="selectedDepositType===3"></third-party>
		</view>

	</view>
</template>

<script>
	import bankCard from "../../components/deposit/bank-card.vue";
	import virtualCurrency from "../../components/deposit/virtual-currency.vue";
	import thirdParty from "../../components/deposit/third-party.vue";
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import { DEPOSIT_TYPE_BANK_CARD,DEPOSIT_TYPE_VIRTUAL_CURRENCY } from "../../common/js/util/const.js";

	export default {
		components: {
			bankCard,
			virtualCurrency,
			thirdParty
		},
		data() {
			return {
				activedType: 0,
				activedChannel: 0
			}
		},
		watch: {
			activedType() {
				this.selectChannel(0);
			}
		},
		computed: {
			...mapGetters(["depositPlatformList", "depositTypeList"]),
			currentDepositPlatformList() {
				if (this.depositTypeList === undefined || this.depositTypeList.length === 0) return [];
				if (this.activedType >= this.depositTypeList.length) {
					this.activedType = 0;
				}
				let selectTypeId = this.depositTypeList[this.activedType]["payment_type_id"];
				return this.depositPlatformList.filter(p => p.payment_type_id === selectTypeId);
			},
			selectedDepositType() {
				if (this.depositTypeList === undefined || this.depositTypeList.length === 0) return 0;
				if (this.activedType >= this.depositTypeList.length) {
					this.activedType = 0;
				}
				let selectTypeId = this.depositTypeList[this.activedType]["payment_type_id"];
				if (selectTypeId === DEPOSIT_TYPE_BANK_CARD) {
					return 1;
				}
				if (selectTypeId === DEPOSIT_TYPE_VIRTUAL_CURRENCY) {
					return 2;
				}
				return 3;
			}
		},
		methods: {
			...mapActions(["getDepositPlatformList", "selectDepositPlatform","openCustomerService"]),
			selectChannel(index) {
				this.activedChannel = index;
				let currentPlatform = this.currentDepositPlatformList[index];
				if (currentPlatform !== undefined) {
					this.selectDepositPlatform(currentPlatform);
				}
			}
		},
		created() {
			this.getDepositPlatformList().then(res=>{
				this.selectChannel(0);
			});
		}
	}
</script>

<style lang="scss" scoped>
	.deposit-container {
		.label {
			margin-top: 40upx;
			padding: 0upx 10upx;
		}

		.icon {
			position: absolute;
			bottom: -5upx;
			right: -5upx;
			color: $uni-color-primary;
			z-index: 2;

			/deep/ span {
				color: #fff !important;
			}
		}

		.mask {
			position: absolute;
			bottom: -30upx;
			right: -30upx;
			width: 60upx;
			height: 60upx;
			z-index: 1;
			background-color: $uni-color-primary;
			transform: rotate(45deg);
			display: none;
		}

		.deposit-type {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin: 10upx 1.5%;

			.item {
				flex-basis: 30%;
				text-align: center;
				background-color: #FFF;
				border-radius: 10upx;
				border: solid 2upx transparent;
				margin: 10upx 1.5%;
				padding: 10upx 5upx;
				box-sizing: border-box;
				position: relative;
				overflow: hidden;

				image {
					width: 50upx;
					height: 50upx;
				}

				&.active {
					border-color: $uni-color-primary;
					
					.mask{
						display: block;
					}
				}
			}
		}

		.payment-channel {
			background-color: #fff;
			border-radius: 10upx;
			padding: 10upx;
			margin: 10upx 1.5%;

			.channel-list {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.item {
					flex-basis: 30%;
					background-color: #fdf6e4;
					border-radius: 10upx;
					border: solid 2upx #f5bd61;
					margin: 10upx 1.5%;
					box-sizing: border-box;
					position: relative;
					overflow: hidden;

					.title {
						padding: 10upx 0upx;
						background-color: #f5bd61;
						color: #6e461b;
						border-radius: 10upx;
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0;
						text-align: center;
					}

					.limit-volume {
						padding: 20upx 0upx;
						color: #ff0000;
						white-space: nowrap;
						font-size: 0.9em;
						text-align: center;
					}

					&.active {
						.mask {
							background-color: #f5bd61;
							display: block;
						}
					}
				}
			}
		}
	}
</style>
