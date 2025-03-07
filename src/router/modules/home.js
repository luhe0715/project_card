const homeRoute = [
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/homePage/index.vue'),
    meta: {
      menuId: '1',
      title: '首页',
      icon: 'icon_xitongguanli',
      isShowMenu: true,
      breadcrumb: [{ title: '首页', name: 'homePage' }],
      KeepAlive: true,
    },
  },
  {
    path: '/Children',
    name: 'Children',
    component: () => import('@/views/homePage/children.vue'),
    meta: {
      menuId: '1',
      title: '子页面',
      icon: 'icon_xitongguanli',
      isShowMenu: false,
      breadcrumb: [
        { title: '首页', name: 'homePage' },
        { title: '子页面', name: 'Children' },
      ],
    },
  },
]
export default homeRoute
