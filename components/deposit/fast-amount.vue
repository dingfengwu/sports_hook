<template>
	<view class="fast-amount">
		<text @click="change(index)" v-for="(item,index) in amountList" :key="index"
			:class="{active:active===index}">{{currencySymbol}} {{item}}</text>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		props: {
			amountList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				active: 0
			}
		},
		computed: {
			...mapGetters(["systemConfig"]),
			currencySymbol() {
				if (this.systemConfig) return this.systemConfig.currency_symbol;
				return "";
			}
		},
		methods: {
			change(index) {
				this.active = index;
				let item = this.amountList[index];
				this.$emit("change", item);
			}
		},
		mounted() {
			this.change(this.active);
		}
	}
</script>

<style lang="scss" scoped>
	.fast-amount {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 0 20upx;

		uni-text {
			margin:10upx 1.5%;
			padding: 10upx;
			flex-basis: 30%;
			border-radius: 10upx;
			background-color: #f0f0f0;
			text-align: center;
			box-sizing: border-box;
			font-weight: 700;

			&.active {
				background-color: $uni-color-primary;
				color: #fff;
			}
		}
	}
</style>
