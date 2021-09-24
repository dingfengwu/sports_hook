<template>
	<view class="register-framework">
		<uni-forms :modelValue="form" ref="form" :rules="rules">
			<uni-forms-item name="username">
				<uni-easyinput class="circle" focus :inputBorder="false" trim="both" confirmType="next" type="text"
					v-model="form.username" :placeholder="$t('account.messageInputUsername')" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput class="circle" :inputBorder="false" trim="both" :passwordIcon="true" confirmType="next"
					type="password" v-model="form.password" :placeholder="$t('account.messageInputPassword')" />
			</uni-forms-item>
			<uni-forms-item name="key">
				<uni-easyinput class="circle" :inputBorder="false" trim="both" confirmType="next" type="text"
					v-model="form.key" :placeholder="$t('account.messageInputInviteCode')" />
			</uni-forms-item>
			
			<button type="default" class="circle button" @click="signUp">{{$t("account.register")}}</button>
		</uni-forms>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	export default {
		data() {
			return {
				form: {
					username: "",
					password: "",
					key: ""
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: this.$t('account.messageInputUsername')
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: this.$t('account.messageInputPassword')
						}]
					},
					key: {
						rules: [{
							required: true,
							errorMessage: this.$t('account.messageInputKey')
						}]
					},
				}
			}
		},
		methods: {
			...mapActions(["register"]),
			signUp() {
				this.$refs["form"].validate().then(res => {
					uni.showLoading({
						mask: true,
						title: this.$t("common.loginLoading")
					});
					this.register(this.form).then(res => {
						uni.hideLoading();
						this.$push("/pages/home/index");
					}).catch(err => {
						uni.hideLoading();
						console.error(err);
						uni.showToast({
							icon: 'none',
							title: err.message
						});
					});
				}).catch(err => {
					console.error(err);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register-framework {
		padding: 3% 10%;

		button {
			margin-top: 60upx;
		}
	}
</style>
