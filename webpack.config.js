module.exports = {
	entry: ["babel-polyfill",'./src/index.js'],
	module:{
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
  devServer: {
    contentBase: './dist',
    port: 3000
  }
}