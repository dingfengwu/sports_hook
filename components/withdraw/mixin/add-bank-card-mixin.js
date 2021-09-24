import {
	mapGetters,
	mapActions
} from "vuex";

export default {
	data() {
		return {
			form: {
				bankId: "",
				bankName: "",
				provinceId: "",
				cityId: "",
				branch: "",
				accountName: "",
				accountNumber: "",
				fundPassword: "",
				ifsc: "",
				email: "",
				mobile: "",
				cpf: "",
				iban: "",
				sortCode: "",
				branchCode: "",
				paymentMethod: "",
				paymentMethodName: "",
				accountType: "",
				accountTypeName: "",
				paymentAddress: "",
				cardDigit: "",
				documentId: "",
				gender: "",
				fundPassword: "",
				checkToken: "",
				city: "",
				address: ""
			}
		}
	},
	computed: {
		...mapGetters(["bankList"]),
		bankNameList() {
			if (this.bankList === undefined || this.bankList.length === 0) return [];
			return this.bankList.map(item => item.name);
		}
	},
	methods: {
		...mapActions(["getBankList", "bindBankCard"]),
		bankChanged(val) {
			console.log(val);
			let index = this.bankNameList.indexOf(val);
			if (index === -1) {
				this.form.bankName = "";
				this.form.bankId = "";
			} else {
				this.form.bankId = this.bankList[index].id;
			}
			this.$refs["form"].setValue("bankId", this.form.bankId);
			this.$refs["form"].setValue("bankName", this.form.bankName);
		},
		addBankCard() {
			this.$refs["form"].validate().then(res => {
				return this.bindBankCard(this.form)
			}).then(res => {
				this.$refs["successPopup"].open();
				this.$back();
			}).catch(err => {
				console.error(err);
				if (err.message) {
					uni.showToast({
						icon: 'none',
						title: err.message
					});
				}
			})
		}
	},
	created() {
		this.getBankList();
	}
}
