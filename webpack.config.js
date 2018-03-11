const path = require("path");
const BUILD_DIR = path.resolve(__dirname, "./build");


module.exports = [
	{
		devtool: "source-map",
		entry: {
			"index": path.join(__dirname, "src/front/index.jsx")
		},
		output: {
			path: BUILD_DIR,
			filename: "index.js",
		},
		module: {
			rules: [
				{
					test: /\.(jsx|js)?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader",
							
						}
					]
				}
			]
		},
		resolve: {
			extensions: [".js", ".jsx"]
		}
	}
];