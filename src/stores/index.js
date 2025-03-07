import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'
import { useMenuStore } from './modules/menu'
import { useNavTabStore } from './modules/navTab'
import { useBreadcrumbStore } from './modules/breadcrumb'

const pinia = createPinia()

export { useUserStore, useMenuStore, useNavTabStore, useBreadcrumbStore }
export default pinia
