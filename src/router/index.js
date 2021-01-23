import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '享家點',
      login: false
    }
  },
  {
    path: '/products/:filter',
    name: 'Products',
    component: () =>
      import(/* webpackChunkName: "products" */ '../views/Productlist.vue'),
    meta: {
      title: '享家點|商品區',
      login: false
    }
  },
  {
    path: '/productdetail/:productId',
    name: 'ProductDetail',
    component: () =>
      import(
        /* webpackChunkName: "productdetail" */ '../views/ProductDetail.vue'
      ),
    meta: {
      title: '享家點|商品介紹',
      login: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      title: '享家點|後台管理',
      login: true,
      right: true
    },
    children: [
      {
        path: '/',
        name: 'ControlProduct',
        component: () =>
          import(
            /* webpackChunkName: "controlPage" */ '../components/controlPage/product.vue'
          ),
        meta: {
          title: '享家點|商品管理',
          login: true,
          right: true
        },
      },
      {
        path: 'controlorder',
        name: 'ControlOrder',
        component: () =>
          import(
            /* webpackChunkName: "controlorder" */ '../components/controlPage/order.vue'
          ),
        meta: {
          title: '享家點|訂單管理',
          login: true,
          right: true
        },
      },
      {
        path: 'controlreply',
        name: 'OrderReply',
        component: () =>
          import(
            /* webpackChunkName: "controlreply" */ '../components/controlPage/reply.vue'
          ),
        meta: {
          title: '享家點|回覆管理',
          login: true,
          right: true
        }
      },
      {
        path: 'controlshare',
        name: 'ControlShare',
        component: () =>
          import(
            /* webpackChunkName: "controlshare" */ '../components/controlPage/share.vue'
          ),
        meta: {
          title: '享家點|分享管理',
          login: true,
          right: true
        }
      },
    ],
  },
  {
    path: '/custom',
    name: 'Custom',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "custom" */ '../views/Custom.vue'),
    meta: {
      title: '享家點|會員專區',
      login: true
    },
    children: [
      {
        path: '/',
        name: 'PersonDetail',
        component: () =>
          import(
            /* webpackChunkName: "persondetail" */ '../components/custompage/PersonDetail.vue'
          ),
        meta: {
          title: '享家點|會員資料',
          login: true
        },
      },
      {
        path: 'orderdetail',
        name: 'OrderDetail',
        component: () =>
          import(
            /* webpackChunkName: "orderdetail" */ '../components/custompage/OrderDetail.vue'
          ),
        meta: {
          title: '享家點|會員訂單',
          login: true
        }
      },
      {
        path: 'sharedetail',
        name: 'ShareDetail',
        component: () =>
          import(
            /* webpackChunkName: "sharedetail" */ '../components/custompage/ShareDetail.vue'
          ),
        meta: {
          title: '享家點|分享回饋',
          login: true
        }
      }
    ]
  },
  {
    path: '/checkorder',
    name: 'CheckOrder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "checkorder" */ '../views/CheckOrder.vue'),
    meta: {
      title: '享家點|結帳',
      login: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '享家點|登入',
      login: false
    }
  },
  {
    path: '/share',
    name: 'Share',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "share" */ '../views/Share.vue'),
    meta: {
      title: '享家點|分享',
      login: false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})
router.beforeEach((to, from, next) => {
  if (
    to.meta.login &&
    JSON.parse(localStorage.getItem('vuex')).user._id === ''
  ) {
    next('/login')
  } else {
    if (
      to.meta.right &&
      JSON.parse(localStorage.getItem('vuex')).user.right === false
    ) {
      next('/')
    } else {
      next()
    }
  }
})
router.afterEach((to, from) => {
  let title = ''
  title = to.meta.title
  document.title = title
})

export default router
