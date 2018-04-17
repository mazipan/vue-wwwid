var path = require('path')
var webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');

const {InjectManifest} = require('workbox-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DIST = path.resolve(__dirname, "build");
const SRC = path.resolve(__dirname, "src");
const ASSETS = path.resolve(__dirname, "src/assets");
const PAGES = path.resolve(__dirname, "src/pages");
const COMPONENTS = path.resolve(__dirname, "src/components");

const ENV = process.env.NODE_ENV || 'production';
const CSS_MAPS = ENV !== 'production';

module.exports = {
	context: SRC,
  entry: {
    main: './main.js'
  },
  output: {
		path: DIST,
		publicPath: '/vue-wwwid/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            }),
            sass: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader?indentedSyntax',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
        }
      },
			{
				test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
				use: ENV === 'production' ? 'file-loader' : 'url-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
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
  },
  plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash].css',
			allChunks: true,
			disable: ENV !== 'production'
		}),
		new HtmlWebpackPlugin({
      template: './index.ejs',
      // excludeChunks: ['runtime'],
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
    // copy file to dist
    new CopyWebpackPlugin([
			{ from: '../.travis.yml', to: './' },
			{ from: '../package.json', to: './' },
			{ from: './manifest.json', to: './' },
			{ from: './assets', to: './assets' }
    ]),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',

      // minChunks: Infinity means that no app modules
      // will be included into this chunk
      minChunks: Infinity,
    }),
    new InlineChunkWebpackPlugin({
      inlineChunks: ['runtime']
    }),
    new ManifestPlugin({
      fileName: 'hash.json'
    }),
		new UglifyJSPlugin({
      test: /\.js($|\?)/i,
			uglifyOptions: {
        compress: {
          drop_console: true
        },
        output: {
          comments: false,
          beautify: false
        },
        warnings: false,
        extractComments: true
      },
      parallel: true,
      sourceMap: false
    }),
    new InjectManifest({
      swDest: path.join(DIST, 'sw.js'),
      swSrc: path.join(SRC, 'sw.js')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      test: new RegExp(/\.(js|css|html)$/),
      algorithm: 'gzip',
      // threshold: 10240,
      // minRatio: 0.8,
      cache: true
    }),
    // UNCOMMENT FOR BUNDLE ANALYZE
    // new BundleAnalyzerPlugin()
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
  }
}

