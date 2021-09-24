import {
	config
} from '../config.js';
import {
	getToken
} from "../cache/account.js";

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
		if (method === "POST") {
			requestData = {
				...data.data || {},
				...baseData
			};

			if (data.data === undefined) {
				console.warn("此提交方法为POST,但未指定data");
			}
		} else {
			//如果存在数组，则转化
			let newProp = "";
			let params = data.params.valueOf();
			for (let prop in params) {
				let item = params[prop];
				if (Array.isArray(item)) {
					for (let index in item) {
						let value = item[index];
						newProp += `&${prop}[]=${value}`;
					}
					delete params[prop];
				}
			}
			requestData = {
				...params,
				...baseData
			};

			if (url.indexOf("?")>=0) {
				url += newProp;
			} else {
				url += "?" + newProp.substr(1);
			}
			
			console.log(url,"url");
		}

		let header = {};
		if (data.headers) {
			header = {
				...baseHeader,
				...data.headers
			};
		}
		
		uni.request({
			url: url,
			data: requestData,
			method: method,
			header: header,
			success: (res) => {
				let data = res.data;

				if (res.statusCode === 200) {
					resolve(data);
				} else {
					console.error(data);
					reject({
						errno: 400,
						message: "Network Error"
					});
				}
			},
			fail: (err) => {
				console.error(err);
				reject({
					errno: 400,
					message: "Network Error"
				});
			}
		})
	})
}

export const axiosJson = ({
	url
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: "GET",
			success: (res) => {
				let data = res.data;
				resolve(data);
			},
			fail: (err) => {
				reject(err);
			}
		})
	});
};

export default axios;
