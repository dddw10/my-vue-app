import { createRouter,createMemoryHistory } from "vue-router";
import main from "@/view/main.vue"
import home from "@/view/home.vue";
const router = createRouter({
  history:createMemoryHistory(),
  routes:[
    {
      path:'/',
      name:'main',
      component:main,
      redirect:'/home',
      children:[
        {
          path:'home',
          name:'home',
          component:home
        }
      ]
    },

  ]
})
export default router