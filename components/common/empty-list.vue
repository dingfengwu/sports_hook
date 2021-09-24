<template>
	<view class="empty-list">
		<view>{{$t("common.empty")}}</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			// let elem = document.getElementsByClassName("empty-list")[0];
			// let parent = elem.parentNode;
			// let children = parent.children;

			// let childrenHeight = 0;
			// for (let index in children) {
			// 	let node = children[index];
			// 	if (typeof(node) === 'object' && node.className.indexOf("empty-list") < 0) {
			// 		childrenHeight += node.scrollHeight;
			// 	}
			// }

			// let bodyHeight = document.body.scrollHeight;

			// let height = bodyHeight - childrenHeight;
			// if (height > 0) {
			// 	//elem.style.height = height + "px";
			// }
		}
	}
</script>

<style scoped lang="scss">
	.empty-list {
		background-image: url(../../static/common/empty.png);
		background-position: center center;
		background-repeat: no-repeat;
		height: 800upx;
		background-color: #fff;
		position: relative;

		view {
			position: absolute;
			top: 600upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #777;
		}
	}
</style>
