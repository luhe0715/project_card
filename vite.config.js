// eslint-disable-next-line import/namespace
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'// 这里我们用的是element，如果是ant用此
import AutoImport from 'unplugin-auto-import/vite'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { fileURLToPath, URL } from 'node:url' // 文件配置别名，src下面的东西用@引入
import VueSetupExtend from 'vite-plugin-vue-setup-extend' // 方便定义组件名称，在script里面定义name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    Components({
      dirs: ['src/components'], // 在这个文件下面的组件文件不用import引入
      dts: true,
      resolvers: [ElementPlusResolver()], //使用element plus
    }),
    AutoImport({
      // 适用的文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router'],
      // 可以选择auto-import.d.js生成的位置，使用ts建议设置为'/src/auto-import.d.js'不然会自动生成在根目录
      dts: 'src/auto-import.d.js',
      // 生成全局声明文件，给eslint用
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // 避免自动引入vue3 api后页面报未定义的错误
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  resolve: {
    alias: {
      // '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局变量
        // additionalData: '@import "./src/assets/style/global-variables.scss";',
        // element-plus升级到v2需要改成以下写法
        additionalData: `@use "./src/assets/style/sass/variables.scss" as *;`,
      },
    },
  },
  base: './', // 设置打包路径
  server: {
    host: '0.0.0.0',
    port: 8080, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'xxxxxxxx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  // 构建
  build: {
    outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
    },
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
  },
})
