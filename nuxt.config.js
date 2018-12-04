const { sourceFileArray } = require('./content/summary.json');
// const sourceFileNameToUrl = require('/');

const generateDynamicRoutes = callback => {
  const routes = sourceFileArray.map(sourceFileName => {
    return sourceFileNameToUrl(sourceFileName);
  });
  callback(null, routes);
};

function sourceFileNameToUrl(filepath) {
  const deleteExt = filepath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  const splitArray = fileName.split('-')
  return `/posts/${splitArray.slice(0, 3).join('-')}/${splitArray.slice(3,).join('-')}`
};

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: generateDynamicRoutes,
  },
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.suzu6.net',
    generate: true,
    exclude: ['/404'],
    routes: generateDynamicRoutes,
  },
}

