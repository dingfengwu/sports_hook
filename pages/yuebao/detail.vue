<template>
	<view class="detail-container">
		<uni-nav-bar left-icon="back" :title="$t('yuebao.titleFunDetail')" shadow="false"
			backgroundColor="transparent" @clickLeft="$back" ></uni-nav-bar>
		<detail-header></detail-header>
		<detail-item v-for="(item,index) in detailList" :key="index"></detail-item>
		<empty-list v-if="detailList.length===0"></empty-list>
	</view>
</template>

<script>
	import detailHeader from "../../components/yuebao/detail-header.vue"
	import detailItem from "../../components/yuebao/detail-item.vue"
	import emptyList from "../../components/common/empty-list.vue"
	export default {
		components:{detailHeader,detailItem,emptyList},
		data() {
			return {
				detailList:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.detail-container{
	display: flex;
	flex-direction: column;
}
uni-page-body{
	background-color: #fff;
	min-height: 100%;
	background-image: url(../../static/common/orange-header.png);
	background-repeat: no-repeat;
	background-position:top;
}
</style>
