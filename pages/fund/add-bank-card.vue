<template>
	<view class="add-bank-card-container">
		<uni-nav-bar left-icon="back" :title="$t('withdraw.addBankCard')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back" @clickRight="openCustomerService"></uni-nav-bar>
		<view class="body">
			<add-bank-card-mxn v-if="systemConfig.currency==='MXN'"></add-bank-card-mxn>
			<add-bank-card-inr v-else-if="systemConfig.currency==='INR'"></add-bank-card-inr>
			<add-bank-card-gbp v-else-if="systemConfig.currency==='GBP'"></add-bank-card-gbp>
			<add-bank-card-brl v-else-if="systemConfig.currency==='BRL'"></add-bank-card-brl>
			<add-bank-card-zh v-else></add-bank-card-zh>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import addBankCardZh from "../../components/withdraw/add-bank-card-zh.vue"
	import addBankCardMxn from "../../components/withdraw/add-bank-card-mxn.vue"
	import addBankCardInr from "../../components/withdraw/add-bank-card-inr.vue"
	import addBankCardGbp from "../../components/withdraw/add-bank-card-gbp.vue"
	import addBankCardBrl from "../../components/withdraw/add-bank-card-brl.vue"

	export default {
		components: {
			addBankCardZh,
			addBankCardMxn,
			addBankCardInr,
			addBankCardGbp,
			addBankCardBrl
		},
		data() {
			return {

			}
		},
		methods: {
			...mapActions(["getBankList"])
		},
		computed: {
			...mapGetters(["systemConfig"])
		},
		created() {
			//this.getBankList();
		}
	}
</script>

<style lang="scss" scoped>
	.add-bank-card-container {
		.body {
			margin: 10upx;
			padding: 20upx;
			border-radius: 10upx;
			background-color: #fff;
		}
	}
</style>
