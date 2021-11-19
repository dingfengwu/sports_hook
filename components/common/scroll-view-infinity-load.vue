<template>
	<scroll-view :scroll-y="true" :refresher-triggered="triggered" :refresher-enabled="true"
		@refresherrefresh="onRefresh" @refresherrestore="onRestore" @scrolltolower="onScrollToBottom"
		:lower-threshold="50" class="scroll-view-infinity-load">
		<slot v-if="!isEmpty"></slot>
		<view class="bottom-notice" v-if="!loadCompleted&&!isEmpty">{{$t("common.dataLoading")}}</view>
		<view class="bottom-notice" v-else-if="showCompleted!==false&&!isEmpty">{{$t("common.dataLoadCompleted")}}
		</view>
		<empty-list v-if="isEmpty"></empty-list>
	</scroll-view>
</template>

<script>
	import emptyList from "./empty-list.vue";

	export default {
		props: {
			loadCompleted: {
				type: Boolean,
				default: true
			},
			showCompleted: {
				type: Boolean,
				default: true
			},
			isEmpty: {
				type: Boolean,
				default: false
			}
		},
		components: {
			emptyList
		},
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
			padding: 40upx;
			text-align: center;
			color: #ddd;
			font-size: 0.8em;
		}

		/deep/ .uni-scroll-view-content {
			position: relative;
		}
	}
</style>
