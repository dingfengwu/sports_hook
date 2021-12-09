<template>
	<view class="game-record">
		<uni-segmented-control :current="active" :values="items" styleType="button" activeColor="#34d585"
			@clickItem="selected">
		</uni-segmented-control>
		<track-ordering v-if="active===0"></track-ordering>
		<track-order-completed v-if="active===1"></track-order-completed>
	</view>
</template>

<script>
	import trackOrdering from "./track-ordering.vue";
	import trackOrderCompleted from "./track-order-completed.vue";

	export default {
		components: {
			trackOrdering,
			trackOrderCompleted
		},
		data() {
			return {
				active: 0,
				items: [
					this.$t("trackOrder.labelTrackOrdering"),
					this.$t("trackOrder.labelTrackOrderCompleted"),
				]
			}
		},
		methods: {
			selected(e) {
				this.active = e.currentIndex;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game-record {
		height: calc(100% - 200upx);
		
		/deep/ .record-list{
			padding-top: 20upx;
		}
	}
</style>
