const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/readme.md', '**/default.sgr', '**/layouts/*', '**/_*', '**/.*'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx) }
    })
  },
  postcss: (ctx) => {
    return cssStandards({ webpack: ctx })
  },
  babel: { presets: [jsStandards] },
  server: { open: false }
}
