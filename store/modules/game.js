import {
	getProjectList,
	getUserProfitData,
	getMatchList
} from "../../common/js/api/game.js"
import {
	config
} from "../../common/js/config.js";

export default {
	state: {
		gameRecordList: [],
		gameRecordSummary: {},
		currentGameDetail: {},
		userProfit: {},
		matchList:[]
	},
	getters: {
		gameRecordList: state => state.gameRecordList,
		gameRecordSummary: state => state.gameRecordSummary,
		currentGameDetail: state => state.currentGameDetail,
		userProfit: state => state.userProfit,
		matchList:state=>state.matchList
	},
	mutations: {
		setGameRecordList(state, value) {
			state.gameRecordList = value;
		},
		setGameRecordSummary(state, value) {
			state.gameRecordSummary = value;
		},
		setCurrentGameDetail(state, value) {
			state.currentGameDetail = value;
		},
		setUserProfit(state, value) {
			state.userProfit = value;
		},
		setMatchList(state,value){
			state.matchList=value;
		}
	},
	actions: {
		getProjectList({
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
				getProjectList(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;

					if (errno === 0) {
						let summary = {
							total_count: data.total_count
						};
						if (args.page === 1) {
							commit("setGameRecordList", data.data);
						} else {
							let source = getters["gameRecordList"] || [];
							source.push(...data.data);
							commit("setGameRecordList", source);
						}
						commit("setGameRecordSummary", summary)

						return resolve({
							current: data.data,
							completed: data.data.length < args.pagesize
						});
					}
					return reject(res);
				}).catch(err => {
					console.error(err);
				})
			});
		},
		getUserProfitData({
			commit,
			getters,
			dispatch
		}, args) {
			return new Promise((resolve, reject) => {
				getUserProfitData(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setUserProfit", data);
						return resolve();
					}
					return reject();
				}).catch(err => {
					console.error(err);
				});
			});
		},
		getMatchList({
			commit,
			getters,
			dispatch
		}, args) {
			return new Promise((resolve, reject) => {
				getMatchList(args).then(res => {
					let {
						errno,
						data,
						message
					} = res;
					if (errno === 0) {
						commit("setMatchList", res);
						return resolve();
					}
					return reject();
				}).catch(err => {
					console.error(err);
				})
			})
		}
	}
}
