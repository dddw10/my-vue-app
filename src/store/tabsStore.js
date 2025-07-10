import { defineStore } from "pinia";
import { useRouter,useRoute } from "vue-router";
import { ref } from "vue";
export const usetabsStore = defineStore('usetabsStore',()=>{
    //数据
    const router = useRouter()
    const route = useRoute()
    const currentMenu = ref()
    const tabs = ref([
        {
            path:'/home',
            name:'home',
            label:'首页'
        }
    ],
      

    )
    //方法
    function selectMenu(val){
        if(val.name === 'home'){
            currentMenu.value = null
        }else{
            currentMenu.value = val
            let index = tabs.value.findIndex(item=>item.name === val.name)
            index === -1 ? tabs.value.push(val) : ""
        }
    }
    
    function closeTag(val,index){
        tabs.value.splice(tabs.value.indexOf(val),1)
        
        if(val.name !== route.name){
            return
        }
        if(index === tabs.value.length){
            router.push(tabs.value[index-1].path)
        }else{
            router.push(tabs.value[index].path)
        }
    }
    return {tabs,currentMenu,selectMenu,closeTag}
})