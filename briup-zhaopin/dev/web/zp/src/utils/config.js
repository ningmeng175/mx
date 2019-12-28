/*
 * @Author: liuyr 
 * 配置文件，项目中的通用方法和地址
 * @Date: 2019-12-22 19:09:29 
 * @Last Modified by: mx
 * @Last Modified time: 2019-12-26 15:49:30
 */
import Highcharts from 'highcharts';
/* 设置后台接口基础路径 */
let bp = "http://127.0.0.1:8899";
Highcharts.setOptions({
  // 设置Highcharts中的时间少8小时
  global: { useUTC: false },
  lang: {
    resetZoom: '重置比例',
    // highcharts中的暂无数据的显示
    noData: '暂无数据'
  }
})
function errorMsg(that,msg){
  that.$notify.error({
    title:'错误',
    message:msg
  })
}
function successMsg(that,msg){
  that.$notify.success({
    title:'成功',
    message:msg
  })
}
let pageSize = 10;
export default {
  bp,
  errorMsg,
  successMsg,
  pageSize
};