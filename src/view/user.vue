<script setup>
import { Model } from 'echarts'
import {ref,onMounted,getCurrentInstance,reactive} from 'vue'
const {proxy} = getCurrentInstance()
const tableData = ref([])
async function getUserData(){
  let data = await proxy.$api.getUserData(sereach_name)
  console.log(data)
  tableData.value = data.list.map(item =>({
    ...item,
    sexLabel : item.sex === 1 ? '男' : '女'
  }))
  sereach_name.total = data.count
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
//搜索功能
const sereach = reactive({
  keyWord:''
})
const sereach_name = reactive({
  name:'',
  total:0,
  page:1
})
function findname(){
  sereach_name.name = sereach.keyWord
  getUserData(sereach_name.name)
}
//分页功能
function handleChange(page){
  sereach_name.page = page
  console.log(page)
  getUserData()
}

onMounted(()=>{
  getUserData()
})


</script>
<template>
  <div class="user-header">
    <el-button type="primary">+新增</el-button>
    <el-form :inline="true" :model="sereach">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="sereach.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findname">搜索</el-button>
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
    <el-pagination
        background
        layout="prev, pager, next" 
        size="small"
        :total="sereach_name.total"
        @current-change="handleChange"
         />
  </div>
</template>
<style scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
}
</style>