import {
	config
} from "../config.js";

function slice(str, index) {
	return str.split('-')[index] || str;
}

function pluralize(time, label) {
	if (time === 1) {
		return time + label
	}
	return time + label + 's'
}

export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time)
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute')
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour')
	} else {
		return pluralize(~~(between / 86400), ' day')
	}
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
	const si = [{
			value: 1e18,
			symbol: 'E'
		},
		{
			value: 1e15,
			symbol: 'P'
		},
		{
			value: 1e12,
			symbol: 'T'
		},
		{
			value: 1e9,
			symbol: 'G'
		},
		{
			value: 1e6,
			symbol: 'M'
		},
		{
			value: 1e3,
			symbol: 'k'
		}
	]
	for (let i = 0; i < si.length; i++) {
		if (num >= si[i].value) {
			return (
				(num / si[i].value + 0.1)
				.toFixed(digits)
				.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
			)
		}
	}
	return num.toString()
}
export function toIntNumber(num) {
	return parseInt(+num || 0);
}
export function toThousandslsFilter(num) {
	if (isNaN(num)) return num;
	
	num = +num || 0;
	num = Math.round(+num * Math.pow(10, 2)) / Math.pow(10, 2);
	return new Intl.NumberFormat(config.lang).format(num);
}
export function formatPrice(num) {
	return Number.isInteger(num) ? `${num}.00` : num
}
export function formatBettingRecordBetNumber(num) {
	return num ? num.split('|').join(',') : ''
}
export function formatBettingRecordPrize(num) {
	return num ? num : 0
}
export function formatBettingSerialNumber(num) {
	return num ? num.split('.')[1] : ''
}

export function getRound4(num) {
	return Math.round(+num * Math.pow(10, 4)) / Math.pow(10, 4)
}
export function sortWnNumber3D(num) {
	return num ?
		num
		.split('')
		.map(a => +a)
		.reduce((a, b) => a + b) :
		''
}
export function getCount(arr) {
	if (arr && arr.length) {
		return arr.map(item => item.count).join(',')
	}
}
export function getBonus(arr) {
	if (arr && arr.length) {
		return arr.map(item => Math.round(item.bonus)).join(',')
	}
}
// 保留小数点后两位的过滤器，尾数四舍五入
export function numFilter(value) {
	if (value === '' || value === null || value === undefined || value === '--') {
		return value
	} else {
		let str = value.toString()
		let num = str.split(',')
		value = parseFloat(num.join(''))
		let re = /^(\+|-)?\d+($|\.\d+$)/
		if (re.test(value)) {
			value = Number(value)
			return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
		} else {
			return value
		}
	}
}
export function changeWordSymbol(content) {
	return content ?
		content
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#39;/g, "'") :
		''
}
export function accMul(arg1) {
	// 乘法
	let arg2 = 100
	let m = 0
	let s1 = arg1.toString()
	let s2 = arg2.toString()
	try {
		m += s1.split('.')[1].length
	} catch (e) {}
	try {
		m += s2.split('.')[1].length
	} catch (e) {}
	return (
		(Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
		Math.pow(10, m)
	)
}
