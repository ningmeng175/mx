/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-24 11:00:03
 */
<template>
  <div id="waiterList">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
    <el-table
    ref="multipleTable"
    :data="customerData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="realname"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      >
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL="http://127.0.0.1:8899";
export default {
  data() {
    return {
      customerData:[],
    };
  },
  computed: {},
  methods: {
    init(){
      axios
      .get('/CustomerService/findAll').then((res)=>{
        console.log(res.data);
        this.customerData = res.data;
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style scoped>
</style>