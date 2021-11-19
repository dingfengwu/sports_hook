<template>
	<view class="login-container">
		<view class="mask"></view>
		<view class="login-body">
			<view class="logo">
				<image src="/static/logo.png" mode="aspectFit" />
			</view>
			<login></login>
		</view>
	</view>
</template>

<script>
	import login from "../../components/account/login.vue";

	export default {
		data() {
			return {
				active: 0
			}
		},
		components: {
			login
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		background-image: url(../../static/account/login-bg-hook.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;

		.login-body {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: 3;

			.logo {
				margin-top: 200upx;
				margin-bottom: 100upx;

				image {
					height: 200upx;
					width: 100%;
				}
			}

			.nav {
				padding: 0 25%;
				display: flex;
				margin-top: 50upx;

				button {
					flex: 1;
					border: 0;
					color: #fff;
					border-bottom: solid 5upx transparent;
					border-radius: 0;
					line-height: 60upx;

					&.active {
						border-color: #fff;
					}
				}
			}
		}
		
		
	}
</style>
