<template>
	<view class="download-popup" v-if="show">
		<view class="notice">
			<uni-icons type="closeempty" size="20" @click="close"></uni-icons>
			<text>{{$t("home.downloadNotice")}}</text>
		</view>
		<button type="warn" size="mini" @click="download">{{$t("home.downloadNow")}}</button>
	</view>
</template>

<script>
	import {
		openUrlInNewWindow,
		isApp
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
				if (isApp()) return false;
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
		bottom: 105upx;
		left: 0;
		right: 0;
		padding: 10upx 10upx;
		background-color: rgba($color: #000000, $alpha: 0.6);
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		border-bottom: solid 1px #555;

		.notice {
			display: flex;
			align-items: center;
			line-height: 1.1;

			.uni-icons {
				transform: translateY(5upx);
				color: #fff !important;
			}
		}
		
		/deep/ uni-button {
			line-height: 1.1;
			padding: 10upx 20upx;
		}
	}
</style>
