<template>
	<view class="add-bank-card-sub-container zh">
		<uni-forms :modelValue="form" ref="form" :rules="rules">
			<uni-forms-item name="bankId" :label="$t('withdraw.bank')">
				<uni-combox :candidates="bankNameList" :placeholder="$t('withdraw.messageSelectBank')"
					v-model="form.bankName" @input="bankChanged" :emptyTips="$t('common.emptyTips')"></uni-combox>
			</uni-forms-item>
			<uni-forms-item name="sortCode" :label="$t('withdraw.sortCode')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.sortCode"
					:placeholder="$t('withdraw.messageSortCode')" />
			</uni-forms-item>
			<uni-forms-item name="accountName" :label="$t('withdraw.accountName')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text"
					v-model="form.accountName" :placeholder="$t('withdraw.messageAccountName')" />
			</uni-forms-item>
			<uni-forms-item name="accountNumber" :label="$t('withdraw.accountNumber')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="number"
					v-model="form.accountNumber" :placeholder="$t('withdraw.messageAccountNumber')" />
			</uni-forms-item>
			<uni-forms-item name="iban" :label="$t('withdraw.iban')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.iban"
					:placeholder="$t('withdraw.messageIBAN')" />
			</uni-forms-item>
			<uni-forms-item name="email" :label="$t('withdraw.emailAddress')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.email"
					:placeholder="$t('withdraw.messageEmail')" />
			</uni-forms-item>
			<uni-forms-item name="documentId" :label="$t('withdraw.documentId')">
				<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="text" v-model="form.documentId"
					:placeholder="$t('withdraw.messageDocumentId')" />
			</uni-forms-item>
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

	export default {
		mixins: [addBankCardMixin],
		data() {
			let _this = this;
			return {
				rules: {
					bankId: {
						rules: [{
							required: true,
							errorMessage: this.$t("withdraw.messageSelectBank")
						}]
					},
					iban: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.iban")
							}),
						}]
					},
					sortCode: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.sortCode")
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
					documentId: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.documentId")
							}),
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
			areaColumnChanged(e) {}
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
