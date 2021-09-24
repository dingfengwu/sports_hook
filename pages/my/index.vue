<template>
	<view class="my-container">
		<!-- <uni-nav-bar left-icon="sound" right-icon="headphones" :title="$t('my.title')" shadow="false"
			backgroundColor="transparent"></uni-nav-bar> -->
		<uni-nav-bar right-icon="headphones" :title="$t('my.title')" shadow="false" backgroundColor="transparent"
			@clickRight="openCustomerService">
			<view slot="left">
				<uni-badge size="small" :text="messageCount" absolute="rightTop" type="error" :offset="[-5,12]">
					<uni-icons type="sound" size="20" @click="openMessageList"></uni-icons>
				</uni-badge>
			</view>
		</uni-nav-bar>

		<view class="body">
			<my-header></my-header>
			<my-basic></my-basic>

			<button type="primary" class="circle normal bottom" @click="logout">{{$t("my.exit")}}</button>
		</view>

		<bottom-menu current="4"></bottom-menu>
	</view>
</template>

<script>
	import myHeader from "../../components/my/my-header.vue"
	import myBasic from "../../components/my/my-basic.vue"
	import {
		mapActions,
		mapGetters
	} from "vuex";

	export default {
		components: {
			myHeader,
			myBasic
		},
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(["messageCount"])
		},
		methods: {
			...mapActions(["logout", "openCustomerService"]),
			openMessageList() {
				this.$push("/pages/home/message-list");
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my-container {
		/deep/ .uni-navbar-header-btns {
			margin: 0 10upx;
		}

		.body {
			margin: 30upx;

			button {
				background-color: $uni-color-error;
			}
		}
	}

	/deep/ .uni-navbar-header-btns,
	/deep/ .uni-navbar-container-title {
		color: #fff !important;

		.uni-icons {
			color: #fff !important;
		}
	}

	uni-page-body {
		background-image: url(../../static/common/green-header.png);
		background-repeat: no-repeat;
		background-position: top;
	}
</style>
