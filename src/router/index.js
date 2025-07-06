import { createRouter,createWebHashHistory } from "vue-router";
import Main from "@/view/main.vue"
import Home from "@/view/home.vue"
import User from "@/view/user.vue"
import Mall from "@/view/mall.vue";
import Login from "@/view/login.vue";
const router = createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/',
      name:'main',
      component:Main,
      redirect:'/login',
      children:[]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/404',
      name:'404',
      component:()=>import("@/view/404.vue")
    }
  ]
})
export default router