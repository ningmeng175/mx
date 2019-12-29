/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luoya
 * @Last Modified time: 2019-12-29 15:49:58
 */
<template :data="EmploymentJobhunterData">
  <div>
    <el-button type="expand" size="mini">待联系</el-button>
    <el-table :data="EmploymentJobhunterList" style="width: 100%">
      <el-table-column prop="jobhunter.realname" label="求职人" width="150"></el-table-column>
      <el-table-column prop="jobhunter.telephone" label="联系方式" width="220"></el-table-column>
      <el-table-column prop="employment.job" label="求职岗位" width="260"></el-table-column>
      <el-table-column label="简历" width="180">
        <template slot-scope="scope">
          <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="askTime" label="申请时间"></el-table-column>
    </el-table>
      <!-- 分页 -->
    <div>
      <div class="pageDiv">
        <el-pagination
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        size="mini"
        background
        layout="prev, pager, next"
        :total="EmploymentJobhunterData.length"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看框:title="jobhunter.realname -->
    <div>
    <el-dialog :title="currentempjob.realname"
    :visible.sync="seeVisible">
      <div class="seeDiv">
        <el-row>
          <el-button type="primary">个人信息</el-button>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>性别：</span>
            {{currentempjob.gender}}
          </el-col>
          <el-col :span="12">
            <span>最高学历：</span>
            {{currentempjob.education}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>出生年月：</span>
            {{currentempjob.birth}}
          </el-col>
          <el-col :span="12">
            <span>工作经验：</span>
            {{currentempjob.workTime}}
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import {findAllJobhunter} from '@/api/jobhunter.js';
import {findAllEmploymentJobhunter,findAllEmploymentJobhunterWithJobhAndEmpl} from '@/api/employment-jobhunter.js';
import config from '@/utils/config.js';
export default {
  data() {
    return {
      //求职者
      jobhunter:"",
      //求职岗位
      employmentId:"",
      //求职信息
      employmentjobhunter:"",
      //申请时间
      askTime:"",
      //求职者数组
      jobhunterData:[],
      //求职岗位数组
      employmentIdData:[],
      //求职信息数组
      employmentjobhunterData:[],
      //申请时间数组
      askTimeData:[],

      jobhunterList:[],

      currentempjob:{},
      //currentempjob:[],
       //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,

      EmploymentJobhunterWithJobhAndEmpl:"",
      EmploymentJobhunterData:[],

      //EmploymentJobhunterList:[],
      seeVisible: false,
      EmploymentJobhunterWithJobhAndEmpl:"",
      //  jobhunter:{ 
      //   realname:"",
      //   education: "",
      //   birth: "",
      //   workTime: "",
      //   gender: "",
      // },
    };
  },
  computed: {
    //分页数据
    EmploymentJobhunterList() {
      let temp = [...this.EmploymentJobhunterData];
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    //查找所有求职者和求职信息
    async findAllEmpJob(){
      try {
        let res = await findAllEmploymentJobhunterWithJobhAndEmpl();
        this.EmploymentJobhunterData = res.data;

        res.forEach(item => {
          for(let i=0;i<EmploymentJobhunterData.length;i++){
            let name = EmploymentJobhunterData[i].realname;
          }
        });
        //let temp = [...res.data];
        // //求职者姓名
        // let realname = res.data.map(item => {
        //   return item.realname;
        // });
        // //求职者电话
        // let telephone = res.data.map(item => {
        //   return item.telephone;
        // });
        //  let result = this.EmploymentJobhunterData.filter(item => {
        //       return item.id === result;
        // })[0];
        // // result 是省份对象
        // this.currentempjob.jobhunter = result.data;
        
      }catch (error) {
      }
    },
    //查找所有求职者信息
    async findAllJob(){
      try {
        let res = await findAllJobhunter();
        this.jobhunterData = res.data;

        //求职者姓名
        let realname = res.data.map(item => {
          return item.realname;
        });
        //求职者电话
        let telephone = res.data.map(item => {
          return item.telephone;
        });

      }catch (error) {
         config.errorMsg(this, "查找错误");
      }
    },
    
    //查看
    toSee(row) {
      this.currentempjob = { ...row };
      this.seeVisible = true;
    },
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },
    
  },
  created() {
    this.findAllJob();
    this.findAllEmpJob();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height:45px;
  font-weight: bold;
  span {
    color: #777;
  }
}

</style>