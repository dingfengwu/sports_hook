<template>
	<view class="notice-list">
		<uni-nav-bar left-icon="back" :title="$t('home.titleNoticeList')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back">
		</uni-nav-bar>

		<scroll-view-infinity-load @refresh="refreshData" @load="loadData" :load-completed="loadCompleted"
			:show-completed="showCompleted">
			<view class="item" v-for="(item,index) in noticeList" :key="index" @click="openNoticeDetail(item)">
				<view class="l">
					<uni-icons type="sound" size="30"></uni-icons>
				</view>
				<view class="r">
					<view class="title">{{item.title}}</view>
					<view class="time">{{item.created_at}}</view>
				</view>
			</view>
		</scroll-view-infinity-load>
	</view>
</template>

<script>
	import scrollViewInfinityLoad from "../../components/common/scroll-view-infinity-load.vue"
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			scrollViewInfinityLoad
		},
		data() {
			return {
				loadCompleted: true,
				showCompleted: true
			}
		},
		computed: {
			...mapGetters(["noticeList"])
		},
		methods: {
			...mapActions(["getNoticeList", "getNoticeDetail"]),
			refreshData() {
				this.$showLoading();
				this.getNoticeList().then(res => {
					this.$hideLoading();
				});
			},
			loadData() {

			},
			openNoticeDetail(item) {
				this.getNoticeDetail(item.id).then(res => {
					this.$push("/pages/home/notice-content");
				});
			}
		},
		created() {
			this.getNoticeList();
		}
	}
</script>

<style lang="scss" scoped>
	.notice-list {
		.item {
			display: flex;
			justify-content: space-between;
			margin: 20upx;
			padding: 20upx;
			border-radius: 20upx;
			background-color: #fff;

			.l,
			.r {
				padding: 20upx;
			}

			.r {
				flex: 1;
				line-height: 1.5;

				.time {
					text-align: right;
					color: #999;
				}
			}
		}
	}
</style>
