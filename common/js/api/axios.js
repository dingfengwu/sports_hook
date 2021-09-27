import {
	config
} from '../config.js';
import {
	getToken
} from "../cache/account.js";
import qs from "qs";
import request from "axios";

export const axios = (data) => {
	return new Promise((resolve, reject) => {
		let token = getToken() || "";
		let baseData = {
			terminal_id: config.terminalId || 1,
			lang: config.lang || "zh-CN",
		};
		let baseHeader = {
			"content-type": "application/json",
			"token": token
		};
		let baseUrl = config.baseUrl;
		let method = (data.method || "get").toUpperCase();

		let url = "";
		if (data.url) {
			url = data.url;
		} else {
			url = baseUrl;
		}

		let requestData = {};
		let requestParams = {};
		if (method === "POST") {
			requestData = {
				...data.data || {},
				...baseData
			};

			if (data.data === undefined) {
				console.warn("此提交方法为POST,但未指定data");
			}
		} else {
			requestParams = {
				...data.params,
				...baseData
			};
		}

		let header = {};
		if (data.headers) {
			header = {
				...baseHeader,
				...data.headers
			};
		}
		
		request({
			url: url,
			data: requestData,
			params: requestParams,
			method: method,
			header: header
		}).then(res => {
			let data = res.data;

			if (res.status === 200) {
				resolve(data);
			} else {
				console.error(data);
				reject({
					errno: 400,
					message: "Network Error"
				});
			}
		}).catch(err => {
			console.error(err);
			reject({
				errno: 400,
				message: "Network Error"
			});
		})
	})
}

export const axiosJson = ({
	url
}) => {
	return new Promise((resolve, reject) => {
		request({
			url: url,
			method: "GET"
		}).then(res => {
			let data = res.data;
			resolve(data);
		}).catch(err => {
			reject(err);
		})
	});
};


export default axios;
