import axios from './axios.js'
import {
	encryptionPassword
} from "../util/util.js"

export const getCaptcha = () => {
	return axios({
		method: 'get',
		params: {
			action: "getCaptcha"
		}
	})
}
export const login = (data) => {
	return axios({
		method: 'get',
		params: {
			action: "login",
			username: data.username,
			password: encryptionPassword(data.username, data.password),
			key: data.key || "",
			captcha: data.captcha || ""
		}
	});
}
export const logout = () => {
	return axios({
		method: 'get',
		params: {
			action: "logout"
		}
	})
}
export const getUserInfo = () => {
	return axios({
		method: 'get',
		params: {
			action: "getCurrentUserInfo"
		}
	})
}
export const register = (data) => {
	return axios({
		method: 'get',
		params: {
			action: "LinkCreateUser",

			key: data.key,

			username: data.username,
			password: data.password,
			password_confirmation: data.confirmPassword || data.password,
			captcha: data.captcha || "",

			name: data.realname || data.username,
			nickname: data.nickname || data.username,
			wechat: data.wechat || "",
			mobile: data.mobile || "",
			qq: data.qq || "",

			parent_id: 0,
			prize_group: 0,
			is_agent: 0,
			is_tester: 0,
			quota: {}
		}
	})
}
export const changeLoginPassword = ({
	oldPassword,
	newPassword
}) => {
	return axios({
		method: 'post',
		data: {
			action: "changeLoginPwd",
			current_password: oldPassword,
			new_password: newPassword
		}
	})
}
export const changeFundPassword = ({
	oldPassword,
	newPassword
}) => {
	return axios({
		method: 'post',
		data: {
			action: "changeFundPwd",
			current_password: oldPassword,
			new_password: newPassword
		}
	})
}
export const getMessageCount = () => {
	return axios({
		method: 'get',
		params: {
			action: "getMessageCount"
		}
	})
}
export const getMessageList = ({
	pagesize,
	page
}) => {
	return axios({
		method: 'get',
		params: {
			action: "getMessageList",
			page_size: pagesize,
			page: page,
			type_id: 0
		}
	})
}
export const getRegisterLinks = ({
	pagesize,
	page
}) => {
	return axios({
		method: 'get',
		params: {
			action: "getRegisterLinks",
			page_size: pagesize,
			page: page,
			type_id: 0
		}
	});
}
export const readMessage = (id) => {
	return axios({
		method: 'get',
		params: {
			action: "readMessage",
			id: id
		}
	})
}
export const createRegisterLink = ({
	isAgent, //1为代理，0为用户
	days, //0表示永久
	prizeGroup
}) => {
	return axios({
		method: "post",
		data: {
			action: "CreateRegisterLink",
			prize_group_type: 2,
			series_prize_group_json: `{"1":"${prizeGroup}"}`,
			is_agent: isAgent,
			prize_group_id: "",
			valid_days: days,
			channel: "",
			agent_prize_set_quota: "{}",
			agent_qqs: ""
		}
	});
}
