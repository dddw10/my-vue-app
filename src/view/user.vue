<script setup>
import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
const {proxy} = getCurrentInstance()
const tableData = ref([])
async function getUserData(){
  let data = await proxy.$api.getUserData()
  console.log(data)
  tableData.value = data.list.map(item =>({
    ...item,
    sexLabel : item.sex === 1 ? '男' : '女'
  }))
}
const tableLabel = reactive([
  {
    prop:'name',
    label:'姓名'
  },
  {
    prop:'age',
    label:'年龄'
  },
  {
    prop:'sexLabel',
    label:'性别'
  },
  {
    prop:'birth',
    label:'出生日期',
    width:200
  },
  {
    prop:'addr',
    label:'地址',
    width:400
  },
])
const handleClick = () => {
  console.log('click')
}


onMounted(()=>{
  getUserData()
})


</script>
<template>
  <div class="user-header">
    <el-button type="primary">+新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column 
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default>
          <el-button  type="primary" size="small" @click="handleClick">编辑</el-button>
          <el-button  type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
</template>
<style scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
}
</style>