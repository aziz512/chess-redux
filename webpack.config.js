module.exports = {
	entry: './src/app.js',
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				
				query: {
					presets: ['es2015']
				}
			}
		]
	}
}
