<template>
	<view class="bank-info-container">
		<uni-nav-bar left-icon="back" :title="$t('deposit.depositInfo')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back"></uni-nav-bar>
		<uni-forms label-width="150">
			<uni-forms-item :label="$t('deposit.depositAmount')">
				<text v-if="bankinfo.bankcode === 'USDT'">$</text>
				<text v-else>{{systemConfig.currency_symbol}}</text>
				<text>{{depositAmount}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item :label="$t('deposit.depositBank')">
				<image class="bank-logo" :src="bankImg" v-if="showBankLogo" @error="showBankLogo = false"></image>
				<text v-else>{{bankinfo.bank}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item :label="$t('deposit.depositAccountName')" v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD">
				<text>{{bankinfo.owner}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item :label="$t('deposit.depositAccount')" v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD">
				<text>{{bankinfo.account}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="IFSC"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'INR'">
				<text>{{bankinfo.ifsc}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="Sort Code"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'GBP'">
				<text>{{bankinfo.sort_code}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="IBAN"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'GBP'">
				<text>{{bankinfo.iban}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item :label="$t('deposit.email')"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'GBP'">
				<text>{{bankinfo.email}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="CPF/CNPJ"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'BRL'">
				<text>{{bankinfo.cpf}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="Branch Code"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'BRL'">
				<text>{{bankinfo.branch_code}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="EVP"
				v-if="paymentTypeId===DEPOSIT_TYPE_BANK_CARD && systemConfig.currency === 'BRL'">
				<text>{{bankinfo.evp}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
			<uni-forms-item :label="$t('deposit.targetWalletAddress')"
				v-if="paymentTypeId===DEPOSIT_TYPE_VIRTUAL_CURRENCY" class="target-wallet-address">
				<text>{{bankinfo.account}}</text>
				<uni-icons type="paperplane"></uni-icons>
			</uni-forms-item>
		</uni-forms>

		<view>
			<ul v-html="$t('deposit.messageDepositTips')"></ul>
		</view>

		<button @click="$back" type="primary" class="circle">{{$t("common.submit")}}</button>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import {
		DEPOSIT_TYPE_BANK_CARD,
		DEPOSIT_TYPE_VIRTUAL_CURRENCY
	} from "../../common/js/util/const.js"

	export default {
		data() {
			return {
				showBankLogo: true,
				DEPOSIT_TYPE_BANK_CARD,
				DEPOSIT_TYPE_VIRTUAL_CURRENCY
			}
		},
		computed: {
			...mapGetters(["currentDepositPlatform", "depositInfo", "systemConfig"]),
			bankinfo() {
				if (this.currentDepositPlatform === undefined) return {};
				return this.currentDepositPlatform.bankinfo;
			},
			paymentTypeId() {
				if (this.currentDepositPlatform === undefined) return 0;
				return this.currentDepositPlatform.payment_type_id;
			},
			depositAmount() {
				if (this.depositInfo === undefined) return 0;
				return this.depositInfo.amount;
			},
			bankImg() {
				return "/static/banks/" + this.bankinfo.bankcode + ".png";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-info-container {
		.uni-forms {
			padding: 10upx 60upx 10upx 10upx;

			/deep/ uni-image {
				&.bank-logo {
					//width: 100upx;
					height: 100upx;
				}
			}

			.uni-icons {
				position: absolute;
				right: -30upx;
			}
		}

		ul {
			padding: 10upx 20upx;
			line-height: 1.6;
			font-size: 0.8em;
			color: #777;
		}

		button {
			margin: 10upx 30upx;
		}

		/deep/ .uni-forms-item__content {
			display: flex;
			align-items: center;
		}

		.target-wallet-address {
			/deep/ .uni-forms-item__content {
				word-break: break-all;
				padding-right: 20upx;
			}
		}
	}
</style>
