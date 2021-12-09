<template>
	<view class="download-popup" v-if="show">
		<view class="notice">
			<uni-icons type="closeempty" size="20" @click="close"></uni-icons>
			<text>{{$t("home.downloadNotice")}}</text>
		</view>
		<button type="primary" size="mini" @click="download">{{$t("home.downloadNow")}}</button>
	</view>
</template>

<script>
	import {
		openUrlInNewWindow
	} from "../../common/js/util/util.js";
	import {
		mapGetters,
		mapActions
	} from "vuex";


	export default {
		props: ["url"],
		computed: {
			...mapGetters(["downloadPopupState"]),
			show() {
				if (this.downloadPopupState === undefined) return false;
				if (this.url === undefined) return false;
				return this.downloadPopupState;
			}
		},
		methods: {
			...mapActions(["setDownloadPopupState"]),
			close() {
				this.setDownloadPopupState(false);
			},
			download() {
				if (this.url === undefined) return;

				openUrlInNewWindow(this.url);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.download-popup {
		position: absolute;
		bottom: 113upx;
		left: 0;
		right: 0;
		padding: 10upx 10upx;
		background-color: rgb(58, 58, 58);
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		border-bottom: solid 1px #555;

		.notice {
			display: flex;
			align-items: center;

			.uni-icons {
				transform: translateY(5upx);
				color: #fff !important;
			}
		}
	}
</style>
