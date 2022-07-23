"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
class googleTranslate {
  constructor(config, sourceLang = "en", tagetLangs = ["en"]) {
    this.translateJSON = (obj, langs = this.tagetLangs, displayLang = true) =>
      __awaiter(this, void 0, void 0, function*() {
        const resp = {};
        const langsToTranslate = langs;
        for (let lang of langsToTranslate) {
          for (let key in obj) {
            let word = "";
            try {
              word =
                typeof obj[key] === "object"
                  ? yield this.translateJSON(obj[key], [lang], false)
                  : yield this.translateText(obj[key], this.sourceLang, lang);
            } catch (e) {
              console.error(e);
              word = "";
            }
            if (displayLang) {
              resp[lang] = resp[lang] || {};
              resp[lang][key] = word;
            } else {
              resp[key] = word;
            }
          }
        }
        return resp;
      });
    this.translateText = (text = "", sourceLang, targetLang) =>
      new Promise((resolve, reject) => {
        if (!targetLang || !sourceLang) reject("Missing source or target lang");

        let word = encodeURIComponent(text);
        let url = `http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=${sourceLang}&tl=${targetLang}&q=${word}`;
        axios.get(url, { timeout: 60000 }).then(res => {
          let { sentences } = res.data;
          if (sentences === undefined) {
            return reject();
          } else {
            let result = "";
            for (let index in sentences) {
              let item = sentences[index].trans;
              result += item;
            }
            setTimeout(function() {
              resolve(result);
            }, 500);
          }
        });
      });
    this.sourceLang = sourceLang;
    this.tagetLangs = tagetLangs;
  }
}
exports.googleTranslate = googleTranslate;
