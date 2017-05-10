const Records = require('spike-records')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-env')
const dynamicImport = require('babel-plugin-syntax-dynamic-import')
// still need to run any updates from the migration guide
// added babel and dynamic import dependencies
const pageId = require('spike-page-id')
const placehold = require('postcss-placehold')
const locals = {}

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/readme.md', '**/layouts/*', '**/includes/*', '**/_*', '**/.*'],
  reshape: htmlStandards({
    locals: (ctx) => Object.assign(locals, {pageId: pageId(ctx)})
  }),
  postcss: cssStandards(),
  plugins: [new Records({
    addDataTo: locals,
    posts: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=ff9a716e1b77a8b1f0cf83df5eea3ab94b1051a6ad0ac65309a39e3f506decf9&content_type=2wKn6yEnZewu2SCCkus4as' },
    heros: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=ff9a716e1b77a8b1f0cf83df5eea3ab94b1051a6ad0ac65309a39e3f506decf9&content_type=hero&order=sys.createdAt' },
    testimonials: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=ff9a716e1b77a8b1f0cf83df5eea3ab94b1051a6ad0ac65309a39e3f506decf9&content_type=testimonial&order=sys.createdAt' }
  })],
  babel: { presets: [[jsStandards, { modules: false }]], plugins: [dynamicImport] },
  server: { open: false }
}
