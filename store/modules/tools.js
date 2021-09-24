import vm from "../../main.js"
import i18n from "../../lang/index.js"
import {
	convertToZoneTime
} from "../../common/js/util/util.js"

export default {
	state: {

	},
	getters: {

	},
	mutations: {

	},
	actions: {
		copy({
			commit,
			getters,
			dispatch
		}, text) {
			return new Promise((resolve, reject) => {
				vm.$copyText(text).then(function(e) {
					uni.showToast({
						title: i18n.t("common.copySuccessfully")
					});
				}, function(e) {
					uni.showToast({
						title: i18n.t("common.copyFail")
					});
				})
			});
		},
		getCurrentTime({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				if (getters["systemConfig"] === undefined) {
					return reject({
						message: "未获取到配置"
					});
				}

				let zone = getters["systemConfig"].zone;
				if (zone === undefined) {
					return reject({
						message: "未指定时区"
					});
				}
				
				let now = convertToZoneTime(now.getTime(), zone);
				return resolve(now);
			});
		}
	}
}
