<template>
	<view class="game-list">
		<view class="list">
			<match-item v-for="(item,index) in matchList" :key="index" :item="item" v-if="item.status!==2" :openable="false"></match-item>
		</view>
		<view class="bottom">
			<button type="primary">{{$t("home.betting")}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import matchItem from "../game/match-item.vue";
	import {
		MATCH_STATUS_BETABLE
	} from "../../common/js/util/const.js"
	import {
		addDays,
		formatDate,
		getCurrentTime
	} from "../../common/js/util/util.js"

	export default {
		data() {
			return {
				items: []
			}
		},
		components: {
			matchItem
		},
		computed: {
			...mapGetters(["matchList"])
		},
		methods: {
			...mapActions(["getMatchList"]),
		},
		created() {
			let now = getCurrentTime();
			let stop = addDays(now, 1);
			now = formatDate(now);
			stop = formatDate(stop);
			
			this.getMatchList({
				status: MATCH_STATUS_BETABLE,
				beginDate: now,
				endDate: stop
			});
		}
	}
</script>

<style lang="scss" scoped>
	.game-list {
		padding-bottom: 200upx;

		.bottom {
			padding: 40upx;
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
</style>
