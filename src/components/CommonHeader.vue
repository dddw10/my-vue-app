<script setup>
function getimgUrl(user){
  return new URL(`../assets/images/${user}.png`,import.meta.url).href
}
//改变iscollage的值从而实现放大缩小
import { useCollapseStore } from "../store/CollapseStore";
import { storeToRefs } from "pinia";
const CollapseStore = useCollapseStore()
const{ isCollapse } = storeToRefs(CollapseStore)
function change_isCollapse(){
  isCollapse.value = !isCollapse.value
}
//退出登录
import { useloginStore } from "../store/loginStore";
import { useRouter } from "vue-router";
const router = useRouter()
const login = useloginStore()
function logOut(){
  login.loginOut()
  router.push('/login')
}
</script>
<template>
  <div class="content">
    <div class="left-content">
      <el-button @click="change_isCollapse">
        <component class="icons" is="Menu"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getimgUrl('user')" class="user">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logOut()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="less">
.content{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-content{
  display: flex;
  justify-content: center;
  align-items: center;
  .icons{
    width: 20px;
    height: 20px;
  }
  .bread{
    margin-left: 20px;
  }
}
.right-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
:deep(.bread span){
  color: #fff !important;
  //小鼠标
  cursor: pointer !important; 
}
</style>