require('dotenv').config({ silent: true })

const Records = require('spike-records')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const pageId = require('spike-page-id')
const SpikeDatoCMS = require('spike-datocms')
//const placehold = require('postcss-placehold')
const env = process.env.NODE_ENV
const locals = {}

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  reshape: htmlStandards({
    parser: sugarml,
    root: './views',
    locals: (ctx) => Object.assign(locals, {pageId: pageId(ctx)}),
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  plugins: 
    [
      new SpikeDatoCMS({
        addDataTo: locals,
        token: process.env.DATO_CMS_TOKEN,
        models: [
          {
            name: 'team',
            json: 'team.json'
          } 
        ]
      }),  
      new Records({
      addDataTo: locals,
      posts: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=ff9a716e1b77a8b1f0cf83df5eea3ab94b1051a6ad0ac65309a39e3f506decf9&content_type=2wKn6yEnZewu2SCCkus4as' },
      heros: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=ff9a716e1b77a8b1f0cf83df5eea3ab94b1051a6ad0ac65309a39e3f506decf9&content_type=hero&order=sys.createdAt' },
      testimonials: { url: 'https://cdn.contentful.com/spaces/5b0pqhu33f9d/entries?access_token=ff9a716e1b77a8b1f0cf83df5eea3ab94b1051a6ad0ac65309a39e3f506decf9&content_type=testimonial&order=sys.createdAt' }
  })],
  babel: jsStandards(),
  server: { open: false }
}
