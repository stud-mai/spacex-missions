/* eslint-disable */
const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/dist/",
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [{
			test: /\.(ts|js)x?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		}]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/dist/",
		hotOnly: true
	}
};