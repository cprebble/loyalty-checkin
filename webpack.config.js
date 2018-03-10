const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = [
	{
		node: {
			fs: "empty",
			net: "empty",
			dns: "empty",
			module: "empty",
			tls: "empty"
		},
		context: path.resolve(__dirname),
		devtool: "source-map",
		entry: {
			index: [
				"./src/index.jsx",
				"./server.js"
			]
		},
		resolve: {
			extensions: [ ".js", ".jsx" ]
		},
		output: {
			path: path.resolve(__dirname, "./public"),
			filename: "[name].js"
		},
		module: {
			loaders: [
				{
					exclude: /node_modules/,
					loader: "babel-loader",
					test: /\.(js|jsx)$/
				}
			]
		},
		plugins: [
			new HtmlPlugin({
				title: "Loyalty Checkin Exercise",
				template: "./src/index.html"
			})
		]
	}
];