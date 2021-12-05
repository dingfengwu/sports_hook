import {
	mapGetters,
	mapActions
} from "vuex";
import {
	getCurrentTime,
	formatDate
} from "../../../common/js/util/util.js"
import vm from "../../../main.js"
import {
	MATCH_STATUS_MATCHING,
	MATCH_STATUS_BETABLE,
	MATCH_STATUS_FINISHED,
	SPORT_ALL_SITE_WAY_ID,
	SPORT_HALF_SITE_WAY_ID
} from "../../../common/js/util/const.js";

export default {
	props: ["item", "openable"],
	data() {
		return {
			MATCH_STATUS_FINISHED,
			MATCH_STATUS_MATCHING,
			SPORT_ALL_SITE_WAY_ID,
			SPORT_HALF_SITE_WAY_ID
		}
	},
	filters: {
		status(val) {
			let now = getCurrentTime();

			if (MATCH_STATUS_MATCHING.indexOf(val.status) >= 0) {
				return vm.$t("game.matching");
			} else if (val.status === 7) {
				return vm.$t("game.finished");
			} else {
				return vm.$t("game.unstart");
			}
		},
		costTime(val) {
			if (!val || !val.time) return "";

			let now = getCurrentTime();
			let time = new Date(val.time.replace("-", "/"));
			let span = now.getTime() - time.getTime();
			span = parseInt(span / 1000 / 60);

			return `${span}'`;
		},
		remainder(val) {
			if (!val || !val.time) return "";

			let time = new Date(val.time.replace("-", "/"));
			return formatDate(time, "MM-dd HH:mm");
			
			// let key = `game.status${val.status}`;
			// if (val.status === 1) {
			// 	let now = getCurrentTime();
			// 	if (formatDate(now) === formatDate(time)) {
			// 		let span = time.getTime() - now.getTime();
			// 		if (span < 0) {
			// 			return formatDate(time, "HH:mm");
			// 		} else {
			// 			span = parseInt(span / 1000 / 60);
			// 			return `${span}'`;
			// 		}
			// 	}
			// }
			// return formatDate(time, "MM-dd HH:mm");
		}
	},
	computed: {
		...mapGetters(["config"]),
		wayText() {
			if (this.item === undefined) return "";
			if (+this.item.wayId === SPORT_ALL_SITE_WAY_ID) {
				return this.$t("game.labeAllSite");
			} else if (+this.item.wayId === SPORT_HALF_SITE_WAY_ID) {
				return this.$t("game.labHalfSite");
			}
		}
	},
	methods: {
		open() {
			if (this.openable === false) return;

			let now = getCurrentTime();
			let time = new Date(this.item.time.replace(/-/igm, "/"));
			let span = now.getTime() - time.getTime();
			if (MATCH_STATUS_BETABLE.indexOf(this.item.status) >= 0) {
				if (span > 1 * 24 * 3600 * 1000) {
					console.warn("此场比赛超过一天未开始不能下注");
				} else {
					this.$store.commit("setCurrentMatch", this.item);
					this.$push("/pages/game/bet");
				}
			} else {
				uni.showToast({
					title: this.$t("game.stopSale"),
					icon: "error"
				});
			}

			this.$emit("open");
		}
	}
}
