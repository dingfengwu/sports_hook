<template>
	<view class="add-bank-card-sub-container zh">
		<uni-forms :modelValue="form" ref="form" :rules="rules">
			<uni-forms-item name="bankId" :label="$t('withdraw.bank')">
				<uni-combox :candidates="bankNameList" :placeholder="$t('withdraw.messageSelectBank')"
					v-model="form.bankName" @input="bankChanged" :emptyTips="$t('common.emptyTips')"></uni-combox>
			</uni-forms-item>
			<uni-forms-item name="accountName" :label="$t('withdraw.accountName')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
					v-model="form.accountName" :placeholder="$t('withdraw.messageAccountName')" />
			</uni-forms-item>
			<uni-forms-item name="cpf" :label="$t('withdraw.cpf')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.cpf"
					:placeholder="$t('withdraw.messageCPF')" />
			</uni-forms-item>
			<uni-forms-item name="paymentMethod" :label="$t('withdraw.paymentMethod')">
				<uni-combox :candidates="paymentMethodList" :placeholder="$t('withdraw.messagePaymentMethod')"
					v-model="form.paymentMethodName" @input="paymentMethodChanged" :emptyTips="$t('common.emptyTips')"></uni-combox>
			</uni-forms-item>

			<!--当选中CPF时-->
			<!--空-->

			<!--当选中Mobile时-->
			<template v-if="form.paymentMethod===PAYMENT_TYPE_MOBILE">
				<uni-forms-item name="mobile" :label="$t('withdraw.mobileNumber')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.mobile"
						:placeholder="$t('withdraw.messageMobileNumber')" />
				</uni-forms-item>
			</template>

			<!--当选中Email时-->
			<template v-if="form.paymentMethod===PAYMENT_TYPE_EMAIL">
				<uni-forms-item name="email" :label="$t('withdraw.emailAddress')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.email"
						:placeholder="$t('withdraw.messageEmail')" />
				</uni-forms-item>
			</template>

			<!--当选中EVP时-->
			<template v-if="form.paymentMethod===PAYMENT_TYPE_EVP">
				<uni-forms-item name="paymentAddress" :label="$t('withdraw.paymentAddress')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
						v-model="form.paymentAddress" :placeholder="$t('withdraw.messagePaymentAddress')" />
				</uni-forms-item>
			</template>

			<!--当选中Bank Card时-->
			<template v-if="form.paymentMethod===PAYMENT_TYPE_BANK_CARD">
				<uni-forms-item name="accountNumber" :label="$t('withdraw.accountNumber')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="number"
						v-model="form.accountNumber" :placeholder="$t('withdraw.messageAccountNumber')" />
				</uni-forms-item>
				<uni-forms-item name="accountType" :label="$t('withdraw.accountType')">
					<uni-combox :candidates="accountTypeList" :placeholder="$t('withdraw.messagePaymentMethod')"
						v-model="form.accountTypeName" @input="accountTypeChanged" :emptyTips="$t('common.emptyTips')"></uni-combox>
				</uni-forms-item>
				<uni-forms-item name="branchCode" :label="$t('withdraw.branchCode')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
						v-model="form.branchCode" :placeholder="$t('withdraw.messageBranchCode')" />
				</uni-forms-item>
				<uni-forms-item name="cardDigit" :label="$t('withdraw.cardDigit')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
						v-model="form.cardDigit" :placeholder="$t('withdraw.messageCardDigit')" />
				</uni-forms-item>
				<uni-forms-item name="gender" :label="$t('withdraw.gender')">
					<uni-data-checkbox v-model="form.gender" :localdata="genderList" @change="genderChanged">
					</uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item name="documentId" :label="$t('withdraw.documentId')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
						v-model="form.documentId" :placeholder="$t('withdraw.messageDocumentId')" />
				</uni-forms-item>
				<uni-forms-item name="city" :label="$t('withdraw.city')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.city"
						:placeholder="$t('withdraw.messageCity')" />
				</uni-forms-item>
				<uni-forms-item name="address" :label="$t('withdraw.address')">
					<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
						v-model="form.address" :placeholder="$t('withdraw.messageAddress')" />
				</uni-forms-item>
			</template>

			<uni-forms-item name="fundPassword" :label="$t('withdraw.fundPassword')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="password"
					v-model="form.fundPassword" :placeholder="$t('withdraw.messageFundPassword')" />
			</uni-forms-item>

			<button type="primary" class="circle bottom" @click="addBankCard">{{$t("common.submit")}}</button>
		</uni-forms>

		<uni-popup ref="successPopup" type="message">
			<uni-popup-message type="success" :message="$t('withdraw.messageAddBankCardSuccess')" :duration="2000">
			</uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import addBankCardMixin from "./mixin/add-bank-card-mixin.js";
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		PAYMENT_TYPE_CPF,
		PAYMENT_TYPE_MOBILE,
		PAYMENT_TYPE_EMAIL,
		PAYMENT_TYPE_EVP,
		PAYMENT_TYPE_BANK_CARD
	} from "../../common/js/util/const.js"

	export default {
		mixins: [addBankCardMixin],
		data() {
			let _this = this;
			return {
				PAYMENT_TYPE_CPF,
				PAYMENT_TYPE_MOBILE,
				PAYMENT_TYPE_EMAIL,
				PAYMENT_TYPE_EVP,
				PAYMENT_TYPE_BANK_CARD,
				paymentMethodArray: [{
					name: "By CPF",
					code: PAYMENT_TYPE_CPF
				}, {
					name: "By Mobile",
					code: PAYMENT_TYPE_MOBILE
				}, {
					name: "By Email",
					code: PAYMENT_TYPE_EMAIL
				}, {
					name: "By EVP",
					code: PAYMENT_TYPE_EVP
				}, {
					name: "By Bank Card",
					code: PAYMENT_TYPE_BANK_CARD
				}],
				accountTypeArray: [{
					name: "Checking Account",
					code: "1"
				}, {
					name: "Saving Account",
					code: "2"
				}],
				genderList: [{
					text: this.$t("withdraw.male"),
					value: "MALE"
				}, {
					text: this.$t("withdraw.female"),
					value: "FEMALE"
				}],
				rules: {
					bankId: {
						rules: [{
							required: true,
							errorMessage: this.$t("withdraw.messageSelectBank")
						}]
					},
					accountName: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.accountName")
							}),
						}]
					},
					cpf: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.cpf")
							}),
						}]
					},
					paymentMethod: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.paymentMethod")
							}),
						}]
					},
					email: {
						rules: [{
								required: true,
								errorMessage: this.$t("common.pleaseInputField", {
									field: this.$t("withdraw.emailAddress")
								}),
							},
							{
								format: "email",
								errorMessage: this.$t("withdraw.messageEmail"),
							}
						]
					},
					mobile: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.mobileNumber")
							}),
						}]
					},
					paymentAddress: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.paymentAddress")
							}),
						}]
					},
					accountType: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.accountType")
							}),
						}]
					},
					cardDigit: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.cardDigit")
							}),
						}]
					},
					gender: {
						rules: [{
							required: true,
							errorMessage: this.$t("withdraw.messageGender")
						}]
					},
					documentId: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.documentId")
							}),
						}]
					},
					city: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.city")
							}),
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.address")
							}),
						}]
					},
					accountNumber: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.accountNumber")
							}),
						}]
					},
					fundPassword: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.fundPassword")
							}),
						}]
					},
				}
			}
		},
		computed: {
			...mapGetters(["districtList"]),
			paymentMethodList() {
				return this.paymentMethodArray.map(p => p.name);
			},
			accountTypeList() {
				return this.accountTypeArray.map(p => p.name);
			},
			areaList() {
				if (this.districtList === undefined) return [];

				let areaList = [];
				for (let prop in this.districtList) {
					let item = this.districtList[prop];

					let areaItem = {};
					areaItem.text = item.name;
					areaItem.value = item.id;
					areaItem.children = [];

					for (let childProp in item.children) {
						let subItem = item.children[childProp];

						areaItem.children.push({
							text: subItem.name,
							value: subItem.id
						})
					}
					areaList.push(areaItem);
				}
				return areaList;
			}
		},
		methods: {
			...mapActions(["getDistricts"]),
			areaChanged(e) {
				if (e.detail && e.detail.value.length === 2) {
					this.form.provinceId = e.detail.value[0].value;
					this.form.cityId = e.detail.value[1].value;
				}
			},
			areaColumnChanged(e) {},
			paymentMethodChanged(val) {
				let index = this.paymentMethodList.indexOf(val);
				if (index !== -1) {
					this.form.paymentMethod = this.paymentMethodArray[index].code;
				} else {
					this.form.paymentMethod = "";
					this.form.paymentMethodName = "";
				}
				this.$refs["form"].setValue("paymentMethod", this.form.paymentMethod);
				this.$refs["form"].setValue("paymentMethodName", this.form.paymentMethodName);
			},
			accountTypeChanged(val) {
				let index = this.accountTypeList.indexOf(val);
				if (index !== -1) {
					this.form.accountType = this.accountTypeArray[index].code;
				} else {
					this.form.accountType = "";
					this.form.accountTypeName = "";
				}
				this.$refs["form"].setValue("accountType", this.form.accountType);
				this.$refs["form"].setValue("accountTypeName", this.form.accountTypeName);
			},
			genderChanged(val){
				this.$refs["form"].setValue("gender", this.form.gender);
			}
		},
		created() {
			this.getDistricts();
		}
	}
</script>

<style lang="scss" scoped>
	.add-bank-card-sub-container {
		/deep/ .input-value-border {
			border: 0;
		}

		/deep/ .input-arrow {
			border-color: rgb(51, 51, 51);
		}

		.ifsc {
			/deep/ .uni-forms-item__inner {
				padding-bottom: 80upx;
			}
		}
	}
</style>
