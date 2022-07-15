const fs = require("fs");

function firstUppercase([first, ...rest]) {
  return first.toUpperCase() + rest.join("");
}

function convertSingleSentence(value, allCapitalized) {
  let result = "";
  let pattern = /\{[^}]+\}|<[^>]+>|\s/g;
  let variableFields = value.match(pattern) || [];
  let contentFields = value.split(pattern) || [];
  for (let prop in contentFields) {
    let variableFieldValue = variableFields[prop];
    let contentFieldValue = contentFields[prop];
    let index = +prop;
    if (contentFieldValue) {
      if (index === 0) {
        contentFieldValue = firstUppercase(contentFieldValue);
      } else if (index > 0 && allCapitalized) {
        contentFieldValue = firstUppercase(contentFieldValue);
      }
    }
    result += contentFieldValue;
    if (variableFieldValue !== undefined) {
      result += variableFieldValue;
    }
  }
  return result.trim();
}

function convertCapitalizedLetter(data, config) {
  let result = {};
  for (let prop in data) {
    for (let innerProp in data[prop]) {
      let allCapitalized = true;
      let value = data[prop][innerProp];
      if (config[prop] && config[prop].indexOf(innerProp) >= 0) {
        allCapitalized = false;
      }

      let singleResult = convertSingleSentence(value, allCapitalized);
      result[prop] = result[prop] || {};
      result[prop][innerProp] = singleResult;
    }
  }

  let outfile = `result.js`;
  let content = JSON.stringify(result);
  content = "export default " + content;
  fs.writeFileSync(outfile, content, { flag: "w" });
}

exports.convertCapitalizedLetter = convertCapitalizedLetter;
