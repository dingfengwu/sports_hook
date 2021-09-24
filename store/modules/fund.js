import {
	config
} from "../../common/js/config.js";
import {
	getDepositPlatformList,
	deposit,
	getBankCardList,
	withdraw,
	getBankList,
	bindBankCard
} from "../../common/js/api/fund.js";
import vue from "../../main.js";
import {
	DEPOSIT_TYPE_BANK_CARD,
	DEPOSIT_TYPE_VIRTUAL_CURRENCY
} from "../../common/js/util/const.js";
import {
	push
} from "../../common/js/util/router.js";
import {
	postDataByHtmlForm
} from "../../common/js/util/util.js";

export default {
	state: {
		depositPlatformList: [],
		depositTypeList: [],
		currentDepositPlatform: {},
		depositInfo: {},
		bankCardList: [],
		bankList: []
	},
	getters: {
		depositPlatformList: state => state.depositPlatformList,
		depositTypeList: state => state.depositTypeList,
		currentDepositPlatform: state => state.currentDepositPlatform,
		depositInfo: state => state.depositInfo,
		bankCardList: state => state.bankCardList,
		bankList: state => state.bankList
	},
	mutations: {
		setDepositPlatformList(state, value) {
			state.depositPlatformList = value;
		},
		setDepositTypeList(state, value) {
			state.depositTypeList = value;
		},
		setCurrentDepositPlatform(state, value) {
			state.currentDepositPlatform = value;
		},
		setDepositInfo(state, value) {
			state.depositInfo = value;
		},
		setBankCardList(state, value) {
			state.bankCardList = value;
		},
		setBankList(state, value) {
			state.bankList = value;
		}
	},
	actions: {
		getDepositPlatformList({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getDepositPlatformList().then(res => {
					let {
						errno,
						data,
						message
					} = res;

					if (errno === 0) {
						let depositTypeList = [];
						data.forEach(item => {
							if (depositTypeList.findIndex(p => p.payment_type_id === item
									.payment_type_id) < 0) {
								depositTypeList.push({
									payment_type_id: item.payment_type_id,
									type_name: item.type_name,
									type: item.type
								});
							}
						});

						commit("setDepositTypeList", depositTypeList);
						commit("setDepositPlatformList", data);
						return resolve();
					}
					return reject(res);
				}).catch(err => {
					console.error(err);
				});
			});
		},
		selectDepositPlatform({
			commit,
			getters,
			dispatch
		}, depositPlatform) {
			return new Promise((resolve, reject) => {
				commit("setCurrentDepositPlatform", depositPlatform);
				resolve();
			});
		},
		deposit({
			commit,
			getters,
			dispatch
		}, content) {
			return new Promise((resolve, reject) => {
				let token = getters["token"];
				let currentDepositPlatform = getters["currentDepositPlatform"];

				if (currentDepositPlatform.directly === 1) {
					let url = "/api";
					let data = {};
					data["platform_id"] = content.platformId;
					data["account_id"] = content.accountId;
					data["amount"] = content.amount;
					data["action"] = "deposit";
					data["terminal_id"] = config.terminalId;
					data["name"] = content.name;
					data["bank_id"] = content.bankId;
					data["lang"] = config.lang;
					data["token"] = token;
					data["document_id"] = content.documentId;

					postDataByHtmlForm(url, data);
				} else {
					uni.showLoading({
						mask: true,
						title: vue.$t("common.submitDataLoading")
					});

					deposit(content).then(res => {
						uni.hideLoading();
						let {
							errno,
							data,
							message
						} = res;
						if (errno === 0) {
							resolve();

							if (currentDepositPlatform.payment_type_id === DEPOSIT_TYPE_BANK_CARD ||
								currentDepositPlatform.payment_type_id === DEPOSIT_TYPE_VIRTUAL_CURRENCY
							) {
								let info = {
									name: content.name,
									amount: content.amount,
									documentId: content.documentId,
									bankId: content.bankId
								};
								commit("setDepositInfo", info);
								push("/pages/fund/deposit-info");
							} else {
								let url = data.recharge_url;
								let postData = data.post_data;

								postDataByHtmlForm(url, postData);
							}
						} else {
							reject(res);
						}
					}).catch(err => {
						uni.hideLoading();
						console.error(err);
					});
				}
			});
		},
		getBankCardList({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getBankCardList().then(res => {
					let {
						errno,
						message,
						data
					} = res;

					if (errno === 0) {
						commit("setBankCardList", data);
						resolve(data);
					} else {
						reject(res);
					}
				}).catch(err => {
					console.error(err);
				})
			})
		},
		withdraw({
			commit,
			getters,
			dispatch
		}, data) {
			return new Promise((resolve, reject) => {
				uni.showLoading({
					mask: true,
					title: vue.$t("common.submitDataLoading")
				});
				withdraw(data).then(res => {
					uni.hideLoading();
					let {
						errno,
						message,
						data
					} = res;

					if (errno === 0) {
						resolve();
						dispatch("getUserInfo");
					} else {
						reject(res);
					}
				}).catch(err => {
					uni.hideLoading();
					console.error(err);
				})
			})
		},
		getBankList({
			commit,
			getters,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getBankList().then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setBankList", data);
						resolve(data);
					} else {
						reject(res);
					}
				}).catch(err => {
					console.error(err);
				})
			})
		},
		bindBankCard({
			commit,
			getters,
			dispatch
		}, data) {
			return new Promise((resolve, reject) => {
				uni.showLoading({
					mask: true,
					title: vue.$t("common.submitDataLoading")
				});
				bindBankCard(data).then(res => {
					uni.hideLoading();
					let {
						errno,
						message,
						data
					} = res;
					if (errno === 0) {
						dispatch("getBankCardList");
						resolve();
					} else {
						reject(res);
					}
				}).catch(err => {
					uni.hideLoading();
					console.error(err);
				})
			});
		}
	}
}
