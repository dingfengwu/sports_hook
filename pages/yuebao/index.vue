<template>
	<view class="index-container">
		<uni-nav-bar left-icon="back" :title="$t('yuebao.title')" shadow="false" :right-text="$t('yuebao.detail')"
			backgroundColor="transparent" @clickLeft="$back" @clickRight="openDetail"></uni-nav-bar>
		<index-header></index-header>
		<index-bottom></index-bottom>
	</view>
</template>

<script>
	import IndexHeader from "../../components/yuebao/index-header.vue"
	import IndexBottom from "../../components/yuebao/index-bottom.vue"
	
	export default {
		components:{IndexHeader,IndexBottom},
		methods:{
			openDetail(){
				this.$push("/pages/yuebao/detail");
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar-btn-text{
		color: #fff;
	}
	uni-page-body{
		background-color: #fff;
		min-height: 100%;
		background-image: url(../../static/common/orange-big-header.png);
		background-repeat: no-repeat;
		background-position:top;
	}
</style>
