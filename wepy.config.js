const path = require('path');
var prod = process.env.NODE_ENV === 'production';
const DefinePlugin = require('@wepy/plugin-define');
const PluginUglifyjs = require('@wepy/plugin-uglifyjs');

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  cliLogs: !prod,
  static: ['./src/assets'],
  build: {
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: [
    DefinePlugin({
      API_URL: prod ? JSON.stringify('http://larabbs-api.test/api/v1/')
          : JSON.stringify('http://larabbs-api.test/api/v1/'),
    }),
    PluginUglifyjs({

    })
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

