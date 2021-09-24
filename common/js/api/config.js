import {
	config
} from "../../../common/js/config.js";
import {
	axiosJson,
	axios
} from "./axios.js"

export const getLotteryConfigVersion = () => {
	let merchant = config.merchant;
	let rnd = parseInt(Math.random() * 1000000);
	return axiosJson({
		url: `/json/configs/${merchant}/${merchant}-lottery-config-list.json?${rnd}`
	});
}
export const getHomeConfigVersion = () => {
	let client = config.client;
	let merchant = config.merchant;
	let rnd = parseInt(Math.random() * 1000000);
	return axiosJson({
		url: `/json/configs/${merchant}/${merchant}-home-config-list-${client}.json?${rnd}`
	});
}
export const getSystemConfig = (version) => {
	let merchant = config.merchant;
	return axiosJson({
		url: `/json/configs/${merchant}/${merchant}-system-configs-${version}.json`
	});
}
export const getBannerList = () => {
	return axios({
		params: {
			action: "getBannerList"
		}
	});
}
export const getDistricts = () => {
	return axios({
		params: {
			action: "getDistricts"
		}
	});
}
export const getNoticeList = (version) => {
	let merchant = config.merchant;
	return axiosJson({
		url: `/json/configs/${merchant}/${merchant}-announcements-${version}.json`
	});
}
export const getNoticeDetail = (id) => {
	return axios({
		params: {
			action: "getNoticeDetail",
			id: id,
		}
	});
}
export const getLotteryMenuList = (version) => {
	let merchant = config.merchant;
	let lang = config.lang;

	// /json/configs/taiyaguoji/taiyaguoji-lottery-menu-zh-CN-2.json
	return axiosJson({
		url: `/json/configs/${merchant}/${merchant}-lottery-menu-${lang}-${version}.json`
	});
}
