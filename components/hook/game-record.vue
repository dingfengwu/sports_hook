<template>
	<view class="game-record">
		<game-record-header></game-record-header>
		<game-profit-list></game-profit-list>
	</view>
</template>

<script>
	import gameRecordHeader from "./game-record-header.vue"
	import gameProfitList from "./game-profit-list.vue"
	
	export default{
		components:{gameRecordHeader,gameProfitList}
	}
</script>

<style lang="scss" scoped>
	.game-record{
		
	}
</style>
