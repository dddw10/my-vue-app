<script setup>
import { ref,computed } from "vue";
//登录的条件选择
import { useloginStore } from "../store/loginStore.js";
const loginStore = useloginStore()
const list = computed(()=>loginStore.menuList)
const token = computed(()=>loginStore.token)
//loginStore.token 能实现,computed要.value
// console.log(token.value)
// console.log(list)

//遍历
const noChildren = computed(()=>list.value.filter(item=>!item.children))
const hasChildren = computed(()=>list.value.filter(item=>item.children))
//引入iscollapse，pinia
import { useCollapseStore } from "../store/CollapseStore.js";
import { storeToRefs } from "pinia";
import { useRouter,useRoute } from "vue-router";
const CollapseStore = useCollapseStore();
const { isCollapse } = storeToRefs(CollapseStore);
//引入tabsStore
import { usetabsStore } from "../store/tabsStore.js";
const tabsStore = usetabsStore()
//使用路由跳转
const route = useRoute()
const router = useRouter()
function routeMune(val){
  router.push(val.path)
  tabsStore.selectMenu(val)
}
//刷新也能选中
const activeMenu = computed(()=>route.path)

</script>

<template>
<el-aside
  :width="!isCollapse? '180px' : '68px'"
>
  <el-menu
    class="el-menu-vertical-demo"
    text-color="#fff"
    :collapse="isCollapse"    
    :collapse-transition="false"
    :default-active="activeMenu"
  >
    <h3 v-show="!isCollapse">通用后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <el-menu-item 
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      @click="routeMune(item)"
    >
      <component class="icons" :is="item.icon"></component>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <el-sub-menu
      v-for="item in hasChildren"
      :index="item.path"
      :key="item.path"
    >
      <template #title>
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group class="el-menu-item-group">
        <el-menu-item
          v-for="(subItem,subIndex) in item.children"
          :index="subItem.path"
          :key="subItem.path"
          @click="routeMune(subItem)"
        >
          <component class="icons" :is="subItem.icon"></component>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</el-aside>

</template>

<style scoped lang="less">
el-aside{
  width: 180px;
  height: 100%;
}
.el-menu-vertical-demo{ 
  background-color:#545c64;
  border-right: none;
  h3{
    color:#fff;
    text-align:center;
    line-height:56px
  }
}
.el-aside{
  height: 100%;
  background-color:#545c64;
}
.el-menu-item-group{
  background-color:#545c64;
}
.icons{
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
</style>
