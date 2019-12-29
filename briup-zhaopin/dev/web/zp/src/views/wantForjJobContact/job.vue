/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: dayi
 * @Last Modified time: 2019-12-29 20:23:56
 */
<template id="EmploymentJobhunterList">
  <div>
    <el-button size="mini" v-model = "activeName" @click="handclick" prop = "temp" name = "wait">待联系</el-button>
    <!-- <el-button size="mini" v-model = "activeName" @click="handclick" prop = "temp" name = "finish">已联系</el-button> -->
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
          <el-button type="primary">个人信息
            <el-icon-s-custom></el-icon-s-custom>
          </el-button>
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
      // //申请时间
      askTime:"",
      //申请时间数组
      askTimeData:[],

      //jobhunterList:[],

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
      findEmpJob:"",
      findEmpJobData:[],
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
    // handclick(event){
    //   this.findAllEmpJob();
    // },
    //查找所有求职者和求职信息
    async findAllEmpJob(){
      try {
        let res = await findAllEmploymentJobhunterWithJobhAndEmpl();
        this.EmploymentJobhunterData = res.data;
        this.EmploymentJobhunterData.forEach((item)=>{
            item.askTime = item.askTime.slice(0,10);
        })
        // res.forEach(item => {
        //   for(let i=0;i<EmploymentJobhunterData.length;i++){
        //     let name = EmploymentJobhunterData[i].realname;
        //   }
        // });
        let temp = await findAllEmploymentJobhunter();
          this.findEmpJobData = temp.data;
        let jobhunterId = temp.data.map(item => {
          return item.jobhunterId;
        });
        let jobhunter = temp.data.map(item => {
          return item.jobhunter.id;
        });
        //this.currentempjob = 
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

    // ansyc findEmpJob(){
    //   jobhunterId
    // }
      // try {
          
          // if (this.activeName==="wait") {
          //   temp= res.data.filter((item)=>{
          //     return item.remark=="待联系";
          //   });
          // } 
          // if(this.activeName==="finish"){
          //   temp= res.data.filter((item)=>{
          //     return item.remark=="已联系";
          //   });
          // }
         
          
          
        // } catch (error) {
          
        // }

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
      this.currentempjob = { ...row.jobhunter };
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
.pageDiv{
  float: right;
}
</style>