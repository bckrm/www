const Records = require('spike-records')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')
const locals = {}

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/readme.md', '**/layouts/*', '**/includes/*', '**/_*', '**/.*'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: Object.assign({ pageId: pageId(ctx) }, locals)
    })
  },
  plugins: [new Records({
    addDataTo: locals,
    posts: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=3ca35275e1d8a3a642c38143b59341bc727defc76e5e7893fd6f948b569ecabe&content_type=2wKn6yEnZewu2SCCkus4as' }
  })],
  postcss: (ctx) => {
    return cssStandards({ webpack: ctx })
  },
  babel: { presets: [jsStandards] },
  server: { open: false }
}
