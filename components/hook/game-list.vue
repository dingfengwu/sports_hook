<template>
	<view class="record-list game-list">
		<scroll-view-infinity-load @refresh="refreshData" @load="loadData" :load-completed="loadCompleted"
			:show-completed="showCompleted">
			<hook-item v-for="(item,index) in matchList" :key="index" :item="item" v-if="item.status!==2"
				:openable="false"></hook-item>
		</scroll-view-infinity-load>
		<view class="bottom">
			<button type="primary" @click="bet">{{betButtonText}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import hookItem from "../game/hook-item.vue";
	import {
		MATCH_STATUS_BETABLE
	} from "../../common/js/util/const.js"
	import {
		addDays,
		formatDate,
		getCurrentTime
	} from "../../common/js/util/util.js"
	import scrollViewInfinityLoad from "../common/scroll-view-infinity-load.vue";

	export default {
		data() {
			return {
				filter: {
					page: 1,
					status: MATCH_STATUS_BETABLE,
					beginDate: "",
					endDate: ""
				},
				loadCompleted: true,
				showCompleted: true,
				items: []
			}
		},
		components: {
			hookItem,
			scrollViewInfinityLoad
		},
		computed: {
			...mapGetters(["autoBetMatchList", "taskStatus"]),
			betButtonText() {
				if (!this.actived) {
					return this.$t("home.betting");
				} else {
					return this.$t("home.closeBetting")
				}
			},
			actived() {
				if (this.taskStatus === undefined) return false;
				return this.taskStatus;
			},
			matchList() {
				if (this.autoBetMatchList === undefined) return [];

				let result = [];
				for (let index in this.autoBetMatchList) {
					let item = this.autoBetMatchList[index];
					for (let wayId in item.scores) {
						let detail = item.scores[wayId];
						for (let score in detail) {
							let odds = detail[score];

							result.push({
								...item,
								wayId,
								score,
								odds
							});
						}
					}
				}
				return result;
			}
		},
		methods: {
			...mapActions(["getAutoBetMatchList", "startAutoBet", "stopAutoBet"]),
			queryHookMatchList() {
				let now = getCurrentTime();
				let stop = addDays(now, 1);
				now = formatDate(now);
				stop = formatDate(stop);

				this.filter.beginDate = now;
				this.filter.endDate = stop;
				this.loadCompleted = false;
				this.getAutoBetMatchList(this.filter).then(res => {
					this.loadCompleted = true;
				});
			},
			loadData() {
				this.filter.page = this.filter.page + 1;
				this.queryHookMatchList();
			},
			refreshData() {
				this.filter.page = 1;
				this.queryHookMatchList();
			},
			bet() {
				if (this.actived) {
					this.$showLoading();
					this.stopAutoBet().then(res => {
						this.$hideLoading();
						this.$message(this.$t("home.closeSuccessfully"));
					}).catch(err => {
						this.$hideLoading();
						if (err !== undefined && err.message !== undefined) {
							this.$message(err.message);
						}
					});
				} else {
					this.$showLoading();
					this.startAutoBet().then(res => {
						this.$hideLoading();
						this.$message(this.$t("home.openSuccessfully"));
					}).catch(err => {
						this.$hideLoading();
						if (err !== undefined && err.message !== undefined) {
							this.$message(err.message);
						}
					});
				}
			}
		},
		created() {
			this.queryHookMatchList();
		}
	}
</script>

<style lang="scss" scoped>
	.game-list {
		padding-bottom: 130upx;
		height: calc(100% - 200upx);
		box-sizing: border-box;

		/deep/ .hook-item {
			margin-bottom: 20upx;
		}

		/deep/ .scroll-view-infinity-load {
			height: 100% !important;
		}

		.bottom {
			padding: 20upx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;

			uni-button {
				border-radius: 100upx;
				color: #fff;
			}
		}
	}

	uni-page-body {
		height: 100%;
	}
</style>
