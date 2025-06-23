//获取当前应用的环境模式
const env = import.meta.env.MODE || "prod"
const EnvConfig = {
  development:{
    baseApi:"/api",
    mockApi:"https://apifoxmock.com/m1/4068509-0-default/api"
  },
  test:{
    baseApi:"//test.future.com/api",
    mockApi:"https://apifoxmock.com/m1/4068509-0-default/api"
  },
  prod:{
    baseApi:"//future.com/api",
    mockApi:"https://apifoxmock.com/m1/4068509-0-default/api"
  },
}
export default {
  env,
  //扩展运算符
  ...EnvConfig[env],
  mock: false
}