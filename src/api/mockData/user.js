import Mock from "mockjs"
function param20bj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}
let List = []
const count = 200
for(let i = 0; i < count; i++){
  List.push(
    Mock.mock({
      id:Mock.Random.guid(),
      name:Mock.Random.cname(),
      addr:Mock.mock('@county(true)'),
      'age|18-60':1,
      birth:Mock.Random.date(),
      sex:Mock.Random.integer(0,1)
    })
  )
}

export default{
  getUserList:config =>{
    const{name,page = 1,limit =10} = param20bj(config.url)
    const mockList = List.filter(user =>{
      if(name && user.name.indexOf(name) === -1) return false
      return true
    })
    //分页
    const pageList = mockList.filter(
      (item,index)=> index < limit * page &&index >= limit*(page -1)
    )
    return{
      code:200,
      data:{
        list:pageList,
        count:mockList.length
      }
    }
  },
  deleteUser:(config)=>{
    const {id} = param20bj(config.url)
    if(!id){
      return{
        code:-999,
        message:"参数不正确"
      }
    }
    else{
        List = List.filter((u)=> u.id !==id)
        return{
          code:200,
          message:"删除成功"
        }
      }
    
  }
}