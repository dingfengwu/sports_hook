<template>
	<view class="login-framework" border>
		<uni-forms :modelValue="form" ref="form" :rules="rules">
			<uni-forms-item name="username">
				<uni-easyinput prefixIcon="person-filled" class="circle" focus :inputBorder="false" trim="both"
					confirmType="next" type="text" v-model="form.username"
					:placeholder="$t('account.messageInputUsername')" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput prefixIcon="locked" class="circle" :inputBorder="false" trim="both" :passwordIcon="true"
					type="password" v-model="form.password" :placeholder="$t('account.messageInputPassword')" />
			</uni-forms-item>
			<uni-forms-item name="captcha" v-if="showCaptcha">
				<uni-easyinput prefixIcon="smallcircle" class="circle" :inputBorder="false" trim="both"
					confirmType="next" type="text" v-model="form.captcha"
					:placeholder="$t('account.messageInputcaptcha')" />
			</uni-forms-item>
		</uni-forms>

		<button type="default" class="circle button" @click="signIn">{{$t("account.login")}}</button>
		<!-- <a href="#" @click="openCustomerService">{{$t("account.contactCustomerService")}}</a> -->
		<image :src="captchaImg" class="captcha" v-show="showCaptcha" @click="getCaptcha"></image>
		</form>
	</view>
</template>

<script>
	import {
		openUrlInNewWindow
	} from "../../common/js/util/util.js"
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import {
		errorCode
	} from "../../common/js/util/errorCode.js";
	import {
		getCaptcha
	} from "../../common/js/api/account.js";
	export default {
		data() {
			return {
				showCaptcha: false,
				form: {
					username: "",
					password: "",
					captcha: ""
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
					}
				}
			}
		},
		computed: {
			...mapGetters(["systemConfig", "captchaCode"]),
			captchaImg() {
				if (this.captchaCode && this.captchaCode.src) {
					return this.captchaCode.src;
				}
				return undefined;
			}
		},
		methods: {
			...mapActions(["login", "getCaptcha", "openCustomerService"]),
			signIn() {
				this.$refs["form"].validate().then(res => {
					uni.showLoading({
						mask: true,
						title: this.$t("account.loginLoading")
					});
					this.login({
						username: this.form.username,
						password: this.form.password,
						captcha: this.form.captcha
					}).then(res => {
						uni.hideLoading();
						this.$push('/pages/home/index');
					}).catch(err => {
						uni.hideLoading();
						console.error(err);
						uni.showToast({
							icon: 'none',
							title: err.message
						});
						if (err.errno === errorCode.captchaError) {
							this.showCaptcha = true;
							this.getCaptcha();
						}
					});
				}).catch(err => {
					console.error(err);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-framework {
		padding: 3% 10%;
		position: relative;

		.button {
			margin-top: 60upx;
		}

		a {
			display: block;
			margin-top: 30upx;
			text-align: center;
			color: #555;
		}

		.captcha {
			height: 70upx;
			width: 240upx;
			border-radius: 20upx;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			position: absolute;
			right: 8%;
			top: 256upx;
		}
		
		/deep/ .uni-easyinput{
			background-color: #fff;
			padding: 6upx 10upx;
		}
		
		/deep/ .uni-icons{
			font-size: 24px !important;
		}
		
		/deep/ .button.circle{
			background-color: #fff;
		}
	}
</style>
