const path = require("path");
const fs = require("fs");
const {
	translateJson
} = require("./lib/translate");
const mapping = require("./config/localeMapping");
const childProcess = require("child_process");

const SOURCE_LOCALE = "zh-CN";

function resolvePath() {
	let root = process.env.LANG_ROOT_DIR;

	let allPath = [root];
	if (arguments !== undefined && arguments.length > 0) {
		allPath.push(...arguments);
	}
	return path.resolve(...allPath);
}

function distributeIndexFile() {
	let indexFile = resolvePath(SOURCE_LOCALE.toLowerCase(), "index.js");
	let locales = getAllLocales();

	locales.forEach(item => {
		let target = resolvePath(item.dir, "index.js");
		fs.copyFile(indexFile, target, (err) => {
			if (err) {
				console.log(`${target}复制失败`);
				throw err;
			}
			console.log(`${target}复制成功`);
		});
	});
}

function getAllLangFiles() {
	let root = resolvePath(SOURCE_LOCALE.toLowerCase());
	let dirs = fs.readdirSync(root, {
		encoding: "utf8",
		withFileTypes: false
	});

	let files = dirs.filter(p => p !== "index.js");
	return files;
}

async function saveLang(fullFilename, data, overwriteAll = false) {
	let content = {};
	if (overwriteAll === true) {
		content = data;
	} else {
		content = readFileContent(fullFilename);
		//如果不存在，创建
		if (content === false) {
			if (!fs.existsSync(fullFilename)) {
				let dir = path.dirname(fullFilename);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir);
				}
				content = {};
			}
		}

		let duplicationKeyCount = 0;
		let allKeyCount = Object.keys(data).length;
		for (let prop in data) {
			if (content[prop] !== undefined) {
				duplicationKeyCount++;
				console.warn(
					`在文件${fullFilename}中已存在${prop},内容为:${content[prop]}`
				);
				continue;
			}

			content[prop] = data[prop];
		}

		//所有的键都重复了，忽略保存
		if (duplicationKeyCount === allKeyCount) {
			return;
		}
	}

	let result = JSON.stringify(content);
	result = "export default " + result;
	fs.writeFileSync(fullFilename, result, {
		encoding: "utf8",
		flag: "w"
	});
	formatJsFile(fullFilename);
}

function formatJsFile(filename) {
	return new Promise((resolve, reject) => {
		let cmd = `npx vue-cli-service lint "${filename}"`;
		childProcess.exec(
			cmd, {
				maxBuffer: 100 * 1024 * 1024
			},
			(err, stdio, stderr) => {
				if (err) {
					// 打印错误
					console.log("eslint error:");
					console.log(stdio || err);

					reject(stdio || err);
				}
				resolve();
			}
		);
	});
}

function getAllLocales() {
	let root = resolvePath();
	let dirs = fs.readdirSync(root, {
		encoding: "utf8",
		withFileTypes: false
	});

	let locales = [];
	for (let index in dirs) {
		let dir = dirs[index];

		//忽略文件
		if (dir.indexOf(".") >= 0) continue;

		let locale = getLocaleByDir(dir);
		//忽略源文件
		if (
			locale.locale === SOURCE_LOCALE &&
			locale.dir === SOURCE_LOCALE.toLowerCase()
		) {
			continue;
		}
		locales.push(locale);
	}

	return locales;
}

function getLocaleByDir(dir) {
	let locale = dir.toLowerCase();
	if (mapping[locale] !== undefined) {
		locale = mapping[locale];
	}

	//格式化
	if (locale.indexOf("-") >= 0) {
		let array = locale.split("-");
		locale = array[0].toLowerCase() + "-" + array[1].toUpperCase();
	}

	return {
		dir: dir,
		locale: locale
	};
}

function getFilename(key, dir) {
	if (key.indexOf(".") === -1) {
		console.warn(`key(${key})格式不正确`);
		return false;
	}

	let array = key.split(".");
	let pattern = /(?=[A-Z])/;
	let filename =
		array[0]
		.split(pattern)
		.join("-")
		.toLowerCase() + ".js";

	return resolvePath(dir.toLowerCase(), filename);
}

function getPropName(key) {
	if (key.indexOf(".") === -1) {
		console.warn(`key(${key})格式不正确`);
		return false;
	}

	return key.split(".")[1];
}

