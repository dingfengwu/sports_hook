<template>
	<view class="end-races-list">
		<uni-collapse accordion>
			<uni-collapse-item v-for="(item,index) in endRacesList" :key="index" :title="item.time">
				<view class="content">
					<item v-for="(inner,idx) in item.children" :key="idx" :item="inner"></item>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import vm from "../../main.js";
	import item from "./match-item.vue";

	export default {
		components:{item},
		data() {
			return {
				races: [{
						type_id: 1,
						type_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
						type_name: "芬兰甲级联赛",
						time: "2021-09-09",
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
						time: "2021-09-09",
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
		filters: {
			date(val) {
				let time = new Date(val.replace(/-/igm, "/"));
				let week = time.getDay();

				let str = "";
				if (week == 0) {
					str = vm.$t("game.sunday");
				} else if (week == 1) {
					str = vm.$t("game.monday");
				} else if (week == 2) {
					str = vm.$t("game.tuesday");
				} else if (week == 3) {
					str = vm.$t("game.wensday");
				} else if (week == 4) {
					str = vm.$t("game.thursday");
				} else if (week == 5) {
					str = vm.$t("game.friday");
				} else if (week == 6) {
					str = vm.$t("game.satday");
				}
				return str;
			}
		},
		computed: {
			endRacesList() {
				let data = [];
				this.races.map(item => {
					let index = -1;
					if ((index = data.findIndex(inner => inner.time === item.time)) < 0) {
						data.push({
							time: item.time
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
	.end-races-list {

		/deep/ .uni-collapse,
		/deep/ .uni-collapse-item__wrap {
			background-color: #f0f0f0;
		}

		/deep/ .uni-collapse-item__title {
			background-color: #fff;

			&.is-open {
				background-color: #d6ece6;

				.uni-collapse-item__title-box {
					background-color: #d6ece6;
				}
			}
		}

		.content {
			
		}

	}
</style>
