// next.config.js
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
// const webpack = require('webpack')

module.exports = withCss(withSass({
  /* config options here */
}))
// module.exports = {
//     webpack: (config, { dev }) => {
//         config.plugins.push(
//             new webpack.ProvidePlugin({
//                 '$': 'jquery',
//                 'jQuery': 'jquery',
//             })
//         )
//         return config
//     }
// }
