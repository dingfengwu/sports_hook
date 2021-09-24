import fastAmount from "../fast-amount.vue"
import {
	mapGetters,
	mapActions
} from "vuex";
import {
	DEPOSIT_TYPE_BANK_CARD,
	DEPOSIT_TYPE_VIRTUAL_CURRENCY
} from "../../../common/js/util/const.js";
import {
	postDataByHtmlForm
} from "../../../common/js/util/util.js"

export default {
	data() {
		return {
			form: {
				payerName: "",
				amount: "",
				documentId: "",
				bankId: "",
				bankName: ""
			}
		}
	},
	components: {
		fastAmount
	},
	computed: {
		...mapGetters(["currentDepositPlatform", "systemConfig", "config", "token"]),
		showFastAmount() {
			if (this.currentDepositPlatform === undefined) return false;
			if (this.currentDepositPlatform["is_select_amount"] === 1) return true;
			return false;
		},
		amountList() {
			if (this.currentDepositPlatform === undefined) return [];
			if (!this.currentDepositPlatform["select_amounts"]) return [];
			return JSON.parse(this.currentDepositPlatform["select_amounts"]);
		},
		bankList() {
			if (this.currentDepositPlatform === undefined) return [];
			if (!this.currentDepositPlatform["banks"]) return [];
			return this.currentDepositPlatform["banks"].map(item => item.name);
		},
		minAmount() {
			if (this.currentDepositPlatform === undefined) return 1;
			return this.currentDepositPlatform.min_amount;
		},
		maxAmount() {
			if (this.currentDepositPlatform === undefined) return 999999999;
			return this.currentDepositPlatform.max_amount;
		}
	},
	methods: {
		...mapActions(["deposit"]),
		fastAmountChanged(amount) {
			this.form.amount = amount || 0;
		},
		submitDeposit() {
			if (this.currentDepositPlatform === undefined) {
				console.warn("请选择支付平台");
				return;
			}

			this.$refs['form'].validate().then(res => {
				let accountId =
					((this.currentDepositPlatform.payment_type_id === DEPOSIT_TYPE_BANK_CARD ||
							this.currentDepositPlatform.payment_type_id === DEPOSIT_TYPE_VIRTUAL_CURRENCY) &&
						this.currentDepositPlatform.bankinfo.account_id) ||
					"";

				let bankId = "";
				let index = this.bankList.indexOf(this.form.bankName);
				if (index !== -1) {
					bankId = this.currentDepositPlatform.banks[index].id;
				}

				let data = {
					platformId: this.currentDepositPlatform.id,
					accountId: accountId,
					bankId: bankId,
					name: this.form.payerName,
					documentId: this.form.documentId,
					amount: this.form.amount
				};
				
				//随机增加小数
				if (
					this.systemConfig.bank_deposit_random_decimal === 1 &&
					this.currentDepositPlatform.payment_type_id === DEPOSIT_TYPE_BANK_CARD
				) {
					let digit = +(Math.random() * 100 * 0.01).toFixed(2);
					data.amount = +data.amount + digit;
				}

				this.deposit(data).then(res => {
					this.$refs['form'].resetFields();
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err.message
					});
				});
			}).catch(err => {
				console.error(err);
			})
		}
	}
}
