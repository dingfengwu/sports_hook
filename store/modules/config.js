import i18n from "../../lang/index.js";
import {
	getLangList
} from "../../lang/index.js";
import {
	config
} from "../../common/js/config.js";
import {
	getLotteryConfigVersion,
	getSystemConfig,
	getBannerList,
	getDistricts,
	getNoticeList,
	getHomeConfigVersion,
	getLotteryMenuList,
	getNoticeDetail
} from "../../common/js/api/config.js";
import {
	getLotteryConfig,
	setLotteryConfig,
	setLotteryMenu,
	getLotteryMenu,
	getLang,
	setLang,
	getSystemConfigCache,
	setSystemConfigCache
} from "../../common/js/cache/config.js";
import {
	openUrlInNewWindow
} from "../../common/js/util/util.js";

export default {
	state: {
		lang: getLang() || window.config.lang,
		lotteryConfig: getLotteryConfig() || {},
		systemConfig: getSystemConfigCache() || {},
		bannerList: [],
		districtList: [],
		noticeList: [],
		homeConfig: [],
		lotteryMenuList: getLotteryMenu() || [],
		currentNotice: {}
	},
	getters: {
		config: state => config,
		lotteryConfig: state => state.lotteryConfig,
		systemConfig: state => state.systemConfig,
		bannerList: state => state.bannerList,
		districtList: state => state.districtList,
		noticeList: state => state.noticeList,
		homeConfig: state => state.homeConfig,
		lotteryMenuList: state => state.lotteryMenuList,
		currentNotice: state => state.currentNotice,
		lang: state => state.lang,
	},
	mutations: {
		setLotteryConfig(state, value) {
			state.lotteryConfig = value;
			setLotteryConfig(value);
		},
		setSystemConfig(state, value) {
			state.systemConfig = value;
			setSystemConfigCache(value);
		},
		setBannerList(state, value) {
			state.bannerList = value;
		},
		setDistrictList(state, value) {
			state.districtList = value;
		},
		setNoticeList(state, value) {
			state.noticeList = value;
		},
		setHomeConfig(state, value) {
			state.homeConfig = value;
		},
		setLotteryMenuList(state, value) {
			state.lotteryMenuList = value;
			setLotteryMenu(value);
		},
		setCurrentNotice(state, value) {
			state.currentNotice = value;
		},
		setCurrentLang(state, value) {
			state.lang = value;
			setLang(value);
			i18n.locale = value;
			//window.config.lang = value;
		}
	},
	actions: {
		getLotteryConfigVersion({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getLotteryConfigVersion().then(res => {
					commit("setLotteryConfig", res);
					resolve();
				}).catch(err => {
					console.error(err);
				});
			});
		},
		getHomeConfigVersion({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getHomeConfigVersion().then(data => {
					commit("setHomeConfig", data);
					resolve();
				}).catch(err => {
					console.error(err);
				})
			})
		},
		getSystemConfig({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let merchant = getters["config"]["merchant"];
				let lotteryConfig = getters["lotteryConfig"] || {};
				const key = `${merchant}-system-configs`;
				var systemConfigVersion = lotteryConfig[key];

				getSystemConfig(systemConfigVersion).then(res => {
					commit("setSystemConfig", res);

					//缓存语言
					let hasCache = !!getLang();
					if (!hasCache) {
						let currentLang = res.user_default_language;
						let langList = getLangList();
						if (langList.indexOf(currentLang) < 0) {
							currentLang = window.config.lang;
						}

						commit("setCurrentLang", currentLang);
					}

					resolve();
				}).catch(err => {
					console.error(err);
				})
			})
		},
		getBannerList({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getBannerList().then(res => {
					let {
						errno,
						data
					} = res;
					if (errno === 0) {
						commit("setBannerList", data);
						resolve();
					}
				}).catch(err => {
					console.error(err);
				})
			});
		},
		openCustomerService({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let url = "#";
				let systemConfig = getters["systemConfig"];
				if (systemConfig && systemConfig.client_services && systemConfig.client_services.length >
					0) {
					url = systemConfig.client_services[0].script;
				}
				openUrlInNewWindow(url);
				resolve();
			});
		},
		getDistricts({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getDistricts().then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setDistrictList", data);
						resolve(data);
					} else {
						reject(res);
					}
				}).catch(err => {
					console.error(err);
				})
			})
		},
		getNoticeList({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let homeConfig = getters["homeConfig"] || {};
				let merchant = getters["config"]["merchant"];
				let key = `${merchant}-announcements`;
				let version = homeConfig[key];

				getNoticeList(version).then(data => {
					let array = [];
					for (let prop in data) {
						array.push({
							title: data[prop].title,
							id: data[prop].id,
							created_at: data[prop].created_at
						});
					}
					commit("setNoticeList", array);
					resolve();
				}).catch(err => {
					console.error(err);
				});
			})
		},
		getNoticeDetail({
			commit,
			getters,
			dispatch
		}, id) {
			return new Promise((resolve, reject) => {
				getNoticeDetail(id).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setCurrentNotice", data);
						return resolve(data);
					}
					return reject()
				}).catch(err => {
					console.error(err);
				})
			});
		},
		getLotteryMenuList({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let merchant = getters["config"]["merchant"];
				let lang = getters["config"]["lang"];
				let lotteryConfig = getters["lotteryConfig"] || {};
				const key = `${merchant}-lottery-menu-${lang}`;

				var version = lotteryConfig[key];
				getLotteryMenuList(version).then(res => {
					commit("setLotteryMenuList", res);
					resolve(res);
				}).catch(err => {
					console.error(err);
				});
			})
		}
	}
}
