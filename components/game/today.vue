<template>
	<view class="today-races-list">
		<item v-for="(item,index) in todayRaces" :key="index" :item="item" @open="open(item)"></item>
	</view>
</template>

<script>
	import item from "./races-item.vue";
	
	export default {
		components:{item},
		data() {
			return {
				todayRaces: [{
					name: "蒙古足球超级联赛",
					score: "2-0",
					master_logo: "",
					master_name: "伊尔赤姆",
					client_logo: "",
					client_name: "UB马扎拉努德",
					sale_volume: 5000
				},
				{
					name: "蒙古足球超级联赛",
					score: "",
					master_logo: "",
					master_name: "伊尔赤姆",
					client_logo: "",
					client_name: "UB马扎拉努德",
					sale_volume: 5000
				}]
			}
		},
		methods:{
			open(){
				this.$push("/pages/game/bet");
			}
		}
	}
</script>

<style scoped lang="scss">
	.today-races-list {
	}
</style>
