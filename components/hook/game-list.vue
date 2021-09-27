<template>
	<view class="game-list">
		<view class="list">
			<races-item v-for="(item,index) in matchList" :key="index" :item="item" v-if="item.status!==2"></races-item>
		</view>
		<view class="bottom">
			<button>{{$t("home.betting")}}</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import racesItem from "../game/races-item.vue";

	export default {
		data() {
			return {
				items: []
			}
		},
		components: {
			racesItem
		},
		computed: {
			...mapGetters(["matchList", "getCurrentTime"]),

		},
		methods: {
			...mapActions(["getMatchList"]),
		},
		created() {
			this.getMatchList({
				status: 0,
				beginDate: "2021-09-24",
				endDate: "2021-09-25"
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
				border-color: $uni-color-primary;
				background-color: $uni-color-primary;
				color: #fff;
			}
		}
	}
</style>
