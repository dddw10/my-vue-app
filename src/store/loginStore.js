import { defineStore } from "pinia";
import { ref,watch } from "vue";
import router from "../router";
export const useloginStore = defineStore('useloginStore',()=>{
    //数据
    const menuList = ref([])
    const token = ref()
    const routerlist = ref([])
    //方法
    watch([token,menuList,router],([newtoken,newmenuList,newrouter])=>{
        if(!newtoken)return
        localStorage.setItem("menuList",JSON.stringify(newmenuList))
    },
    {
        deep:true
    })
    function getMenuList(val){
        menuList.value = val
    }
    function addMenu(router,type){
        if(type === 'refresh'){
            const menuValue = localStorage.getItem("menuList")
            if(menuValue){
                 menuList.value = JSON.parse(menuValue)
                //不能解析
                routerlist.value = []
            }else{
                return
            }
        }
        const menu = menuList.value
        console.log('11,',menuList.value)
        const module = import.meta.glob('../view/**/*.vue')
        const routeArr = []
        menu.forEach((item)=>{
            if(item.children){
                item.children.forEach((val)=>{
                    let url = `../view/${val.url}.vue`
                    val.component = module[url]
                    routeArr.push(...item.children)
                })
            }else{
                let url = `../view/${item.url}.vue`
                item.component = module[url]
                routeArr.push(item)
            }
        })
        let routers = router.getRoutes()
        routers.forEach(item => {
            if(item.name == 'mall' || item.name == 'page1' || item.name == 'page2'){
                router.removeRoute(item.name)
            }else{
                return
            }
        });
        routeArr.forEach(item=>{
            routerlist.value.push(router.addRoute("main",item))
        })
    }
    return{menuList,token,getMenuList,addMenu}
})