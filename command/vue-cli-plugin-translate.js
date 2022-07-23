const translate = require("./translate/translate.js");

function parseCommandArgs(args) {
  if (args === undefined) return {};

  let result = {};
  let array = args.split(/[\s=]+/);
  for (let index in array) {
    index = +index;
    let current = array[index];
    if (current.indexOf("--") < 0) continue;

    let next = "";
    let prop = current.replace("--", "");
    if (index + 1 < array.length) {
      next = array[index + 1];
    }

    if (next.indexOf("--") >= 0 || next === "") {
      result[prop] = true;
    } else {
      result[prop] = next;
    }
  }
  return result;
}

//运行npm run translate -- --filename xxx --key xxx --target xxx
module.exports = (api, projectOptions) => {
  api.registerCommand(
    "translate",
    {
      description: "翻译语言文件",
      usage: "vue-cli-service translate",
      options: {
        "--key": "语言key",
        "--filename": "语言文件",
        "--target": "目录语言代码,all为所有语言",
        "--allfile": "是否翻译所有文件",
        "--delkey": "删除指定的key",
        "--updatekey": "更新指定的key"
      }
    },
    async (args, options) => {
      let projectArgs = parseCommandArgs(
        projectOptions.pluginOptions.translate.params
      );

      let key = args.key;
      let target = args.target;
      let filename = args.filename;
      let allfile = args.allfile;
      let delkey = args.delkey;
      let updatekey = args.updatekey;
      let sourcedir = projectArgs.sourcedir;
      let sourcelocale = projectArgs.sourcelocale;
      let langdir = projectArgs.langdir;

      let trans = new translate(langdir, sourcelocale, sourcedir);
      if (target === undefined) {
        console.error("请转入目标语言代码 --target");
        return;
      }

      if (allfile === true) {
        await trans.translateAllFile({
          target
        });
      } else if (filename !== undefined) {
        await trans.translateFile({
          filename,
          target
        });
      } else if (key !== undefined) {
        await trans.translateKey({
          key,
          target
        });
      } else if (delkey !== undefined) {
        await trans.deleteKey({
          key: delkey,
          target
        });
      } else if (updatekey !== undefined) {
        await trans.updateKey({
          key: updatekey,
          target
        });
      }
    }
  );
};
