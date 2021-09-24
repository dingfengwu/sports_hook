import {
	login,
	logout,
	register,
	getCaptcha,
	getUserInfo,
	changeLoginPassword,
	changeFundPassword,
	getMessageCount,
	getMessageList,
	readMessage,
	getRegisterLinks,
	createRegisterLink
} from "../../common/js/api/account.js"
import {
	setToken,
	getToken,
	setIsLogin,
	getIsLogin,
	clearAll,
	setBalanceState,
	getBalanceState,
	setUserInfoCache,
	getUserInfoCache
} from "../../common/js/cache/account.js"
import {
	setTimer
} from "../../common/js/util/util.js"
import {
	isInvalidLogin
} from "../../common/js/util/errorCode.js";
import {
	push
} from "../../common/js/util/router.js"
import {
	config
} from "../../common/js/config.js";
let getUserInfoTimer = null;
let getMessageCountTimer = null;

export default {
	state: {
		userInfo: getUserInfoCache() || {},
		token: getToken() || "",
		isLogin: getIsLogin() || false,
		captchaCode: "",
		balanceState: getBalanceState(),
		messageCount: 0,
		messageList: [],
		currentMessage: {},
		registerLinks: [],
		currentRegisterLink: ""
	},
	getters: {
		userInfo: state => state.userInfo,
		token: state => state.token,
		isLogin: state => state.isLogin,
		captchaCode: state => state.captchaCode,
		balanceState: state => state.balanceState,
		messageCount: state => state.messageCount,
		messageList: state => state.messageList,
		currentMessage: state => state.currentMessage,
		registerLinks: state => state.registerLinks,
		currentRegisterLink: state => state.currentRegisterLink
	},
	mutations: {
		setUserInfo(state, value) {
			state.userInfo = value;
			setUserInfoCache(value);
		},
		setToken(state, value) {
			state.token = value;
			setToken(value);
		},
		setIsLogin(state, value) {
			state.isLogin = value;
			setIsLogin(value);
		},
		setCaptchaCode(state, value) {
			state.captchaCode = value;
		},
		setBalanceState(state, value) {
			state.balanceState = value;
			setBalanceState(value);
		},
		setMessageCount(state, value) {
			state.messageCount = value;
		},
		setMessageList(state, value) {
			state.messageList = value;
		},
		setCurrentMessage(state, value) {
			state.currentMessage = value;
		},
		setRegisterLinks(state, value) {
			state.registerLinks = value;
		},
		setCurrentRegisterLink(state, value) {
			state.currentRegisterLink = value;
		}
	},
	actions: {
		getCaptcha({
			commit,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getCaptcha().then(res => {
					const {
						errno,
						message,
						data
					} = res;
					if (errno === 0) {
						commit("setCaptchaCode", data);
						return resolve();
					}
				}).catch(err => {
					console.error(err);
				});
			});
		},
		login({
			commit,
			dispatch
		}, data) {
			return new Promise((resolve, reject) => {
				login(data).then(res => {
					const {
						errno,
						message,
						data
					} = res;
					if (errno === 0) {
						commit('setToken', data.token);
						commit('setUserInfo', data);
						commit('setIsLogin', true);

						resolve();
					} else {
						reject(res);
					}
				}).catch(err => {
					reject(err);
				});
			});
		},
		logout({
			commit,
			state,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				logout().then(res => {
					commit('setIsLogin', false);
					commit('setToken', '');
					commit('setUserInfo', {});
					//清除缓存
					clearAll();
					push("/pages/account/login");
					uni.hideLoading();

					resolve();
				}).catch(err => {
					console.error(err);
				})
			})
		},
		register({
			commit,
			state,
			dispatch
		}, data) {
			return new Promise((resolve, reject) => {
				register(data).then(res => {
					let {
						errno
					} = res;
					if (errno === 0) {
						return dispatch('login', {
							username: data.username,
							password: data.password
						});
					}
					return reject(res);
				}).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				})
			})
		},
		getUserInfo({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getUserInfo().then(res => {
					setTimer(getUserInfoTimer, 60 * 1000, function() {
						dispatch("getUserInfo");
					});

					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setUserInfo", data);
						dispatch("saveBalanceState");
						return resolve();
					} else if (isInvalidLogin(errno)) {
						dispatch("logout");
					}
					return reject();
				}).catch(err => {
					console.error(err);
					setTimer(getUserInfoTimer, 10 * 1000, function() {
						dispatch("getUserInfo");
					});
				})
			})
		},
		toggleBalanceState({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let show = true;
				let balance = 0;

				let source = getters["balanceState"];

				if (source !== undefined) {
					show = source.state;
					balance = source.balance;
				}
				show = !show;

				if (show) {
					let userInfo = getters["userInfo"];
					balance = userInfo.abalance;
				} else {
					balance = "**********";
				}
				let state = {
					balance: balance,
					state: show
				};
				commit("setBalanceState", state);
				resolve();
			});
		},
		saveBalanceState({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let show = true;
				let balance = 0;

				let source = getters["balanceState"];
				if (source !== undefined) {
					show = source.state;
					balance = source.balance;
				}

				if (show) {
					let userInfo = getters["userInfo"];
					balance = userInfo.abalance;
				} else {
					balance = "**********";
				}
				let state = {
					balance: balance,
					state: show
				};
				commit("setBalanceState", state);
				resolve();
			});
		},
		changeLoginPassword({
			commit,
			getters,
			dispatch
		}, data) {
			console.log(typeof(changeLoginPassword));
			return new Promise((resolve, reject) => {
				changeLoginPassword(data).then(res => {
					let {
						errno,
						message,
						data
					} = res;
					if (errno === 0) {
						resolve();
						setTimeout(function() {
							dispatch("logout");
						}, 5 * 1000);
					} else {
						reject(res);
					}
				}).catch(err => {
					console.error(err);
				})
			});
		},
		changeFundPassword({
			commit,
			getters,
			dispatch
		}, data) {
			return new Promise((resolve, reject) => {
				changeFundPassword(data).then(res => {
					let {
						errno,
						message,
						data
					} = res;
					if (errno === 0) {
						resolve();
						setTimeout(function() {
							dispatch("logout");
						}, 5 * 1000);
					} else {
						reject(res);
					}
				}).catch(err => {
					console.error(err);
				})
			});
		},
		getMessageCount({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getMessageCount().then(res => {
					setTimer(getMessageCountTimer, 60 * 1000, function() {
						dispatch("getMessageCount");
					});

					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setMessageCount", data.count);
						return resolve();
					}
					return reject();
				}).catch(err => {
					console.error(err);
					setTimer(getMessageCountTimer, 60 * 1000, function() {
						dispatch("getMessageCount");
					});
				})
			})
		},
		getMessageList({
			commit,
			getters,
			dispatch
		}, args) {
			return new Promise((resolve, reject) => {
				args = args || {
					page: 1,
					pagesize: config.defaultPagesize
				};
				if (args.page === undefined) {
					args.page = 1;
				}
				if (args.pagesize === undefined) {
					args.pagesize = config.defaultPagesize;
				}
				getMessageList(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						if (args.page === 1) {
							commit("setMessageList", data.data);
						} else {
							let source = getters["messageList"] || [];
							source.push(...data.data);
							commit("setMessageList", source);
						}

						return resolve({
							current: data.data,
							completed: data.data.length < args.pagesize
						});
					}
					return reject();
				}).catch(err => {
					console.error(err);
				})
			});
		},
		readMessage({
			commit,
			getters,
			dispatch
		}, id) {
			return new Promise((resolve, reject) => {
				readMessage(id).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setCurrentMessage", data);
						dispatch("getMessageList");
						return resolve(data);
					}
					return reject();
				}).catch(err => {
					console.error(err);
				});
			})
		},
		getRegisterLinks({
			commit,
			getters,
			dispatch
		}, args) {
			return new Promise((resolve, reject) => {
				args = args || {
					page: 1,
					pagesize: config.defaultPagesize
				};
				if (args.page === undefined) {
					args.page = 1;
				}
				if (args.pagesize === undefined) {
					args.pagesize = config.defaultPagesize;
				}
				getRegisterLinks(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						if (args.page === 1) {
							commit("setRegisterLinks", data.data);
						} else {
							let source = getters["registerLink"] || [];
							source.push(...data.data);
							commit("setRegisterLinks", source);
						}
						return resolve(data.data);
					}
					return new reject();
				}).catch(err => {
					console.error(err);
				})
			});
		},
		getSingleRegisterLink({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				let args = {
					page: 1,
					pagesize: 1
				};
				getRegisterLinks(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						let length = data.data.length;
						if (length === 0) {
							let currentPrizeGroup = getters["userInfo"].prize_group;
							let registerArgs = {
								isAgent: config.isAgent,
								days: config.days,
								prizeGroup: currentPrizeGroup - config.scalePrizeGroup
							};
							return createRegisterLink(registerArgs);
						} else {
							commit("setCurrentRegisterLink", data.data[0].url);
							return resolve();
						}
					}
					return reject(res);
				}).then(res => {
					return getRegisterLinks(args);
				}).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						let length = data.data.length;
						if (length === 0) {
							return reject(res);
						} else {
							commit("setCurrentRegisterLink", data.data[0].url);
							return resolve();
						}
					}
					return reject(res);
				}).catch(err => {
					console.error(err);
				})
			});
		},
		createRegisterLink({
			commit,
			getters,
			dispatch
		}, args) {
			return new Promise((resolve, reject) => {
				createRegisterLink(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						return resolve();
					}
					return reject();
				}).catch(err => {
					console.error(err);
				});
			});
		}
	}
}
