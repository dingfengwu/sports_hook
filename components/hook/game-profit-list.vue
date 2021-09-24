<template>
	<view class="profit-list">
		<uni-table border stripe :emptyText="$t('common.empty')">
			<uni-tr>
				<uni-th align="center" width="50">{{$t("gameRecord.date")}}</uni-th>
				<uni-th align="center" width="50">{{$t("gameRecord.quantity")}}</uni-th>
				<uni-th align="center" width="50">{{$t("gameRecord.amount")}}</uni-th>
				<uni-th align="center" width="50">{{$t("gameRecord.profit")}}</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in userProfitList" :key="index">
				<uni-td>{{item.date}}</uni-td>
				<uni-td>--</uni-td>
				<uni-td>{{item.turnover}}</uni-td>
				<uni-td>{{item.profit}}</uni-td>
			</uni-tr>
		</uni-table>

		<view class="bottom-nav">
			<button :class="{active:active===0}" @click="active=0">{{$t("gameRecord.thisWeek")}}</button>
			<button :class="{active:active===1}" @click="active=1">{{$t("gameRecord.lastWeek")}}</button>
			<button :class="{active:active===2}" @click="active=2">{{$t("gameRecord.thisMonth")}}</button>
			<button :class="{active:active===3}" @click="active=3">{{$t("gameRecord.lastMonth")}}</button>
		</view>
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

	export default {
		data() {
			return {
				active: 0,
				beginDate: "",
				endDate: ""
			}
		},
		watch: {
			active(val) {
				this.getUserProfit();
			}
		},
		computed: {
			...mapGetters(["userProfit"]),
			userProfitList() {
				if (this.userProfit && this.userProfit.lists) {
					return this.userProfit.lists.data;
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
					this.beginDate = timeSpan[0];
					this.endDate = timeSpan[1];
				}

				this.getUserProfitData({
					beginDate: this.beginDate,
					endDate: this.endDate
				});
			}
		},
		created() {
			this.getUserProfit();
		}
	}
</script>

<style lang="scss" scoped>
	.profit-list {
		.bottom-nav {
			display: flex;
			align-items: center;
			padding: 20upx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			width: 100%;
			box-sizing: border-box;

			uni-button {
				flex: 1;
				border: 0;
				border-radius: 0;

				&.active {
					background-color: $uni-color-primary;
					color: #fff;
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

		/deep/ .uni-table-td{
			white-space: nowrap;
		}
	}
</style>
