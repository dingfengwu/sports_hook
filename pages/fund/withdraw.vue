<template>
	<view class="withdraw-container">
		<uni-nav-bar left-icon="back" :title="$t('withdraw.title')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back"></uni-nav-bar>

		<view class="withdraw-body">
			<view class="label">{{$t("withdraw.withdrawalAccount")}}</view>
			<view class="account" @click="openBankCardPopup">{{currentAccount}}
				<uni-icons type="arrowright" />
			</view>

			<view class="body">
				<uni-forms :modelValue="form" ref="form" :rules="rules" label-width="30">
					<view class="label">{{$t("withdraw.withdrawalAmount")}}<i>({{systemConfig.currency}})</i></view>
					<view class="amount">
						<uni-forms-item name="amount" :label="systemConfig.currency_symbol">
							<uni-easyinput focus :inputBorder="false" trim="both" confirmType="next" type="number"
								v-model="form.amount" />
						</uni-forms-item>
					</view>

					<view class="label">{{$t("withdraw.fundPassword")}}</view>
					<view class="password">
						<uni-forms-item name="password">
							<uni-easyinput :inputBorder="false" trim="both" confirmType="next" type="password"
								v-model="form.password" />
						</uni-forms-item>
					</view>
				</uni-forms>
				<view class="balance">
					<text>{{$t("withdraw.availableAmount",{balance:balanceFormatted})}}</text>,<text
						class="withdraw-all" @click="withdrawAll">{{$t("withdraw.withdrawAll")}}</text>
				</view>
				<button class="circle bottom" type="primary" @click="postWithdrawal">{{$t('withdraw.title')}}</button>
			</view>

			<view class="tips">
				<ul v-html="tips">
					
				</ul>
			</view>
		</view>

		<uni-popup ref="bankCardPopup" type="bottom" background-color="#fff" class="bank-card-list-popup">
			<scroll-view scroll-y="true" class="scroll-y">
				<button class="item normal" v-for="(item,index) in bankCardList" :key="index"
					@click="selectBankCard(item)">{{item | formatBankCard}}</button>
			</scroll-view>
			<view class="add-bank-card" @click="$push('/pages/fund/add-bank-card')">
				<uni-icons type="plusempty"></uni-icons><text>{{$t("withdraw.addBankCard")}}</text>
			</view>
		</uni-popup>
		<uni-popup ref="withdrawalResult" type="dialog">
			<uni-popup-dialog :type="result.type" mode="base" :title="result.title" :content="result.message">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		toThousandslsFilter
	} from "../../common/js/filters/index.js"
	import vue from "../../main.js"

	export default {
		data() {
			let _this = this;
			return {
				form: {
					amount: "",
					password: ""
				},
				rules: {
					amount: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.withdrawalAmount")
							}),
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (+value < _this.minAmount || +value > _this.maxAmount) {
									let message = _this.$t("withdraw.errorWithdrawalAmount", {
										min: _this.minAmount,
										max: _this.maxAmount
									});
									callback(message);
								}
								return true;
							}
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("withdraw.fundPassword")
							}),
						}]
					}
				},
				currentBankCard: "",
				result: {
					type: "",
					title: "",
					message: ""
				}
			}
		},
		filters: {
			formatBankCard(val) {
				if (val) {
					let bank = val.bank;
					let tailAccount = val.account.replace(/[\*\s]/igm, "");
					let tailNumber = vue.$t("withdraw.tailNumber", {
						number: tailAccount
					});
					return `${bank} ${tailNumber}`;
				}
				return "";
			}
		},
		computed: {
			...mapGetters(["systemConfig", "userInfo", "bankCardList"]),
			tips() {
				let currency_unit = this.systemConfig.currency_unit;
				let withdraw_min_amount = toThousandslsFilter(
					+this.userInfo.withdraw_min_amount
				);
				let withdraw_max_amount = toThousandslsFilter(
					+this.userInfo.withdraw_max_amount
				);
				let current_withdraw_times = this.userInfo.withdraw_times;
				let max_withdraw_times = this.userInfo.withdraw_limit_times;
				let withdraw_free_times = this.userInfo.withdraw_free_times;
				let withdraw_allowed_time = this.userInfo.withdraw_allowed_time;
				let css_free = withdraw_free_times === 0 ? "hide" : "";
				let css_time = withdraw_allowed_time === "00:00:00-00:00:00" ? "hide" : "";

				let prefixTips = this.$t("withdraw.tipTmpl", {
					currency_unit,
					withdraw_min_amount,
					withdraw_max_amount,
					current_withdraw_times,
					max_withdraw_times,
					withdraw_free_times,
					withdraw_allowed_time,
					css_free,
					css_time
				});
				let suffixTips = "";

				//整理规则
				let ruleArr = [];
				let rules = this.userInfo.withdraw_fee_rules;
				for (const prop in rules) {
					let fix = +rules[prop].fixed_fee;
					let rate = +rules[prop].rate;
					let value = "";
					let valueUnit = "";
					if (fix > 0) {
						value = fix;
						valueUnit = this.systemSettingConfig.currency_unit;
					} else {
						value = rate * 100;
						valueUnit = "%";
					}
					ruleArr.push({
						amount: +prop,
						value: value,
						value_unit: valueUnit,
						currency_unit: currency_unit
					});
				}

				if (ruleArr.length > 0) {
					if (ruleArr.length === 1) {
						let item = ruleArr[0];
						suffixTips = this.$t("withdraw.tipTmpl4", item);
					} else if (ruleArr.length === 2) {
						let item1 = ruleArr[0];
						let item2 = ruleArr[1];
						suffixTips = this.$t("withdraw.tipTmpl1", {
							amount: item2.amount,
							value: item1.value,
							value_unit: item1.value_unit,
							currency_unit: currency_unit
						});
						suffixTips += this.$t("withdraw.tipTmpl3", {
							amount: item2.amount,
							value: item2.value,
							value_unit: item2.value_unit,
							currency_unit: currency_unit
						});
					} else {
						for (const index in ruleArr) {
							if (+index === 0) {
								let item1 = ruleArr[0];
								let item2 = ruleArr[1];
								suffixTips = this.$t("withdraw.tipTmpl1", {
									amount: item2.amount,
									value: item1.value,
									value_unit: item1.value_unit,
									currency_unit: currency_unit
								});
							} else if (+index === ruleArr.length - 1) {
								let item2 = ruleArr[ruleArr.length - 1];
								suffixTips += this.$t("withdraw.tipTmpl3", {
									amount: item2.amount,
									value: item2.value,
									value_unit: item2.value_unit,
									currency_unit: currency_unit
								});
							} else {
								let item1 = ruleArr[+index];
								let item2 = ruleArr[+index + 1];
								console.log(item1, item2);
								suffixTips += this.$t("withdraw.tipTmpl2", {
									min_amount: item1.amount,
									max_amount: item2.amount,
									value: item1.value,
									value_unit: item1.value_unit,
									currency_unit: currency_unit
								});
							}
						}
					}
				}

				if (suffixTips) {
					return prefixTips + `<li>3.${suffixTips}</li>`;
				} else {
					return prefixTips;
				}
			},
			currentAccount() {
				if (this.currentBankCard) {
					let bank = this.currentBankCard.bank;
					let tailAccount = this.currentBankCard.account.replace(/[\*\s]/igm, "");
					let tailNumber = this.$t("withdraw.tailNumber", {
						number: tailAccount
					});
					return `${bank} ${tailNumber}`;
				}
				return "";
			},
			balanceFormatted() {
				if (this.userInfo) {
					return toThousandslsFilter(this.userInfo.abalance);
				}
				return "--";
			},
			minAmount() {
				if (this.userInfo) {
					return this.userInfo.withdraw_min_amount;
				}
				return 1;
			},
			maxAmount() {
				if (this.userInfo) {
					return this.userInfo.withdraw_max_amount;
				}
				return 999999999;
			}
		},
		methods: {
			...mapActions(["getBankCardList", "withdraw"]),
			withdrawAll() {
				if (this.userInfo) {
					this.form.amount = this.userInfo.abalance;
				} else {
					this.form.amount = "";
				}
			},
			openBankCardPopup() {
				this.$refs["bankCardPopup"].open();
			},
			setWithdrawalResult(val, message) {
				if (val) {
					this.result.type = "success";
					this.result.title = this.$t("withdraw.titleWithdrawalSuccess");
					this.result.message = this.$t("withdraw.contentWithdrawalSuccess")
				} else {
					this.result.type = "error";
					this.result.title = this.$t("withdraw.titleWithdrawalFail");
					this.result.message = message;
				}
				this.$refs["withdrawalResult"].open();
			},
			postWithdrawal() {
				this.$refs["form"].validate().then(res => {
					return this.withdraw({
						amount: this.form.amount,
						bankCardId: this.currentBankCard.id,
						fundPassword: this.form.password
					});
				}).then(res => {
					this.$refs["form"].resetFields();
					this.setWithdrawalResult(true);
				}).catch(err => {
					console.error(err);
					if (err.message) {
						this.setWithdrawalResult(false, err.message);
					}
				});
			},
			selectBankCard(bankcard) {
				this.currentBankCard = bankcard;
				this.$refs["bankCardPopup"].close();
			}
		},
		created() {
			this.getBankCardList().then(res => {
				if (res.length > 0) {
					this.selectBankCard(res[0]);
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.withdraw-container {
		.withdraw-body {
			padding: 0 20upx 0 20upx;

			.label {
				font-size: 1.2rem;
				padding: 15upx 0upx;
				color: $uni-color-primary;
			}

			.account {
				background-color: #FFF;
				border-radius: 10upx;
				padding: 30upx 20upx;
				position: relative;

				/deep/ .uni-icons {
					position: absolute;
					top: 35upx;
					right: 10upx;
				}
			}

			.body {
				margin: 30upx 0upx;
				background-color: #fff;
				border-radius: 10upx;
				padding: 30upx;

				.label {
					margin-bottom: 30upx;

					i {
						color: #777;
						font-size: 1rem;
					}
				}

				.amount {
					/deep/ input {
						font-size: 2em;
						font-weight: 700;
					}
				}

				.balance {
					color: #777;

					.withdraw-all {
						color: $uni-color-primary;
					}
				}
			}

			button {
				margin-top: 50upx;
			}

			.tips {
				color: #777;
				font-size: 0.9em;
				line-height: 1.6;
				margin-top: 50upx;
				
				/deep/ i{
					font-style: normal;
					color: #ff0000;
				}
				
				/deep/ li{
					padding: 10upx 0;
				}
			}
		}

		.bank-card-list-popup {
			padding: 10upx;

			.item {
				background-color: #f0f0f0;
				border-radius: 5upx;
				margin: 10upx;
				padding: 5upx;
			}

			.scroll-y {
				height: 500upx;
			}

			.add-bank-card {
				padding: 30upx 0upx;
				text-align: center;
				font-size: 1.2em;
				color: $uni-color-primary;

				/deep/ .uni-icons {
					color: $uni-color-primary !important;
					margin-right: 10upx;
				}
			}
		}
	}
</style>
