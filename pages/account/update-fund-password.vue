<template>
	<view class="update-fund-password-container">
		<uni-nav-bar left-icon="back" :title="$t('my.titleUpdateFundPassword')" shadow="false"
			backgroundColor="transparent" @clickLeft="$back" @clickRight="openCustomerService"></uni-nav-bar>

		<view class="body">
			<update-password @changed="changed" ref="updateLoginPassword"
				:never-set-password="!userInfo.fund_pwd_seted"></update-password>
		</view>

		<uni-popup ref="successPopup" type="message">
			<uni-popup-message type="success" :message="$t('account.messageChangePasswordSuccessfully')"
				:duration="2000">
			</uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import updatePassword from "../../components/account/update-password.vue"
	import {
		mapActions,
		mapGetters
	} from "vuex";

	export default {
		components: {
			updatePassword
		},
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		methods: {
			...mapActions(["changeLoginPassword"]),
			changed(data) {
				this.$confirm("修改密码后需要重新登陆，是否继续？", res => {
					this.changeLoginPassword(data).then(res => {
						let _this = this;
						this.$refs["updateLoginPassword"].resetForm();
						this.$refs["successPopup"].open();
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: err.message
						});
					});
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.update-fund-password-container {
		.body {
			margin: 20upx;
			padding: 20upx;
			background-color: #fff;
			border-radius: 10upx;
		}
	}
</style>
