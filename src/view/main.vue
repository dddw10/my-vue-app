<script setup>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside/>
      <el-container>
        <el-header class="el-header">
          <common-header/>
        </el-header>
        <el-main class="right-main">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.common-layout,.lay-container{
  height: 100%;
}
.el-header{
  background-color: #333;
}

</style>
