module.exports = {
  title: 'Three.js 简易教程',
  description: '基础概念、简单动画、简易交互',
  host: '0.0.0.0',
  port: '9001',
  base: '/document-ThreeJs/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      {text: '基础', link: '/basic/'},
      {text: '进阶', link: '/advanced/'},
      {text: '骚操作', link: '/SAOoperation/'}
    ],
    sidebarDepth: 2,
    sidebar: {
      '/basic/': [
        '',
        'config.md'
      ],
      '/advanced/': [
        '',
        'effect.md',
        'keng.md'
      ],
      '/SAOoperation/': [
        ''
      ]
    }
  }
}