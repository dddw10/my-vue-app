<script setup>
import { ref,getCurrentInstance,onMounted,reactive } from "vue";
import * as echarts from 'echarts'
const {proxy} = getCurrentInstance()
//请求数据，使用mockjs拦截器
//获取照片的url地址
function getImageUrl(user){
  return new URL(`../assets/images/${user}.png`,import.meta.url).href
}
//左下角的数据
const tableData = ref([])
async function getTableData() {
  const data = await proxy.$api.getTableData()
  tableData.value = data.tableData
}
//右上角的count的数据
const CountData = ref([])
async function getCountData() {
  const data = await proxy.$api.getCountData()
  CountData.value = data.CountData
}
const tableLabel = ref({
  name:'课程',
  todayBuy:'今日购买',
  monthBuy:'本月购买',
  totalBuy:'总购买'
})
//chart表格数据
const chartData = ref([])
async function getChartData() {
  const {orderData} = await proxy.$api.getChartData()
  //对于第一个图标进行x轴 和 series 的赋值
  xOptions.xAxis.data = orderData.date
  xOptions.series = Object.keys(orderData.data[0]).map(val=>({
    name:val,
    data:orderData.data.map(item => item[val]),
    type:'line'
  }))
  const oneEchart = echarts.init(proxy.$refs['echart'])
  oneEchart.setOption(xOptions)
}
//折线图和柱状图的公共配置
const xOptions = reactive({
  //图例文字颜色
  textStyle:{
    color:'#333'
  },
  legend:{},
  grid:{
    left:'20%'
  },
  //提示框
  tooltip:{
    trigger:'axis'
  },
  xAxis:{
    type:'category',//类目轴
    data:[],
    axisLine:{
      lineStyle:{
        color:'#17b3a3'
      }
    },
    axisLabel:{
      interval:0,
      color:'#333'
    }
  },
  yAxis:[
    {
      type:'value',
      axisLine:{
        lineStyle:{
          color:"#17B3a3"
        }
      }
    }
  ],
  color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
  series:[],
})
//饼状图的公共配置
const pieOptions = reactive({
  tooltip:{
    trigger:"item",
  },
  legend:{},
  color:[
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf"
  ],
  series:[]
})
onMounted(()=>{
  getTableData()
  getCountData()
  getChartData()
})
</script>
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" >
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user">
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2025-5-27</span></p>
          <p>上次登录地点：<span>东莞</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="table">
        <el-table :data="tableData" class="el-table">
          <el-table-column class="el-table-column"
            v-for="(item,index) in tableLabel"
            :key="index"
            :prop="index"
            :label="item"
          >
          </el-table-column>
      </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="count">
        <el-card 
          shadow="hover"
          :body-style="{display:'flex',padding:0}"
          v-for="(item) in CountData"
          :key="item.name"
          class="card"
          >
            <component :is="item.icon" class="icon" :style="{background:item.color}" ></component>
            <div class="right-text">
              <p class="price">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart">
        <div ref="echart" style="height: 280px;"></div>
      </el-card>
    </el-col>
  </el-row> 
</template>
<style scoped lang="less">
.home{
  height: 100%;
  overflow: hidden;
  .user{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info{
      p{
        line-height: 40px;
      }
      .user-info-p{
        color: #999;
      }
      .user-info-admin{
        font-size: 35px;
      }
    }
  }
  .login-info{
    line-height: 30px;
    font-size: 14px;
    color: #999;
    span{
      color: #666;
      margin-left: 60px;
    }
  }
  .table{
    margin-top: 20px;
    flex: 1;
  }
  .el-table{
    text-align: center;
    .el-table-column{
      text-align: center;
    }
  }
  .count{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card{
      width: 32%;
      margin-bottom: 20px;
      .icon{
        color: #fff;
        width: 80px;
        height: 80px;
        font-size: 300px;
        text-align: center;
      }
      .right-text{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .price{
          font-size: 30px;
          line-height: 50px;
        }
        .txt{
          font-size: 12px;
          color: #999;
        }
      }
    }
    
  }
}
</style>