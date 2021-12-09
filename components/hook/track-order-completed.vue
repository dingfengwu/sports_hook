<template>
	<view class="track-order-completed">
		<track-order-record></track-order-record>
	</view>
</template>

<script>
	import trackOrderRecord from "./track-order-record.vue";
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			trackOrderRecord
		}
	}
</script>

<style lang="scss" scoped>
	.track-order-completed {
		height: calc(100% - 72upx);
		
		/deep/ .match-list{
			height: 100%;
		}
	}
</style>
