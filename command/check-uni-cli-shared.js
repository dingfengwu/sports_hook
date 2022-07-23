const path = require('path')
const fs = require('fs')

const rootPath = path.resolve(process.cwd(), 'node_modules');

function resolvePath(dir) {
	return path.resolve(rootPath, dir);
}

function check() {
	let path = resolvePath('@dcloudio/uni-cli-shared/lib/pages.js');
	return fs.existsSync(path);
}

module.exports = check;
