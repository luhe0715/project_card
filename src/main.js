import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

/**全局样式 */
import '@/assets/style/base.less'
import '@/assets/style/popcss.css'

/**引入UI框架 */
import * as ElIcons from '@element-plus/icons-vue' // element icon
import element, { ElMessage, ElMessageBox } from 'element-plus' //引入message组件
import 'element-plus/dist/index.css'

/**引入入口文件 */
import '@/permission'

/**引入常用的依赖 */
import Cookies from 'js-cookie'
import moment from 'moment' // 时间转义

/**引入接口文件 */
import api from '@/api'

/**引入pinia */
import { createPinia } from 'pinia' // 替代vuex
import piniaPluginPersist from 'pinia-plugin-persist' //pinia持久化插件---解决刷新store数据丢失问题
const pinia = createPinia()
pinia.use(piniaPluginPersist) //pinia持久化

/**引入echarts */
import * as echarts from 'echarts'

/**全局注册方法 */
window.$api = api // 全局api
window.$message = ElMessage // 全局$message。调用：window.$message('消息');
window.$ElMessageBox = ElMessageBox // 全局$ElMessageBox。调用：window.$ElMessageBox('消息');
window.$moment = moment
window.$Cookies = Cookies
window.$echarts = echarts

/**创建vue */
const app = createApp(App)

//全局注册所有icon组件
for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component)
}

app.use(router)
app.use(element)
app.use(pinia)
app.mount('#app')
