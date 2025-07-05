<script setup lang="ts">
import {ref,onMounted,getCurrentInstance,reactive,nextTick, ComponentInternalInstance} from 'vue'
import { ElMessageBox,ElMessage,FormInstance, FormRules } from "element-plus";
import moment from 'moment'
const {proxy} = getCurrentInstance()
const tableData = ref([])
async function getUserData(name: string = ""){
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
//区别编辑还是新增功能
const action = ref('add')
//编辑功能
const handleClick = (val) => {
  action.value = 'edit'
  dialogFormVisible.value = true
  nextTick(()=>{
    Object.assign(ruleForm,{...val,region:''+val.sex,address:val.addr,date:val.birth})
  })
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
//删除功能
function handelDel(val){
  ElMessageBox.confirm("确认要删除该用户吗？").then(async ()=>{
    await proxy.$api.deleteUserList({id:val.id})
    ElMessage({
      showClose:true,
      message:'删除成功',
      type:'success'
    })
    getUserData()
  })
}
//增加功能
// const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
// const formLabelWidth = '140px'
interface RuleForm {
  name: string
  age:string
  region: string
  date: string
  address:string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  age:'',
  region: '',
  date: '',
  address:''
})

//表单校验规则
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度为2-5之间', trigger: 'blur' },
  ],
  age:[
    {required: true,message: '请输入年龄', trigger: 'blur'},
    { type: 'number', message: '请输入数字', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: '请选择你的性别',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: '请选择你的出生日期',
      trigger: 'change',
    },
  ],
  address: [
    {required: true,message: '请输入地址', trigger: 'blur'},
    { min: 10, max: 30, message: '请写到县', trigger: 'blur' },
  ]
})
//对时间进行格式化
function timeFormat(time){
  const date = new Date(time)
  const timeFormatdate = moment(date).format('YYYY-MM-DD')
  return timeFormatdate
}
//增加提交功能
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate( async (valid, fields) => {
    if (valid) {
      let res = null
      ruleForm.date = timeFormat(ruleForm.date)
      console.log('submit!',ruleForm)
      if(action.value === 'add'){
        res = await proxy.$api.addUser(ruleForm)
      }else{
        res = await proxy.$api.editUser(ruleForm)
      }
      if(res){
        getUserData()
        dialogFormVisible.value = false
        const message = action.value === 'add' ? '添加成功' : '编辑成功' 
        ElMessage({
          showClose:true,
          message:message,
          type:'success'
        })
      }
    
    } else {
      ElMessage({
        showClose:true,
        message:'请输入正确内容',
        type:'error'
      })
      console.log('error submit!', fields)
    }
  })
}
//重置页面
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
//新增按钮
const adduser = (formEl: FormInstance | undefined)=>{
  action.value = 'add'
  dialogFormVisible.value = true
  if (!formEl) return
  formEl.resetFields()
}



onMounted(()=>{
  getUserData()
})


</script>
<template>
  <div class="user-header">
    <el-button type="primary" plain @click="adduser(ruleFormRef)">+新增</el-button>
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
        <template #="scope">
          <el-button  type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button  type="danger" size="small" @click="handelDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pager" 
        background
        layout="prev, pager, next" 
        size="small"
        :total="sereach_name.total"
        @current-change="handleChange"
         />
  </div>
  <el-dialog v-model="dialogFormVisible" :title="action === 'add' ? '增加用户' : '编辑用户' " width="500">
    <el-form
    ref="ruleFormRef"
    style="max-width: 500px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="addForm"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="性别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请输入性别">
            <el-option label="男" value='1' />
            <el-option label="女" value='0' />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出生日期" required prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            aria-label="请选择"
            placeholder="请选择"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="地址" prop="address">
      <el-input v-model="ruleForm.address" />
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button  type="primary" @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button  type="primary" @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
}
.table{
  height: 520px;
  position: relative;
  .pager{
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table{
    width: 100%;
    height: 500px;
  }
  .addForm{
    display: flex;
  }
}
</style>