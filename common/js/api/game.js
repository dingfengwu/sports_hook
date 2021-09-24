import axios from './axios.js'
import {
	config
} from "../config.js"

/**
 * 获取游戏记录
 * @param isTeam  是否为团队游戏记录
 * @param status  注单状态
 */
export const getProjectList = ({
	lotteryId,
	page,
	pagesize,
	status,
	beginTime,
	endTime,
	isTeam,
	username
}) => {
	return axios({
		method: "get",
		params: {
			action: "getProjectList",
			lottery_id: lotteryId,
			page,
			status,
			pagesize: pagesize,
			begin_time: beginTime,
			end_time: endTime,
			search_team: isTeam || 0,
			username: username
		}
	});
}
export const getUserProfitData = ({
	beginDate,
	endDate,
	page,
	pagesize
}) => {
	return axios({
		method: "get",
		params: {
			action: "GetUserProfitData",
			begin_date: beginDate,
			end_date: endDate,
			page: page || 1,
			pagesize: pagesize || config.defaultPagesize
		}
	});
}
export const getMatchList = ({
	matchId,
	status,
	beginDate,
	endDate,
	page,
	pagesize
}) => {
	return axios({
		method: "get",
		params: {
			action: "GetMatchList",
			match_id: matchId || "",
			status: status,
			date: [beginDate, endDate],
			page: page || 1,
			pagesize: pagesize || config.defaultPagesize
		}
	});
}
