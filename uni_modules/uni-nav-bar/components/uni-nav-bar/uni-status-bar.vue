<template>
	<view :style="{ height: statusBarHeight }" class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
	import {
		APP_USERAGENT_FLAG
	} from "../../../../common/js/util/const.js";
	
	export default {
		name: 'UniStatusBar',
		data() {
			return {
				statusBarHeight: 20
			}
		},
		mounted() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
			if (navigator.userAgent.indexOf(APP_USERAGENT_FLAG) >= 0 && uni.getSystemInfoSync().statusBarHeight === 0) {
				this.statusBarHeight = '20px';
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../../common/css/theme.scss";

	.uni-status-bar {
		// width: 750rpx;
		height: 20px;
		// height: var(--status-bar-height);
		@include background-color;
	}
</style>
