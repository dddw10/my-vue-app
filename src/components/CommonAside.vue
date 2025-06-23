<script setup>
import { ref,computed } from "vue";
const list = ref([
  {
    path:'/home',
    name:'home',
    label:'首页',
    icon:'house',
    url:'Home'
  },
  {
    path:'/mall',
    name:'mall',
    label:'商品管理',
    icon:'video-play',
    url:'Mall'
  },
  {
    path:'/user',
    name:'user',
    label:'用户管理',
    icon:'user',
    url:'User'
  },
  {
    path:'/other',
    label:'其他',
    icon:'user',
    children:[
      {
        path:'/page1',
        name:'page1',
        label:'页面1',
        icon:'setting',
        url:'Page1'
      },
      {
        path:'/page2',
        name:'page2',
        label:'页面2',
        icon:'setting',
        url:'Page2'
      }
    ]
  },
])
//遍历
const noChildren = computed(()=>list.value.filter(item=>!item.children))
const hasChildren = computed(()=>list.value.filter(item=>item.children))
//引入iscollapse，pinia
import { useCollapseStore } from "../store/CollapseStore.js";
import { storeToRefs } from "pinia";
const CollapseStore = useCollapseStore();
const { isCollapse } = storeToRefs(CollapseStore);
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
  >
    <h3 v-show="!isCollapse">通用后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <el-menu-item 
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
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
