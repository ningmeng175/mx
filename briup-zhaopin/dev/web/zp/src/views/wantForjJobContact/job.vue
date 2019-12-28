/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mx
 * @Last Modified time: 2019-12-28 17:23:18
 */
<template>
   <div>      <!--id="jobhunterList" -->
      <!-- {{employmentId}} -->
    <!-- {{employmentIdData}} -->

    <!-- {{jobhunter}} -->
    <!-- {{jobhunterData}} -->
    <!-- {{findAllEmploymentJobhunterWithJobhAndEmplData}} -->
    <el-button type="expand">待联系</el-button>
      <el-table :data="jobhunterData" style="width: 100%">
        <el-table-column prop="realname" label="求职人" width="150"></el-table-column>
        <el-table-column prop="telephone" label="联系方式" width="220"></el-table-column>
        <el-table-column :data = "employmentjobhunterData" label="求职岗位" width="260">
          <template slot-scope="scope">{{scope.row.employmentId}}</template>
        </el-table-column>
        <el-table-column label="简历" width="180">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
          <!-- <el-button type="text" @click="dialogVisible = true">查看</el-button> -->
          <!-- <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog> -->
        </el-table-column>
        <el-table-column prop="askTime" label="申请时间"></el-table-column>
      </el-table>
      <!-- 查看框 -->
      <!-- <el-dialog :title="currentempjob.name" :visible.sync="seeVisible">
      <div class="seeDiv">
        <el-row :>
          <el-col :span="12">
            <span>性别：</span>
            {{currentBus.industry}}
          </el-col>
          <el-col :span="12">
            <span>最高学历：</span>
            {{currentBus.establishedTime}}
          </el-col>
        </el-row>
        <el-row :>
          <el-col :span="12">
            <span>出生年月：</span>
            {{currentBus.registeredCapital}}
          </el-col>
          <el-col :span="12">
            <span>工作经验：</span>
            {{currentBus.scale}}
          </el-col>
        </el-row>
      </div> -->
<!-- 
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div>
      <div class="imgDiv">
        <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt width="200" height="150" />
        </a>
      </div> 
      </el-dialog>-->
  </div>
</template>

<script>
import {findAllJobhunter} from '@/api/jobhunter.js';
import {findAllEmploymentJobhunter,findEmploymentJobhunterById} from '@/api/employment-jobhunter.js';
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
    };
  },
  computed: {},
  methods: {
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
        config.errorMsg(this,'查找错误');
      }
    },
    //查找求职信息数据
    async findAllEmploymentJob() {
      try {
        let res = await findAllEmploymentJobhunter(this.currentempjob);
        this.employmentjobhunterData = res.data;
        //console.log(employmentjobhunterData);

        //求职岗位
        let employmentIdArr = res.data.map(item => {
          return item.employmentId;
        });
        //申请时间
        let askTime = res.data.map(item => {
          return item.askTime;
        });
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },




    
  },
  created() {
    this.findAllJob();
    this.findAllEmploymentJob();
  },
  mounted() {}
};
</script>
<style scoped>
</style>