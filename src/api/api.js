//管理api的地方
import { mock } from "mockjs";
import request from "./request";
//首页左下角的数据
export default {
  getTableData(){
    return request({
      url:'/home/getDataTable',
      method:'get',
      mock: false
    })
  },
  getCountData(){
    return request({
      url:'/home/getCountData',
      method:'get',
      mock: false
    })
  },
  getChartData(){
    return request({
      url:'/home/getChartData',
      method:'get',
      mock: false 
    })
  },
  getUserData(data){
    return request({
      url:'/user/getUserData',
      method:'get',
      mock: false,
      data
    })
  }
}