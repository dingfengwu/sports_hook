const fs = require("fs");
const { AWSTranslateJSON } = require("aws-translate-json");
const { googleTranslate } = require("./google-translate");
const {
  convertEachSimpleTraditional
} = require("./convert-each-simple-traditional");

/**
 * 翻译json数据，与helper项目中的方法存在区别
 * @param {json} data json数据,例如：{username:"xxxxx",password:"xxxxxxxx"}这种格式，不能嵌套
 * @param {string} source 源语言代码
 * @param {string} target 目标语言代码
 * @param {boolean} writeFile 是否写入文件
 * @returns 当写入文件时，写文件，否则返回内容
 */
async function translate(data, source, target, writeFile) {
  if (writeFile === undefined) {
    writeFile = true;
  }
  if (typeof target === "string") {
    target = [target];
  }
  const config = {
    accessKeyId: "AKIA45C3OHD2YNQIA6TV",
    secretAccessKey: "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",
    region: "ap-northeast-1"
  };
  const { translateJSON, translateText } = new AWSTranslateJSON(
    config,
    source,
    target
  );
  // const { translateJSON, translateText } = new googleTranslate(
  //   config,
  //   source,
  //   target
  // );
  //简繁转换
  let content = "";
  const converter = new convertEachSimpleTraditional();
  if (source === "zh-CN" && target[0] === "zh-TW") {
    content = converter.translateJsonToTraditional(data);
  } else if (source === "zh-TW" && target[0] === "zh-CN") {
    content = converter.translateJsonToSimple(data);
  } else {
    const config = {
      accessKeyId: "AKIA45C3OHD2YNQIA6TV",
      secretAccessKey: "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",
      region: "ap-northeast-1"
    };
    const { translateJSON, translateText } = new AWSTranslateJSON(
      config,
      source,
      target
    );
    // const { translateJSON, translateText } = new googleTranslate(
    //   config,
    //   source,
    //   target
    // );

    //分离值中存在{}的键
    let temp = {};
    for (let prop in data) {
      let value = data[prop];
      if (value.indexOf("{") >= 0) {
        temp[prop] = value;

        delete data[prop];
      }
    }

    content = await translateJSON(data);
    if (content) {
      //获取语言包内容
      let lang = {};
      for (let key in content) {
        lang = content[key];
      }
      content = lang;

      //翻译值中有{}的内容
      for (let prop in temp) {
        let result = "";
        let value = temp[prop];
        let pattern = /\{[^}]+\}|<[^>]+>/g;
        let variableFields = value.match(pattern);
        let contentFields = value.split(pattern);
        for (let index in contentFields) {
          let variableFieldValue = variableFields[index];
          let contentFieldValue = contentFields[index];
          if (contentFieldValue) {
            contentFieldValue = await translateText(
              contentFieldValue,
              source,
              target[0]
            );
          }
          result += contentFieldValue;
          if (variableFieldValue !== undefined) {
            if (target !== "zh-tw") {
              variableFieldValue = ` ${variableFieldValue} `;
            }
            result += variableFieldValue;
          }
        }

        content[prop] = result.trim();
      }
    }
  }

  if (writeFile) {
    let outfile = `${target}.js`;
    content = JSON.stringify(content);
    content = "export default " + content;
    fs.writeFileSync(outfile, content, { flag: "w" });
  } else {
    return content;
  }
}

exports.translateJson = translate;
