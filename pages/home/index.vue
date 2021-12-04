<template>
	<view class="home-container">
		<common-header></common-header>
		<game-list v-if="current===0"></game-list>
		<game-record v-if="current===1"></game-record>

		<view class="switch" v-if="current===0" @click="current=1">{{$t("home.goGameRecord")}}</view>
		<view class="switch" v-else-if="current===1" @click="current=0">{{$t("home.goHome")}}</view>
	</view>
</template>

<script>
	import commonHeader from "../../components/common/header.vue";
	import gameList from "../../components/hook/game-list.vue";
	import gameRecord from "../../components/hook/game-record.vue"

	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			commonHeader,
			gameList,
			gameRecord
		},
		data() {
			return {
				current: 0
			}
		},
		computed: {
			...mapGetters(["bannerList", "config", "noticeList", "messageCount", "isLogin"]),
			noticeTitle() {
				let title = "";
				for (let index in this.noticeList) {
					title += `${(+index+1)}.${this.noticeList[index].title};`;
				}
				return title;
			}
		},
		methods: {
			...mapActions(["getBannerList", "getUserInfo", "getNoticeList", "getHomeConfigVersion",
				"openCustomerService", "logout"
			]),
			change(e) {
				this.current = e.detail.current;
			},
			openMessageList() {
				this.$push("/pages/home/message-list");
			},
			openNoticeList() {
				this.$push("/pages/home/notice-list");
			},
			openMatchDetail(item) {
				this.$store.commit("setCurrentGameDetail", item);
				this.$push("/pages/game/bet");
			}
		},
		created() {
			this.getBannerList();
			this.getHomeConfigVersion().then(res => {
				this.getNoticeList();
			});
		},
		onShow() {
			//仅挂机存在,因为在pages.json文件中未配置meta
			if (!this.isLogin) {
				this.logout();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		height: 100%;

		.switch {
			position: absolute;
			right: 0;
			//height: 40upx;
			bottom: 300upx;
			padding: 10upx 20upx;
			font-size: 1em;
			color: #fff;
			background: linear-gradient(90deg, #ff5b1f, #ff332f);
			//box-shadow: 1.4rem 5.7rem 0 rgba(255,84,63,0.46);
			opacity: .9;
			border-radius: 1rem 0 0 1rem;
			text-align: center;
		}
	}

	uni-page-body {
		background-image: url(../../static/common/green-header.png);
		background-repeat: no-repeat;
		background-position: 0 -140upx;
		background-size: 100% 400upx;
	}
</style>
