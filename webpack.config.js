const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ["babel-polyfill",'./src/index.js'],
	output: {
    publicPath: '/'
  },
	module:{
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
			},
			{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename:"[id].css"
		}),
		new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
	],
  devServer: {
    contentBase: './dist',
		port: 3000,
		historyApiFallback: true
  }
}