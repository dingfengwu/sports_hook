<template>
	<view class="league">
		<uni-collapse accordion>
			<uni-collapse-item v-for="(item,index) in raceList" :key="index" :thumb="item.type_logo"
				:title="item.type_name">
				<view class="content">
					<item v-for="(inner,idx) in item.children" :key="idx" :item="inner"></item>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import item from "./races-item.vue";
	
	export default {
		components:{item},
		data() {
			return {
				races: [{
						type_id: 1,
						type_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						type_name: "芬兰甲级联赛",
						time: "2021-09-09 23:00",
						sale_volume: 500,
						name: "芬兰超级联赛",
						master_name: "英特土尔库",
						master_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						client_name: "洪卡",
						client_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					},
					{
						type_id: 2,
						type_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						type_name: "芬兰甲级联赛",
						time: "2021-09-09 23:00",
						sale_volume: 100,
						name: "芬兰超级联赛",
						master_name: "玛丽港",
						master_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						client_name: "古比斯",
						client_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					}
				]
			}
		},
		computed: {
			raceList() {
				let data = [];
				this.races.map(item => {
					let index = -1;
					if ((index = data.findIndex(inner => inner.type_id === item.type_id)) < 0) {
						data.push({
							type_id: item.type_id,
							type_name: item.type_name,
							type_logo: item.type_logo
						});

						index = data.length - 1;
					}

					data[index].children = data[index].children || [];
					data[index].children.push(item);
				});

				return data;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.league {
		/deep/ .uni-collapse,/deep/ .uni-collapse-item__wrap{
			background-color: #f0f0f0;
		}
		/deep/ .uni-collapse-item__title{
			background-color: #fff;
			
			&.is-open{
				background-color: #d6ece6;
				
				.uni-collapse-item__title-box{
					background-color: #d6ece6;
				}
			}
		}
		.content {
			
		}
	}
</style>
