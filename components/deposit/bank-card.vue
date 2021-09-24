<template>
	<view class="deposit-container">
		<uni-forms :modelValue="form" ref="form" :rules="rules" label-position="top" label-width="200">
			<uni-forms-item name="payerName" :label="$t('deposit.payerName')">
				<uni-easyinput focus :inputBorder="true" trim="both" confirmType="next" type="text"
					v-model="form.payerName" />
			</uni-forms-item>
			<uni-forms-item name="documentId" :label="$t('deposit.documentId')" v-if="systemConfig.currency==='GBP'">
				<uni-easyinput :inputBorder="true" trim="both" confirmType="next" type="text"
					v-model="form.documentId" />
			</uni-forms-item>
			<uni-forms-item :label="$t('deposit.depositFastAmount')" v-if="showFastAmount">
				<fast-amount :amount-list="amountList" @change="fastAmountChanged"></fast-amount>
			</uni-forms-item>
			<uni-forms-item name="amount" :label="$t('deposit.depositAmount')">
				<uni-easyinput :inputBorder="true" trim="both" confirmType="next" type="number" v-model="form.amount" />
			</uni-forms-item>
		</uni-forms>

		<button @click="submitDeposit" type="primary" class="circle deposit-button">{{$t("deposit.title")}}</button>
	</view>
</template>

<script>
	import depositMixin from "./mixin/deposit-mixin.js"

	export default {
		mixins: [depositMixin],
		data() {
			let _this=this;
			return {
				rules: {
					payerName: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("deposit.payerName")
							}),
						}]
					},
					documentId: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("deposit.documentId")
							}),
						}]
					},
					amount: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("deposit.depositAmount")
							}),
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (+value < _this.minAmount || +value > _this.maxAmount) {
									let message = _this.$t("deposit.errorDepostiAmount", {
										min: _this.minAmount,
										max: _this.maxAmount
									});
									callback(message);
								}
								return true;
							}
						}]
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./css/deposit.scss";
</style>
