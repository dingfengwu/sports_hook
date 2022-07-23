const path = require("path");
const fs = require("fs");
const { translateJson } = require("./lib/translate");
const mapping = require("./config/localeMapping");
const childProcess = require("child_process");

module.exports = class translate {
  langdir = "";
  sourcelocale = "";
  sourcedir = "";
  constructor(langdir, sourcelocale, sourcedir) {
    this.langdir = langdir;
    this.sourcedir = sourcedir;
    this.sourcelocale = sourcelocale;
  }

  resolvePath() {
    let root = this.langdir;

    let allPath = [root];
    if (arguments !== undefined && arguments.length > 0) {
      allPath.push(...arguments);
    }
    return path.resolve(...allPath);
  }

  distributeIndexFile() {
    let indexFile = this.resolvePath(this.sourcedir, "index.js");
    let locales = this.getAllLocales();

    locales.forEach(item => {
      let target = this.resolvePath(item.dir, "index.js");
      fs.copyFile(indexFile, target, err => {
        if (err) {
          console.log(`${target}复制失败`);
          throw err;
        }
        console.log(`${target}复制成功`);
      });
    });
  }

  getAllLangFiles() {
    let root = this.resolvePath(this.sourcedir.toLowerCase());
    let dirs = fs.readdirSync(root, {
      encoding: "utf8",
      withFileTypes: false
    });

    let files = dirs.filter(p => p !== "index.js");
    return files;
  }

  async saveLang(fullFilename, data, overwriteAll = false) {
    let content = {};
    if (overwriteAll === true) {
      content = data;
    } else {
      content = this.readFileContent(fullFilename);
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
    this.formatJsFile(fullFilename);
  }

  formatJsFile(filename) {
    return new Promise((resolve, reject) => {
      let cmd = `npx vue-cli-service lint "${filename}"`;
      childProcess.exec(
        cmd,
        {
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

  getAllLocales() {
    let root = this.resolvePath();
    let dirs = fs.readdirSync(root, {
      encoding: "utf8",
      withFileTypes: false
    });

    let locales = [];
    for (let index in dirs) {
      let dir = dirs[index];

      //忽略文件
      if (dir.indexOf(".") >= 0) continue;

      let locale = this.getLocaleByDir(dir);
      //忽略源文件
      if (
        locale.locale === this.sourcelocale &&
        locale.dir === this.sourcedir
      ) {
        continue;
      }
      locales.push(locale);
    }

    return locales;
  }

  getLocaleByDir(dir) {
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

  getFilename(key, dir) {
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

    return this.resolvePath(dir.toLowerCase(), filename);
  }

  getPropName(key) {
    if (key.indexOf(".") === -1) {
      console.warn(`key(${key})格式不正确`);
      return false;
    }

    return key.split(".")[1];
  }

  readFileContent(path) {
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
      .replace(/\",\}/, '"}');

    try {
      return JSON.parse(content);
    } catch (e) {
      console.log(content);
      console.error(
        "如果无法正确转化为JSON对象，则运行npm run lint --fix后尝试"
      );
      throw e;
    }
  }

  async translateSingleKey(key, locale) {
    let fullFilename = this.getFilename(key, this.sourcedir);
    if (fullFilename === false) return false;

    let object = this.readFileContent(fullFilename);
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
    if (locale === this.sourcelocale) {
      result = content;
    } else {
      result = await translateJson(content, this.sourcelocale, locale, false);
    }
    return result["key"];
  }

  async translateSingleFile(filename, locale, targetDir) {
    let fullFilename = this.resolvePath(this.sourcedir, filename);
    let object = this.readFileContent(fullFilename);
    if (object === false) return false;

    //移除目标语言中存在的key
    if (targetDir !== undefined) {
      fullFilename = this.resolvePath(targetDir, filename);
      let targetObject = this.readFileContent(fullFilename);
      if (targetObject === false) targetObject = {};

      for (let prop in targetObject) {
        delete object[prop];
      }
    }

    let result = "";
    if (locale === this.sourcelocale) {
      result = object;
    } else {
      result = await translateJson(object, this.sourcelocale, locale, false);
    }
    return result;
  }

  async translateKey({ key, target }) {
    if (target === undefined) {
      console.error("未提供目录语言代码");
      return;
    }

    let targetLang = [];
    if (target === "all") {
      targetLang = this.getAllLocales();
    } else {
      let locale = this.getLocaleByDir(target);
      targetLang.push(locale);
    }

    for (let index in targetLang) {
      let dir = targetLang[index]["dir"];
      let locale = targetLang[index]["locale"];
      console.info(`开始翻译${key}到${dir},语言代码为${locale}`);
      let value = await this.translateSingleKey(
        key,
        targetLang[index]["locale"]
      );

      let fullFilename = this.getFilename(key, dir);
      let propName = this.getPropName(key);
      let data = {};
      data[propName] = value;
      await this.saveLang(fullFilename, data);
    }
  }

  async translateFile({ filename, target }) {
    if (target === undefined) {
      console.error("未提供目录语言代码");
      return;
    }

    let targetLang = [];
    if (target === "all") {
      targetLang = this.getAllLocales();
    } else {
      let locale = this.getLocaleByDir(target);
      targetLang.push(locale);
    }

    for (let index in targetLang) {
      let dir = targetLang[index]["dir"];
      let locale = targetLang[index]["locale"];
      console.info(`开始翻译${filename}到${dir},语言代码为${locale}`);
      let data = await this.translateSingleFile(
        filename,
        targetLang[index]["locale"],
        dir
      );

      let fullFilename = this.resolvePath(dir, filename);
      await this.saveLang(fullFilename, data);
    }
  }

  async translateAllFile({ target }) {
    if (target === undefined) {
      console.error("未提供目录语言代码");
      return;
    }

    let targetLang = [];
    if (target === "all") {
      targetLang = this.getAllLocales();
    } else {
      let locale = this.getLocaleByDir(target);
      targetLang.push(locale);
    }

    let allFiles = this.getAllLangFiles();

    for (let index in targetLang) {
      let dir = targetLang[index]["dir"];
      let locale = targetLang[index]["locale"];
      for (let innerIndex in allFiles) {
        let filename = allFiles[innerIndex];
        console.info(`开始翻译${filename}到${dir},语言代码为${locale}`);
        let data = await this.translateSingleFile(
          filename,
          targetLang[index]["locale"],
          dir
        );

        let fullFilename = this.resolvePath(dir, filename);
        await this.saveLang(fullFilename, data);
      }
    }

    this.distributeIndexFile();
  }

  deleteKey({ key, target, includeSource = true }) {
    if (target === undefined) {
      console.error("未提供目录语言代码");
      return;
    }

    let targetLang = [];
    if (target === "all") {
      targetLang = this.getAllLocales();

      if (includeSource === true) {
        targetLang.push({
          dir: this.sourcedir,
          locale: this.sourcelocale
        });
      }
    } else {
      let locale = this.getLocaleByDir(target);
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
      let fullFilename = this.resolvePath(item.dir, filename);
      let content = this.readFileContent(fullFilename);
      if (content === false) {
        console.log(`文件${fullFilename}读取失败`);
        return;
      }

      if (content[array[1]] === undefined) return;

      delete content[array[1]];
      this.saveLang(fullFilename, content, true);
      console.log(`已从${fullFilename}中删除${array[1]}`);
    });
  }

  updateKey({ key, target }) {
    //先删除，再更新
    this.deleteKey({
      key,
      target,
      includeSource: false
    });
    this.translateKey({
      key,
      target
    });
  }
};
