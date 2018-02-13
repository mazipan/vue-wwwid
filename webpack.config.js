var path = require('path')
var webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const DIST = path.resolve(__dirname, "build");
const SRC = path.resolve(__dirname, "src");
const ASSETS = path.resolve(__dirname, "src/assets");
const PAGES = path.resolve(__dirname, "src/pages");
const COMPONENTS = path.resolve(__dirname, "src/components");

const ENV = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV !== 'production';

module.exports = {
	context: SRC,
  entry: './main.js',
  output: {
		path: DIST,
		publicPath: '/vue-wwwid/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'css': 'vue-style-loader!css-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
			{
				test: /\.(scss|sass|css)$/,
				exclude: [
					COMPONENTS, PAGES
				],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: { sourceMap: CSS_MAPS, importLoaders: 1, minimize: true }
						},
						// {
						// 	loader: `postcss-loader`,
						// 	options: {
						// 		sourceMap: CSS_MAPS,
						// 		plugins: () => {
						// 			autoprefixer({ browsers: ['last 2 versions'] });
						// 		}
						// 	}
						// },
					]
				})
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV === 'production' ? 'file-loader' : 'url-loader'
			}
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': SRC,
			pages: PAGES,
      components: COMPONENTS,
      assets: ASSETS
    }
  },
  plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true,
			disable: ENV !== 'production'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: './index.ejs',
			minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        trimCustomFragments: true
      }
    })
	]).concat(ENV === 'production' ? [
    new CopyWebpackPlugin([
			{ from: './manifest.json', to: './' }
    ]),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new workboxPlugin({
      globDirectory: DIST,
      globPatterns: ['**/*.{html,js,css,json,gif,png}'],
      swDest: path.join(DIST, 'sw.js'),
      swSrc: path.join(SRC, 'sw.js')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				unsafe_comps: true,
				properties: true,
				keep_fargs: false,
				pure_getters: true,
				collapse_vars: true,
				unsafe: true,
				warnings: false,
				screw_ie8: true,
				sequences: true,
				dead_code: true,
				drop_debugger: true,
				comparisons: true,
				conditionals: true,
				evaluate: true,
				booleans: true,
				loops: true,
				unused: true,
				hoist_funs: true,
				if_return: true,
				join_vars: true,
				cascade: true,
				drop_console: true
			}
    })
  ] : []),

  devServer: {
		port: process.env.PORT || 8089,
		host: 'localhost',
		publicPath: '/vue-wwwid/',
		contentBase: './src',
		historyApiFallback: true,
		open: true,
		openPage: 'vue-wwwid/',
		proxy: {
			'/vue-wwwid': {
				target: "http://localhost:8089",
				bypass: (req) => {
					let view = req.url.replace('/vue-wwwid', '');
					return view;
				}
			}
		}
  },

  performance: {
    hints: false
  },

	devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

