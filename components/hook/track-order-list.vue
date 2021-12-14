<template>
	<view class="game-record">
		<uni-segmented-control :current="active" :values="items" styleType="button" @clickItem="selected">
		</uni-segmented-control>
		<track-order-record :completed="false" v-if="active===0"></track-order-record>
		<track-order-record :completed="true" v-if="active===1"></track-order-record>
	</view>
</template>

<script>
	import trackOrderRecord from "./track-order-record.vue";

	export default {
		components: {
			trackOrderRecord
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
		
		/deep/ .segmented-control{
			margin-top: 20upx;
		}

		/deep/ .record-list {
			padding-top: 20upx;
		}
	}
</style>
