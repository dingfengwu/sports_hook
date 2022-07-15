const openCc = require("opencc-js");

class convertEachSimpleTraditional {
  constructor() {
    (this.translateJsonToSimple = obj => {
      return this.translateJson(obj, "tw", "cn");
    }),
      (this.translateJsonToTraditional = obj => {
        return this.translateJson(obj, "cn", "tw");
      }),
      (this.translateJson = (obj, from, to) => {
        let resp = {};
        const converter = openCc.Converter({ from, to });

        for (let key in obj) {
          let word = "";
          try {
            word =
              typeof obj[key] === "object"
                ? this.translateJson(obj[key], from, to)
                : converter(obj[key]);
          } catch (e) {
            console.error(e);
            word = "";
          }
          resp[key] = word;
        }

        return resp;
      });
  }
}

exports.convertEachSimpleTraditional = convertEachSimpleTraditional;
