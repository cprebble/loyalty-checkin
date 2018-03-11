const path = require("path");
const webpack = require("webpack");
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
			index: "./src/index.jsx",
			server: "./server.js"
		},
		resolve: {
			extensions: [ ".js", ".jsx" ],
			modules: ["node_modules"]
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
			new webpack.optimize.CommonsChunkPlugin("common"),
			new HtmlPlugin({
				title: "Loyalty Checkin Exercise",
				template: "./src/index.html"
			})
		]
	}
];