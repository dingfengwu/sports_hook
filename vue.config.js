const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages();

// let extraActions = ["GetMatchList", "GetGameList", "GetMatchDetail", "sportBet"];
// let extraProxyHost = "sport.com";
// let proxyUrl = "http://www.kyrin.com";

// //本地
// let extraActions = [];
// let extraProxyHost = "";
// let proxyUrl = "http://sport.com";

//线上
let extraActions = [];
let extraProxyHost = "";
let proxyUrl = "https://www.fc16888.com";

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath', 'style', 'meta']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	},
	devServer: {
		"https": false,
		"port": 80, //端口号
		"disableHostCheck": true,
		"proxy": {
			"/api": {
				"target": proxyUrl,
				"changeOrigin": true,
				"secure": false,
				bypass: function(req, res, proxyOptions) {
					let extra = false;
					for (let index in extraActions) {
						if (req.url.indexOf(extraActions[index]) >= 0) {
							extra = true;
						}
					}
					if (extra) {
						res.charset = 'utf8';
						var buf = '';
						req.on("data", function(thunk) {
								buf += thunk;
							})
							.on("end", function() {
								var http = require('http');
								var testHost = extraProxyHost;
								var options = {
									hostname: testHost,
									port: 80,
									path: req.originalUrl,
									method: req.method,
									headers: Object.assign({}, req.headers, {
										'host': testHost,
										'origin': testHost,
										'referer': testHost,
										'Cookie': ""
									})
								};

								var _req = http.request(options, function(_res) {
									var body = "";
									_res.on("data", function(chunk) {
											body += chunk;
										})
										.on("end", function() {
											res.end(body);
										})
								}).on("error", function() {
									res.end();
								});
								console.log(buf);
								_req.write(buf);
								_req.end();
							});
					}
				}
			},
			"/json": {
				"target": proxyUrl,
				"changeOrigin": true,
				"secure": false
			},
			"/pc": {
				"target": proxyUrl,
				"changeOrigin": true,
				"secure": false
			},
			"/ad": {
				"target": proxyUrl,
				"changeOrigin": true,
				"secure": false
			},
			"/logo.png": {
				"target": proxyUrl,
				"changeOrigin": true,
				"secure": false
			}
		}
	}
}
