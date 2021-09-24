<template>
	<view class="deposit-container">
		<uni-forms :modelValue="form" ref="form" :rules="rules" label-position="top" label-width="200">
			<uni-forms-item name="bankName" :label="$t('deposit.depositBank')" v-if="bankList.length>0">
				<uni-combox :candidates="bankList" :placeholder="$t('deposit.messageDepositBank')"
					v-model="form.bankName" @input="binddata('form.bankName',$event);"></uni-combox>
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
			let _this = this;
			return {
				rules: {
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
					},
					bankName: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t('deposit.depositBank')
							}),
						}]
					},
				}
			}
		},
		computed: {

		},
		methods: {
			change(val) {
				console.log(val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./css/deposit.scss";
</style>
