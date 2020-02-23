import slash from 'slash2'
import px2rem from 'postcss-plugin-px2rem'
import defaultSettings from './defaultSettings' // https://umijs.org/config/

import themeVars from './theme'
import webpackPlugin from './plugin.config'

const { pwa, primaryColor } = defaultSettings // 用于表示是否开启 yapi 调试的环境变量，on 表示开启

const { YAPI = 'none', BASE_URL = '' } = process.env
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]
export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/umijs/umi-blocks',
  },
  hash: false,
  targets: {
    ie: 11,
  },
  devtool: false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/CenterLayout',
      routes: [
        {
          path: '/',
          component: './Home',
        },
        {
          path: '/test',
          component: './Test',
        }
      ]
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    YAPI,
    BASE_URL,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
    globalVars: themeVars,
  },
  extraPostCSSPlugins: [
    // https://www.npmjs.com/package/postcss-plugin-px2rem
    // px2rem({
    //   rootValue: 10,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
    //   // propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius','font-size'],//这些属性不需要转换
    //   // selectorBlackList:['t_npx']//以包含t_npx的class不需要转换
    // })
  ],
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName
      }

      const match = context.resourcePath.match(/src(.*)/)

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '')
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase())
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
      }

      return localName
    },
  },
  manifest: {
    basePath: './',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/yapi': {
      target: 'http://yapi.xi.cn/mock/53',
      changeOrigin: true,
      pathRewrite: {
        '^/yapi': '',
      },
    },
  },
}
