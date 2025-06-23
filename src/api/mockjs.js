import MOCK from "mockjs";
import homeApi from "./mockData/home";
//1.拦截的路径 2.拦截方法 3，制造出的假数据
MOCK.mock(/api\/home\/getDataTable/,'get',homeApi.getTableData)
MOCK.mock(/api\/home\/getCountData/,'get',homeApi.getCountData)
MOCK.mock(/api\/home\/getChartData/,'get',homeApi.getChartData)