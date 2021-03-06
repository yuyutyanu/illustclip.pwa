const axios = require('axios')
const config = require('config');

module.exports = {
  env:config.get('firebaseConfig'),
  /*
  ** Build configuration
  */
  build: {

  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    title: 'illust.nuxt',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/index.css' }
    ]
  },
  css: [
    '@/assets/scss/index.scss'
  ],
  generate: {
    async routes () {
      const { data } = await axios.get('https://www.illust-clip.design/api.json')
      const rtn = []
      for (let key in data) {
        data.hasOwnProperty(key)
        rtn.push('/' + key)
        for (let subkey in data[key].imgset) {
          rtn.push('/' + key + '/' + subkey)
        }
      }
      return rtn
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070',
    name: 'appName',
    short_name: 'shortName',
    title: 'appTitle',
    'og:title': 'ogTitle',
    description: 'appDescription',
    'og:description': 'ogDescription',
    lang: 'ja',
    background_color: '#ffffff'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],
  plugins: [
    { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/fcm.js', ssr: false }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.illust-clip.design/',
    cacheTime: 1000 * 60 * 15,
    generate: false, // Enable me when using nuxt generate
    async routes () {
      const rtn = []
      const {data} = await axios.get('https://www.illust-clip.design/api.json')
      for (let key in data) {
        rtn.push('/' + key)
        for (let subkey in data[key].imgset) {
          rtn.push('/' + key + '/' + subkey)
        }
      }
      return rtn
    }
  }
}
