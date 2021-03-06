
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function(env, argv) {
	const devMode = env.development ? true : false;

	return {
		mode: devMode ? 'development' : 'production',
		resolve: {
			extensions: ['.js', '.jsx'],
			alias: {
				src: path.resolve(__dirname, 'src'),
				public: path.resolve(__dirname, 'public'),
				images: path.resolve(__dirname, 'public/images'),
				constants: path.resolve(__dirname, 'src/constants'),
				components: path.resolve(__dirname, 'src/components'),
				actionTypes: path.resolve(__dirname, 'src/store/actionTypes'),
				actions: path.resolve(__dirname, 'src/store/actions'),
				reducers: path.resolve(__dirname, 'src/store/reducers'),
			}
		},
		entry: {
			app: './index.jsx'
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build'),
		},
		devServer: {
			port: 3030,
			hot: true,
			open: true,
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
						}
					}]
				},
				{
					test: /\.s[ac]ss$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
						{
							loader: 'css-loader',
							options: { url: false, sourceMap: true } 
						},
						'sass-loader'
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					use: [{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './index.html',
			}),
			new MiniCssExtractPlugin({ 
				filename: '[name].css',
				chunkFilename: '[id].css'
			}),
			new CopyWebpackPlugin({
				patterns: [
					{from: 'public', to: 'public'}
				]
			})
		]
	}
}