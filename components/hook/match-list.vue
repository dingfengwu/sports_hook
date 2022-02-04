<template>
	<view class="record-list match-list">
		<scroll-view-infinity-load @refresh="refreshData" @load="loadData" :load-completed="loadCompleted"
			:show-completed="showCompleted">
			<hook-item v-for="(item,index) in matchList" :key="index" :item="item" v-if="item.status!==2"
				:openable="false"></hook-item>
			<empty-list v-if="matchList.length===0"></empty-list>
		</scroll-view-infinity-load>
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
	import emptyList from "../../components/common/empty-list.vue";

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
				showCompleted: true
			}
		},
		components: {
			hookItem,
			scrollViewInfinityLoad,
			emptyList
		},
		computed: {
			...mapGetters(["autoBetMatchList"]),
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
				result.sort(function(e1, e2) {
					if (e1.time > e2.time) {
						return 1;
					} else if (e1.time < e2.time) {
						return -1;
					} else {
						return 0;
					}
				});

				return result;
			}
		},
		methods: {
			...mapActions(["getAutoBetMatchList"]),
			queryHookMatchList() {
				let now = getCurrentTime();
				let stop = addDays(now, 1);
				now = formatDate(now, "yyyy-MM-dd HH:mm:ss");
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
		},
		created() {
			//this.queryHookMatchList();
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.match-list {
		height: calc(100% - 210upx);
		box-sizing: border-box;

		/deep/ .hook-item {
			margin-bottom: 20upx;
		}

		/deep/ .scroll-view-infinity-load {
			height: 100% !important;
		}
	}
</style>
