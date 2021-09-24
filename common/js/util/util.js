import md5 from "blueimp-md5";

export const encryptionPassword = (username, password) => {
	if (!password || !username) return "";
	return md5(md5(md5(username.toLowerCase() + password)));
}

//url为完整的url地址，以http或https开头
export const openUrlInNewWindow = (url) => {
	if (window.navigator.userAgent.indexOf("gameapp") >= 0) {
		//判断操作系统
		if (window.api.systemType == "android") {
			//安卓下，如果有安装QQ浏览器就用QQ浏览器打开，否则用默认方式打开。
			window.api.appInstalled({
					appBundle: "com.tencent.mtt"
				},
				function(ret) {
					if (ret && ret.installed) {
						location.href = `mttbrowser://url=${url}`;
					} else {
						window.api.openApp({
								androidPkg: "android.intent.action.VIEW",
								mimeType: "text/html",
								uri: url
							},
							function(ret, err) {}
						);
					}
				}
			);
		} else {
			//iOS中的使用方法如下：
			window.api.openApp({
				iosUrl: url
			});
		}
	} else {
		//window.open(url, "_system");
		let a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		a.href = url;
		a.target = "_blank";
		a.click();
		document.body.removeChild(a);
	}
}

export const setTimer = (timer, span, callback) => {
	if (timer) {
		clearTimeout(timer);
	}

	setTimeout(callback, span);
}

export const postDataByHtmlForm = (url, data) => {
	let hasProp = false;
	if (data) {
		for (var i in data) {
			hasProp = true;
		}
	}

	let pattern = /success_url=([^&]+)/;
	if (hasProp) {
		let content = "";
		content += `url=${url}`;
		for (const key in data) {
			content += `&${key}=${data[key]}`;
		}

		let target =
			"http://" +
			window.location.host +
			"/static/recharge.html?" +
			content;
		openUrlInNewWindow(target);
	} else if (pattern.test(url)) {
		let successUrl = url.match(pattern);
		if (successUrl && successUrl.length > 1) {
			successUrl = successUrl[1];
		}
		url = url.replace(successUrl, encodeURIComponent(successUrl));
		openUrlInNewWindow(url);
	} else {
		openUrlInNewWindow(url);
	}
}

export const formatDate = function(date, fmt) {
	fmt = fmt || "yyyy-MM-dd";
	const o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'S+': date.getMilliseconds()
	}

	// 因位date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
	if (/(y+)/.test(fmt)) {
		// 第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。

		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
		// eslint-disable-next-line no-console
		// console.log(date.getTime(), date.getFullYear())
	}
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			// 第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ?
				o[k] :
				('00' + o[k]).substr(String(o[k]).length)
			)
		}
	}
	return fmt
}

export const convertTimestampToTime = (timestamp) => {
	let milliseconds = timestamp * 1000;
	return new Date(milliseconds);
}

export const convertToZoneTime = (timestampMilliseconds, zone) => {
	let now = new Date();

	let flag = zone.substr(0, 1);
	if (flag === "-") {
		flag = -1;
	} else {
		flag = 1;
	}
	let segs = zone.replace(/[+-]/igm, "").split(":");
	let main = segs[0];
	let sub = 0;
	if (segs.length > 0) {
		sub = segs[1];
	}

	timestampMilliseconds = timestampMilliseconds + flag * (+main * 3600 * 1000 + +sub * 60 * 1000);

	let offsetMilliseconds = now.getTimezoneOffset() * 60 * 1000;
	timestampMilliseconds = timestampMilliseconds + offsetMilliseconds;

	now.setTime(timestampMilliseconds);
	return now;
}

export const addDays = (date, days) => {
	var date = new Date(date.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

export const getMonthDays = (myMonth) => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	var monthStartDate = new Date(nowYear, myMonth, 1);
	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	return days;
}
//获得本季度的开始月份
export const getQuarterStartMonth = () => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	var quarterStartMonth = 0;
	if (nowMonth < 3) {
		quarterStartMonth = 0;
	}
	if (2 < nowMonth && nowMonth < 6) {
		quarterStartMonth = 3;
	}
	if (5 < nowMonth && nowMonth < 9) {
		quarterStartMonth = 6;
	}
	if (nowMonth > 8) {
		quarterStartMonth = 9;
	}
	return quarterStartMonth;
}
export const thisWeek = () => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	let time1 = formatDate(weekStartDate);
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	let time2 = formatDate(weekEndDate);
	return [time1, time2];
}

export const lastWeek = () => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
	let time1 = formatDate(weekStartDate);
	var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
	let time2 = formatDate(weekEndDate);
	return [time1, time2];
}

export const thisMonth = () => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	var monthStartDate = new Date(nowYear, nowMonth, 1);
	let time1 = formatDate(monthStartDate);
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	let time2 = formatDate(monthEndDate);
	return [time1, time2];
}

export const lastMonth = () => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	if (lastMonth == 11) {
		var lastMonthStartDate = new Date(nowYear - 1, lastMonth, 1);
	} else {
		var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	}
	let time1 = formatDate(lastMonthStartDate);

	if (lastMonth == 11) {
		var lastMonthEndDate = new Date(nowYear - 1, lastMonth, getMonthDays(lastMonth));
	} else {
		var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	}
	let time2 = formatDate(lastMonthEndDate);
	return [time1, time2];
}

export const thisQuarter = () => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
	let time1 = formatDate(quarterStartDate);

	var quarterEndMonth = getQuarterStartMonth() + 2;
	var quarterStartDate = new Date(nowYear, quarterEndMonth,
		getMonthDays(quarterEndMonth));
	let time2 = formatDate(quarterStartDate);
	return [time1, time2];
}
