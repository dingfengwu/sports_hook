<template>
	<view class="record-list track-order-record">
		<scroll-view-infinity-load @refresh="refreshData" @load="loadData" :load-completed="loadCompleted"
			:show-completed="showCompleted">
			<track-order-item v-for="(item,index) in trackOrderList" :key="index" :item="item" :openable="false"></track-order-item>
			<empty-list v-if="trackOrderList.length===0"></empty-list>
		</scroll-view-infinity-load>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import trackOrderItem from "../game/track-order-item.vue";
	import {
		addDays,
		formatDate,
		getCurrentTime
	} from "../../common/js/util/util.js"
	import scrollViewInfinityLoad from "../common/scroll-view-infinity-load.vue";
	import emptyList from "../../components/common/empty-list.vue";
	import {
		ORDER_COMPLETED,
		ORDER_UNCOMPLETED
	} from "../../common/js/util/const.js";

	export default {
		props: ["completed"],
		data() {
			return {
				filter: {
					page: 1,
					beginTime: "",
					endTime: "",
					autoBet: 1,
					status: []
				},
				loadCompleted: true,
				showCompleted: true
			}
		},
		components: {
			trackOrderItem,
			scrollViewInfinityLoad,
			emptyList
		},
		watch: {
			completed() {
				this.filter.page = 1;
				this.queryTrackOrderList();
			}
		},
		computed: {
			...mapGetters(["orderList"]),
			trackOrderList() {
				if (this.orderList === undefined || this.orderList.data === undefined) return [];

				return this.orderList.data;
			}
		},
		methods: {
			...mapActions(["getOrderList"]),
			queryTrackOrderList() {
				let end = getCurrentTime();
				end = addDays(end, 1);
				let start = addDays(end, -30);
				start = formatDate(start);
				end = formatDate(end);
				if (this.completed) {
					this.filter.status = ORDER_COMPLETED;
				} else {
					this.filter.status = ORDER_UNCOMPLETED;
				}

				this.filter.beginTime = start;
				this.filter.endTime = end;
				this.loadCompleted = false;
				this.getOrderList(this.filter).then(res => {
					this.loadCompleted = res.total_count === res.data.length;
				});
			},
			loadData() {
				this.filter.page = this.filter.page + 1;
				this.queryTrackOrderList();
			},
			refreshData() {
				this.filter.page = 1;
				this.queryTrackOrderList();
			},
		},
		created() {
			//this.queryTrackOrderList();
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.track-order-record {
		height: calc(100% - 20upx - 72upx - 0upx);
		//box-sizing: border-box;

		/deep/ .hook-item {
			margin-bottom: 20upx;
		}

		/deep/ .scroll-view-infinity-load {
			height: 100% !important;
		}
	}
</style>
