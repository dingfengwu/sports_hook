<template>
	<view class="message-list-container">
		<uni-nav-bar left-icon="back" :title="$t('home.titleMessageList')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back">
		</uni-nav-bar>

		<tabs :tab-list="tabList" :load-completed="loadCompleted" @refresh="refreshData" @load="loadData"
			@tabChanged="tabChanged">
			<view v-for="(inner,idx) in currentMessageList" :key="idx" class="message-item"
				@click="openMessageDetail(inner)">
				<view class="l">
					<uni-icons type="sound" size="25"></uni-icons>
				</view>
				<view class="r">
					<view class="title">{{inner.msg_title}}</view>
					<view class="time">{{inner.created_at}}</view>
				</view>
			</view>
		</tabs>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import tabs from "../../components/common/tabs.vue";

	export default {
		components: {
			tabs
		},
		data() {
			return {
				currentTab: 0,
				page: 1,
				loadCompleted: false,
				tabList: [{
					name: this.$t("home.labUnread")
				}, {
					name: this.$t("home.labRead")
				}]
			}
		},
		computed: {
			...mapGetters(["messageList"]),
			currentMessageList() {
				return this.messageList.filter(p => p.is_readed === this.currentTab);
			}
		},
		methods: {
			...mapActions(["getMessageList", "readMessage"]),
			refreshData() {
				this.loadCompleted = false;
				this.page = 1;
				this.getMessageList().then(data => {
					this.loadCompleted = data.completed;
				});
			},
			loadData() {
				this.page = this.page + 1;
				this.getMessageList({
					page: this.page
				}).then(data => {
					this.loadCompleted = data.completed;
				});
			},
			tabChanged(index) {
				//console.log(index, "index");
				this.currentTab = index;
			},
			openMessageDetail(item) {
				this.readMessage(item.id).then(res => {
					this.$push("/pages/home/message-content");
				});
			}
		},
		created() {
			this.getMessageList().then(data => {
				this.loadCompleted = data.completed;
			});
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.message-list-container {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;

		.message-item {
			display: flex;
			align-items: center;
			margin: 20upx;
			background-color: #fff;
			border-radius: 20upx;
			justify-content: space-between;

			.l,
			.r {
				padding: 20upx;
				font-size: 1.0em;
			}

			.r {
				line-height: 2;
				flex: 1;

				.time {
					text-align: right;
					color: #777;
					font-size: 0.8em;
				}
			}
		}
	}
</style>