function readFileContent(path) {
	if (!fs.existsSync(path)) {
		console.warn(`文件${path}未找到`);
		return false;
	}

	let content = fs.readFileSync(path, {
		encoding: "utf8",
		flag: "r"
	});
	let pattern = /\s{3}([\w]+):/gim;
	//针对单行情况
	if (content.trim().indexOf("\n") === -1) {
		pattern = /([\w]+):/gim;
	}
	content = content.replace(pattern, `"$1":`);

	content = content
		.replace(/[\r\n\t]+/gim, "")
		.replace("exportdefault", "")
		.replace("export default", "")
		.replace(/;$/, "")
		.replace(/"\s*\+\s*"/gim, "")
		.replace(/`/gim, '"')
		.replace(/\",\}/, "\"\}");

	try {
		return JSON.parse(content);
	} catch (e) {
		console.log(content);
		console.error("如果无法正确转化为JSON对象，则运行npm run lint --fix后尝试");
		throw e;
	}
}

async function translateSingleKey(key, locale) {
	let source = SOURCE_LOCALE;

	let fullFilename = getFilename(key, source);
	if (fullFilename === false) return false;

	let object = readFileContent(fullFilename);
	if (object === false) return false;

	let prop = key.split(".")[1];
	let content = object[prop];
	if (content === undefined) {
		console.warn(`文件${fullFilename}中未找到${prop}属性`);
	}

	content = {
		key: content
	};
	let result = "";
	if (locale === source) {
		result = content;
	} else {
		result = await translateJson(content, source, locale, false);
	}
	return result["key"];
}

async function translateSingleFile(filename, locale, targetDir) {
	let source = SOURCE_LOCALE;

	let fullFilename = resolvePath(source, filename);
	let object = readFileContent(fullFilename);
	if (object === false) return false;

	//移除目标语言中存在的key
	if (targetDir !== undefined) {
		fullFilename = resolvePath(targetDir, filename);
		let targetObject = readFileContent(fullFilename);
		if (targetObject === false) targetObject = {};

		for (let prop in targetObject) {
			delete object[prop];
		}
	}

	let result = "";
	if (locale === source) {
		result = object;
	} else {
		result = await translateJson(object, source, locale, false);
	}
	return result;
}

async function translateKey({
	key,
	target
}) {
	if (target === undefined) {
		console.error("未提供目录语言代码");
		return;
	}

	let targetLang = [];
	if (target === "all") {
		targetLang = getAllLocales();
	} else {
		let locale = getLocaleByDir(target);
		targetLang.push(locale);
	}

	for (let index in targetLang) {
		let dir = targetLang[index]["dir"];
		let locale = targetLang[index]["locale"];
		console.info(`开始翻译${key}到${dir},语言代码为${locale}`);
		let value = await translateSingleKey(key, targetLang[index]["locale"]);

		let fullFilename = getFilename(key, dir);
		let propName = getPropName(key);
		let data = {};
		data[propName] = value;
		await saveLang(fullFilename, data);
	}
}

async function translateFile({
	filename,
	target
}) {
	if (target === undefined) {
		console.error("未提供目录语言代码");
		return;
	}

	let targetLang = [];
	if (target === "all") {
		targetLang = getAllLocales();
	} else {
		let locale = getLocaleByDir(target);
		targetLang.push(locale);
	}

	for (let index in targetLang) {
		let dir = targetLang[index]["dir"];
		let locale = targetLang[index]["locale"];
		console.info(`开始翻译${filename}到${dir},语言代码为${locale}`);
		let data = await translateSingleFile(
			filename,
			targetLang[index]["locale"],
			dir
		);

		let fullFilename = resolvePath(dir, filename);
		await saveLang(fullFilename, data);
	}
}

async function translateAllFile({
	target
}) {
	if (target === undefined) {
		console.error("未提供目录语言代码");
		return;
	}

	let targetLang = [];
	if (target === "all") {
		targetLang = getAllLocales();
	} else {
		let locale = getLocaleByDir(target);
		targetLang.push(locale);
	}

	let allFiles = getAllLangFiles();

	for (let index in targetLang) {
		let dir = targetLang[index]["dir"];
		let locale = targetLang[index]["locale"];
		for (let innerIndex in allFiles) {
			let filename = allFiles[innerIndex];
			console.info(`开始翻译${filename}到${dir},语言代码为${locale}`);
			let data = await translateSingleFile(
				filename,
				targetLang[index]["locale"],
				dir
			);

			let fullFilename = resolvePath(dir, filename);
			await saveLang(fullFilename, data);
		}
	}

	distributeIndexFile();
}

function deleteKey({
	key,
	target,
	includeSource = true
}) {
	if (target === undefined) {
		console.error("未提供目录语言代码");
		return;
	}

	let targetLang = [];
	if (target === "all") {
		targetLang = getAllLocales();

		if (includeSource === true) {
			targetLang.push({
				dir: SOURCE_LOCALE.toLowerCase(),
				locale: SOURCE_LOCALE
			});
		}
	} else {
		let locale = getLocaleByDir(target);
		targetLang.push(locale);
	}

	let array = key.split(".");
	if (array.length !== 2) {
		console.warn(`指定的key(${key})格式不正确`);
		return;
	}

	let pattern = /(?=[A-Z])/;
	let filename =
		array[0]
		.split(pattern)
		.join("-")
		.toLowerCase() + ".js";

	targetLang.forEach(item => {
		let fullFilename = resolvePath(item.dir, filename);
		let content = readFileContent(fullFilename);
		if (content === false) {
			console.log(`文件${fullFilename}读取失败`);
			return;
		}

		if (content[array[1]] === undefined) return;

		delete content[array[1]];
		saveLang(fullFilename, content, true);
		console.log(`已从${fullFilename}中删除${array[1]}`);
	});
}

function updateKey({
	key,
	target
}) {
	//选删除，再更新
	deleteKey({
		key,
		target,
		includeSource: false
	});
	translateKey({
		key,
		target
	});
}

exports.translateByKey = translateKey;
exports.translateByFile = translateFile;
exports.translateByAllFile = translateAllFile;
exports.deleteByKey = deleteKey;
exports.updateByKey = updateKey;
