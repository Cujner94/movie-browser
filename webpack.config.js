const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ["babel-polyfill",'./src/index.js'],
	module:{
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename:"[id].css"
		})
	],
  devServer: {
    contentBase: './dist',
		port: 3000
  }
}