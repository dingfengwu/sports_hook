const {
	translateByKey,
	translateByFile,
	translateByAllFile,
	deleteByKey,
	updateByKey
} = require("./translate/translate.js");

//运行npm run translate -- --filename=xxx --key=xxx --target=xxx
module.exports = (api, projectOptions) => {
	api.registerCommand(
		"translate", {
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
		async args => {
			let key = args.key;
			let target = args.target;
			let filename = args.filename;
			let allfile = args.allfile;
			let delkey = args.delkey;
			let updatekey = args.updatekey;

			if (target === undefined) {
				console.error("请转入目标语言代码 --target");
				return;
			}

			if (allfile === true) {
				await translateByAllFile({
					target
				});
			} else if (filename !== undefined) {
				await translateByFile({
					filename,
					target
				});
			} else if (key !== undefined) {
				await translateByKey({
					key,
					target
				});
			} else if (delkey !== undefined) {
				await deleteByKey({
					key: delkey,
					target
				});
			} else if (updatekey !== undefined) {
				await updateByKey({
					key: updatekey,
					target
				});
			}
		}
	);
};
