<template>
	<view class="record-list profit-list">
		<uni-segmented-control :current="active" :values="items" styleType="button" activeColor="#34d585"
			@clickItem="selected">
		</uni-segmented-control>

		<scroll-view-infinity-load @refresh="refreshData" @load="loadData" :load-completed="loadCompleted"
			:show-completed="showCompleted">
			<uni-table border stripe :emptyText="$t('common.empty')">
				<uni-tr>
					<uni-th align="center" width="50">{{$t("gameRecord.date")}}</uni-th>
					<uni-th align="center" width="50">{{$t("gameRecord.tradeAmount")}}</uni-th>
					<uni-th align="center" width="50">{{$t("gameRecord.labelPrize")}}</uni-th>
					<!-- <uni-th align="center" width="50">{{$t("gameRecord.labelCommision")}}</uni-th> -->
					<!-- <uni-th align="center" width="50">{{$t("gameRecord.labelBonus")}}</uni-th> -->
					<uni-th align="center" width="50">{{$t("gameRecord.profit")}}</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in userProfitRecord" :key="index">
					<uni-td>{{item.date|toMMdd}}</uni-td>
					<uni-td>{{item.turnover | toThousandslsFilter}}</uni-td>
					<uni-td>{{item.prize | toThousandslsFilter}}</uni-td>
					<!-- <uni-td>{{item.commission}}</uni-td> -->
					<!-- <uni-td>{{item.bonus}}</uni-td> -->
					<uni-td>{{item.profit | toThousandslsFilter}}</uni-td>
				</uni-tr>
			</uni-table>
		</scroll-view-infinity-load>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import {
		thisWeek,
		lastWeek,
		thisMonth,
		lastMonth
	} from "../../common/js/util/util.js"
	import scrollViewInfinityLoad from "../common/scroll-view-infinity-load.vue";

	export default {
		components: {
			scrollViewInfinityLoad
		},
		data() {
			return {
				loadCompleted: true,
				showCompleted: true,
				active: 0,
				filter: {
					beginDate: "",
					endDate: "",
					page: 1
				},
				items: [
					this.$t("gameRecord.thisWeek"),
					this.$t("gameRecord.lastWeek"),
					this.$t("gameRecord.thisMonth"),
					this.$t("gameRecord.lastMonth")
				]
			}
		},
		watch: {
			active(val) {
				this.getUserProfit();
			}
		},
		computed: {
			...mapGetters(["userProfitList"]),
			userProfitRecord() {
				if (this.userProfitList && this.userProfitList.lists) {
					return this.userProfitList.lists.data;
				}
			}
		},
		methods: {
			...mapActions(["getUserProfitData"]),
			getUserProfit() {
				let timeSpan = [];

				switch (this.active) {
					case 0:
						timeSpan = thisWeek();
						break;
					case 1:
						timeSpan = lastWeek();
						break;
					case 2:
						timeSpan = thisMonth();
						break;
					case 3:
						timeSpan = lastMonth();
						break;
				}
				if (timeSpan.length >= 2) {
					this.filter.beginDate = timeSpan[0];
					this.filter.endDate = timeSpan[1];
				}

				this.loadCompleted = false;
				this.getUserProfitData(this.filter).then(res => {
					this.loadCompleted = res.lists.total_count===res.lists.data.length;
				});
			},
			loadData() {
				this.filter.page = this.filter.page + 1;
				this.getUserProfit();
			},
			refreshData() {
				this.filter.page = 1;
				this.getUserProfit();
			},
			selected(e) {
				this.active = e.currentIndex;
			}
		},
		created() {
			this.getUserProfit();
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.profit-list {
		height: calc(100% - 220upx);

		/deep/ .scroll-view-infinity-load {
			margin-top: 20upx;
		}

		.bottom-nav {
			display: flex;
			align-items: center;
			padding: 20upx;
			background-color: #fff;
			position: absolute;
			bottom: 0;
			width: 100%;
			box-sizing: border-box;
			

			uni-button {
				flex: 1;
				border: 0;
				border-radius: 0;
				font-size: 0.9em;

				&.active {
					background-color: $uni-color-primary;
					color: #fff;
					@include background-color;
				}

				&:after {
					border-right-width: 0;
					border-radius: 0;
				}

				&:last-child {
					border-top-right-radius: 10upx;
					border-bottom-right-radius: 10upx;

					&:after {
						border-right-width: 2upx;
						border-radius: 0upx;
					}
				}

				&:first-child {
					border-top-left-radius: 10upx;
					border-bottom-left-radius: 10upx;
				}
			}
		}
		
		/deep/ .uni-table-td {
			white-space: nowrap;
		}
	}
</style>
