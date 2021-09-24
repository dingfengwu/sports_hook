<template>
	<scroll-view :scroll-y="true" :refresher-triggered="triggered" :refresher-enabled="true"
		@refresherrefresh="onRefresh" @refresherrestore="onRestore" @scrolltolower="onScrollToBottom"
		:lower-threshold="50" class="scroll-view-infinity-load">
		<slot></slot>
		<view class="bottom-notice" v-if="!loadCompleted">{{$t("common.dataLoading")}}</view>
		<view class="bottom-notice" v-else-if="showCompleted!==false">{{$t("common.dataLoadCompleted")}}</view>
	</scroll-view>
</template>

<script>
	export default {
		props: ["loadCompleted", "showCompleted"],
		data() {
			return {
				triggered: false,
			}
		},
		methods: {
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				this.$emit("refresh");
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
			},
			onRestore() {
				this.triggered = 'restore';
			},
			onScrollToBottom() {
				if (!this.loadCompleted) {
					this.$emit("load");
				}
			},
		},
		created() {
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-view-infinity-load {
		height: 100%;

		.bottom-notice {
			padding: 20upx;
			text-align: center;
			color: #999;
			font-size: 0.8em;
		}
		
		/deep/ .uni-scroll-view-content{
			position: relative;
		}
	}
</style>
