import MOCK from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user"
//1.拦截的路径 2.拦截方法 3，制造出的假数据
MOCK.mock(/api\/home\/getDataTable/,'get',homeApi.getTableData)
MOCK.mock(/api\/home\/getCountData/,'get',homeApi.getCountData)
MOCK.mock(/api\/home\/getChartData/,'get',homeApi.getChartData)
MOCK.mock(/api\/user\/getUserData/,'get',userApi.getUserList)
MOCK.mock(/api\/user\/deleteUserList/,'get',userApi.deleteUser)
MOCK.mock(/api\/user\/addUser/,'post',userApi.addUser)