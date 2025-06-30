import { createRouter,createWebHashHistory } from "vue-router";
import Main from "@/view/main.vue"
import Home from "@/view/home.vue"
import User from "@/view/user.vue"
const router = createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/',
      name:'main',
      component:Main,
      redirect:'/home',
      children:[
        {
          path:'home',
          name:'home',
          component:Home
        },
        {
          path:'user',
          name:'user',
          component:User
        },
      ]
    },
  ]
})
export default router