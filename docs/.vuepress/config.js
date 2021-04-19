module.exports = {
  title: 'Blue Sky Coming', // 文档博客标题
  description: 'feature will be right', // 文档博客描述
  markdown: {
    lineNumbers: true
  },
  theme: 'reco',
  themeConfig: {
    startYear: '2017',
    logo: '/img/logo.png',
    authorAvatar: '/img/logo.png',
    subSidebar: 'auto',
    author: 'henry',
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
    ],
    type: 'blog',
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Categories' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tags' // 默认 “标签”
      },
      socialLinks: [
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'fa-camera', link: 'https://www.npmjs.com/~reco_luan' }
      ]
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': 'assets'
      }
    }
  }
}