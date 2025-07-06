import { defineStore } from "pinia";
import { ref,watch } from "vue";
import router from "../router";
export const useloginStore = defineStore('useloginStore',()=>{
    //数据
    const menuList = ref([])
    const token = ref()
    const routerlist = ref([])
    //方法
    function initState(){
        menuList.value = []; // 初始化 menuList 的值
        token.value = null; // 初始化 token 的值
        routerlist.value = []; // 初始化 routerlist 的值
    }
    watch([token, menuList, routerlist], ([newToken, newMenuList, newRouterList]) => {
        if (!newToken) return;

        // 提取响应式对象的值
        const state = {
            token: newToken,
            menuList: newMenuList,
            routerlist: newRouterList
        };

        // 序列化为 JSON 字符串
        localStorage.setItem("appState", JSON.stringify(state));
        }, {
        deep: true
    });
    function getMenuList(val){
        menuList.value = val
    }
    function addMenu(router,type){
        if(type === 'refresh'){
            const Value = localStorage.getItem("appState")
            if(Value){
                const state =JSON.parse(Value)
                menuList.value = state.menuList || [];
                token.value = state.token
                //不能解析
                routerlist.value = []
            }else{
                return
            }
        }
        const menu = menuList.value
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
    //退出登录
    function loginOut(){
        routerlist.value.forEach((item)=>{
            if(item){
                item()
            }
            initState()
            localStorage.removeItem("menuList")
        })
    }
    return{menuList,token,getMenuList,addMenu,loginOut}
})