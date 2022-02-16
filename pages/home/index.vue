<template>
	<view class="home-container">
		<uni-nav-bar :title="$t('home.title')" :shadow="false" :border="false">
			<view slot="right">
				<change-language></change-language>
			</view>
		</uni-nav-bar>

		<view class="switch"><text>{{$t("trackOrder.labelSmartBet")}}</text>
			<evan-switch v-model="checked" @change="trackOrderChanging"></evan-switch>
		</view>
		<h1>{{$t("trackOrder.labelMatchList")}}</h1>
		<match-list></match-list>

		<download-popup :url="url"></download-popup>
		<bottom-menu current="0"></bottom-menu>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import matchList from "../../components/hook/match-list.vue";
	import bottomMenu from "../../components/common/bottom-menu.vue";
	import evanSwitch from "../../components/evan-switch/evan-switch.vue";
	import downloadPopup from "../../components/common/download-popup.vue";
	import changeLanguage from "../../components/common/change-language.vue";

	export default {
		data() {
			return {
				checked: false
			}
		},
		components: {
			matchList,
			bottomMenu,
			evanSwitch,
			downloadPopup,
			changeLanguage
		},
		mounted() {
			this.$nextTick(function() {
				this.checked = this.actived;
			});
		},
		watch: {
			taskStatus(val) {
				this.checked = val;
			}
		},
		computed: {
			...mapGetters(["isLogin", "taskStatus", "config"]),
			actived() {
				if (this.taskStatus === undefined) return false;
				return this.taskStatus;
			},
			url() {
				return this.config.appUrl;
			}
		},
		methods: {
			...mapActions(["logout", "startAutoBet", "stopAutoBet"]),
			trackOrderChanging() {
				if (this.actived) {
					this.$showLoading();
					this.stopAutoBet().then(res => {
						this.checked = false;
						this.$hideLoading();
						this.$message(this.$t("home.closeSuccessfully"));
					}).catch(err => {
						this.checked = true;
						this.$hideLoading();
						if (err !== undefined && err.message !== undefined) {
							this.$message(err.message);
						}
					});
				} else {
					this.$showLoading();
					this.startAutoBet().then(res => {
						this.checked = true;
						this.$hideLoading();
						this.$message(this.$t("home.openSuccessfully"));
					}).catch(err => {
						this.checked = false;
						this.$hideLoading();
						if (err !== undefined && err.message !== undefined) {
							this.$message(err.message);
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.home-container {
		height: 100%;

		/deep/ .match-list {
			height: calc(100% - 88upx - 84upx - 104upx - 116upx);
		}

		.switch {
			@include background-color;
			text-align: center;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10upx 0;
			margin-top: 20upx;

			text {
				margin-right: 20upx;
				font-size: 1.2em;
			}
		}

		h1 {
			text-align: center;
			font-size: 1.5em;
			font-weight: 700;
			padding: 20upx 0;
			background-color: #fff;
		}
		
		/deep/ .change-language {
			
			.icon-change-lang {
				color: #fff !important;
				font-size: 1.5em !important;
			}
		}
	}
</style>
