import { defineStore } from "pinia";
import { ref } from "vue";
export const useCollapseStore = defineStore('Collapse',()=>{
//   //数据
  const isCollapse = ref(false)
//   //方法
  return{isCollapse}
})