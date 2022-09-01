import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children:[
      {
        path:'/main',
        name:'文章列表',
        component: () => import( /**/'../components/ArticleList.vue')
      },
      {
        path:'/publicarticle',
        name:'发表文章',
        component: () => import( /**/'../components/PublicArticle.vue')
      },
      {
        path:'/crm',
        name:'用户管理',
        component: () => import( /**/'../components/CRM.vue')
      },
      {
        path:'/columnmanage',
        name:'栏目管理',
        component: () => import( /**/'../components/ColumnManage.vue')
      },
      {
        path:'/datastatistics',
        name:'数据统计',
        component: () => import( /**/'../components/DataStatistics.vue')
      },
    ]
  },
  {
    path:'/editarticleinfo',
    name:'编辑',
    component:()=>import( /**/ '../components/EditArticleInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router