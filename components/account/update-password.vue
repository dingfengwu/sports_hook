<template>
	<view class="change-password-container">
		<uni-forms :modelValue="form" ref="form" :rules="rules" label-width="100">
			<uni-forms-item name="oldPassword" :label="$t('account.oldPassword')" v-if="!neverSetPassword">
				<uni-easyinput focus :inputBorder="false" trim="both" confirmType="next" type="password"
					v-model="form.oldPassword" :maxlength="INPUT_DEFAULT_MAX_LENGTH" />
			</uni-forms-item>
			<uni-forms-item name="newPassword" :label="$t('account.newPassword')">
				<uni-easyinput focus :inputBorder="false" trim="both" confirmType="next" type="password"
					v-model="form.newPassword" :maxlength="INPUT_DEFAULT_MAX_LENGTH" />
			</uni-forms-item>
			<uni-forms-item name="confirmPassword" :label="$t('account.confirmPassword')">
				<uni-easyinput focus :inputBorder="false" trim="both" confirmType="next" type="password"
					v-model="form.confirmPassword" :maxlength="INPUT_DEFAULT_MAX_LENGTH" />
			</uni-forms-item>

			<button @click="submit" type="primary" class="circle bottom">{{$t("common.submit")}}</button>
		</uni-forms>
	</view>
</template>

<script>
	import {INPUT_DEFAULT_MAX_LENGTH} from "../../common/js/util/const.js";
	export default {
		props: ["neverSetPassword"],
		data() {
			let _this = this;
			return {
				INPUT_DEFAULT_MAX_LENGTH,
				form: {
					oldPassword: "",
					newPassword: "",
					confirmPassword: ""
				},
				rules: {
					oldPassword: {
						rules: [{
							required: !this.neverSetPassword,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("account.oldPassword")
							}),
						}]
					},
					newPassword: {
						rules: [{
							required: !this.neverSetPassword,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("account.newPassword")
							}),
						}]
					},
					confirmPassword: {
						rules: [{
							required: !this.neverSetPassword,
							errorMessage: this.$t("common.pleaseInputField", {
								field: this.$t("account.confirmPassword")
							})
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value !== _this.form.newPassword) {
									let message = _this.$t("account.errorPasswordInconsistent");
									callback(message);
								}
								return true;
							}
						}]
					}
				}
			};
		},
		methods: {
			submit() {
				this.$refs["form"].validate().then(res => {
					if (this.form.oldPassword === this.form.newPassword) {
						uni.showToast({
							icon: 'none',
							title: this.$t("account.passwordIsSame")
						});
						return;
					}

					this.$emit("changed", this.form);
				}).catch(err => {
					console.error(err);
				})
			},
			resetForm(){
				this.$refs["form"].resetFields();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.change-password-container {}
</style>
