<script setup>
import { computed } from "vue";
import { useRoute,useRouter } from "vue-router";
import { usetabsStore } from "@/store/tabsStore";
const tabsStore = usetabsStore()
const tabs = computed(()=>tabsStore.tabs)
const route = useRoute()
const router = useRouter()
const handleMenu = (val)=>{
    router.push(val.path)
    tabsStore.selectMenu(val)
}   
</script>
<template>
    <div class="tab">
        <el-tag
            v-for="(item,index) in tabs"
            :key="item.name"
            :closable = "item.name === 'home' ? false : true"
            :effect = "route.name === item.name ? 'dark' : 'light'"
            @click="handleMenu(item)"
            @close="tabsStore.closeTag(item,index)"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>
<style lang="less">
.tab{
    margin: 20px 0 0 20px;
}
.el-tag{
    margin-right: 10px;
}
</style>