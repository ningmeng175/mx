/*
 * @Author: mx 
*招聘审核页面
 * @Date: 2019-12-25 18:36:26 
 * @Last Modified by: mx
 * @Last Modified time: 2019-12-29 20:02:25
 */

<template>
  <div id="recruitCheck">
     <div class="searchDiv">
       <el-select @change="jobChange" size="mini" v-model="job" clearable placeholder="职位">
        <el-option v-for="item in jobData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
       <el-select @change="cityChange" size="mini" v-model="city" clearable placeholder="城市">
        <el-option v-for="item in cityData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="titleChange" size="mini" v-model="title" clearable placeholder="标题">
        <el-option v-for="item in titleData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button icon="el-icon-search" style="width:5px" class="box" size="mini" @click="tochaxun(input)"></el-button >
      <!-- 关键字输入框 -->
      <el-input style="width:12%"
            placeholder="请输入内容"
            v-model="input"
            clearable class="box" size="mini">
          </el-input>
      <!-- 关键字下拉列表 -->
      <el-select v-model="value" clearable style="width:9%" @change="valueChange" placeholder="关键字" class="box" size="mini"    >
          <el-option
            v-for="item in boxData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
          </el-select>
    </div>
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="employmentList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
      <!-- 建立对应数据的表格 -->
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="title" label="招聘标题"></el-table-column>
        <el-table-column align="center" prop="contactName" label="发布人"></el-table-column>
        <el-table-column align="center" prop="contactPhone" label="联系方式"></el-table-column>
        <el-table-column align="center" label="招聘职位" prop="job" >
        </el-table-column>
        <el-table-column align="center" prop="publishTime" label="公发布时间"></el-table-column>
        <!-- 查看操作，触发相应事件 -->
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="mini" >查看</el-button>
          </template>
        </el-table-column>
        <!-- 待审核状态操作 -->
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-button  @click="toYes(scope.row)" size="mini"  type="text" >通过</el-button>
            <el-button type="text" size="mini" @click="toNo(scope.row)" >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页操作与一键通过 -->
   <div class="footerDiv">
      <!-- 分页操作 -->
      <div class="pageDiv"> 
        <el-pagination 
        @current-change="CurrentChange"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        size="mini"
        background
        layout="prev, pager, next"
        :total="employmentData.length">
        </el-pagination>
      </div>
    <!-- 一键审核通过 -->
     <div class="btnDiv">
       <el-button @click="toadopt()" 
       type="success" 
        size="mini" 
       plain>一键通过</el-button>
    </div>
   </div>
   <!-- 查看详细数据按钮  -->
   <el-dialog :title="currentEmp.title" :visible.sync="seeVisible">
      <div class="titleDiv">
        {{currentEmp.title}}
      </div>
      <div class="salaryDiv">
        {{currentEmp.salary}}<span>元/月</span>
      </div>
      <div class="numDiv">
        <span>招</span>{{currentEmp.num}}<span>人</span>
      </div>
      <div class="addressDiv">
        <i class="el-icon-location"></i>&nbsp;{{currentEmp.city}}--{{currentEmp.province}}
      </div>
      <div class="tag-group">
        <span class="tag-group__title"></span>
        <el-tag
          class="tag"
          v-for="(item,index) in welfareList"
          :key="index"
          :type="item"
          effect="dark">
          {{ item }}
        </el-tag>
      </div>
      <div class="businessDiv">
        <span>招聘公司：</span>{{currentEmp.businessId}}
      </div>
      <!-- 分割线 -->
      <div class="border"></div>
      <div class="descriptionDiv">
        <h3>职位描述</h3>
        <div v-for="(item,index) in descriptionList" :key="index">
            {{item}}
        </div>
      </div>
    </el-dialog>
   <!-- 通过按钮 -->
  <el-dialog title="提示" :visible.sync="adoptVisible" width="20%">
      <td>是否确实通过？</td>
    <div slot="footer" class="dialog-footer" >
    <el-button @click="adoptVisible = false" type="danger" size="mini">  取消</el-button>
    <el-button type="primary" @click="toSave" size="mini">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 拒绝按钮 -->
 <el-dialog title="提示" :visible.sync="refuseVisible" width="40%" :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
  <el-form-item label="拒绝理由" prop="name">
      <el-input type="textarea" :rows="5" v-model="ruleForm.name"></el-input>
      <el-button @click="resetForm('ruleForm')" class="Reset" type="success" size="mini">重置</el-button>
      </el-form-item>
      </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="refuse('ruleForm')" size="mini" type="danger">取 消</el-button>
    <el-button type="primary" @click="torefuse('ruleForm')" size="mini">确 定</el-button>
  </div>
 </el-dialog>
  </div>
</template>

<script>
import { findAllEmployment,findEmploymentByCity,findEmploymentByJob,findEmploymentByTitle,findEmploymentByWelfare,saveOrUpdateEmployment } from "@/api/employment.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      city:"",
      cityData:[],
       //行业
      job: "",
      //规模
      title: "",
      //行业数组
      jobData: [],
      //规模数组
      titleData: [], 
      descriptionList:[],
      welfareList:[],
      statuses: [],
      employmentData:[],
      status:'',
      statusData:[],
      temp:[],
       //每页条数
      pageSize:config.pageSize,
      //页数
      currentPage:1,
      input:'',
      value:'',
      boxData:{
        city:'城市',
        job:'职位',
        title:'标题',
        welfare:'福利',
      },
      refuseVisible:false,
      adoptVisible:false,
      seeVisible:false,
      ruleForm:{name:''},
      currentEmp: {},
       rules: {
          name: 
            [{ required: true, message: "请输入理由", trigger: "blur" }],
          }
    };
  },
  computed: {
     //分页操作
      //数组展开传递
       employmentList(){
       let temp =[...this.employmentData];
       let page = this.currentPage;
       let pageSize = config.pageSize;
       return temp.slice ((page-1)*pageSize,page*pageSize)
     },
  },
  methods: {
    //
    handleClose(){
      this.refuseVisible=false;
      this.$refs["ruleForm"].resetFields();
    },
    refuse(formName){
      this.refuseVisible=false;
      this.$refs[formName].resetFields();
    },
    //通过
    toYes(row) {
      this.currentEmp = {...row};
      this.timeDataClear();
      this.$delete(this.currentEmp,'publishTime');
      this.$delete(this.currentEmp,'startTime');
      this.$delete(this.currentEmp,'endTime');
      this.adoptVisible =true;
    },
    //查看
    toSee(row) {
      this.currentEmp = { ...row };
      this.splitWelfare(this.currentEmp);
      this.splitDescription(this.currentEmp);
      this.seeVisible = true;},
    //拒绝
    toNo(row) {
      this.currentEmp = {...row};
      this.timeDataClear();
      this.$delete(this.currentEmp,'publishTime');
      this.$delete(this.currentEmp,'startTime');
      this.$delete(this.currentEmp,'endTime');
      this.refuseVisible =true;
    },
    //重置
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //通过确定
    async toSave(){
      try {
        this.currentEmp.status="审核通过"
        let res =await saveOrUpdateEmployment(this.currentEmp);
        
        if(res.status===200){
          config.successMsg(this,'成功'); 
        this.findAllEmp();
        this.adoptVisible =false;
        }else{
          config.errorMsg(this,'失败')
        }
        
      } catch (error) {
        console.log('---',error);
        config.errorMsg(this,'失败')
      }
    },
      torefuse(formName){
      this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.currentEmp.status="拒绝"
      try {
        let res =await saveOrUpdateEmployment(this.currentEmp);
        this.$refs[formName].resetFields();
        if(res.status===200){
          config.successMsg(this,'成功'); 
        this.findAllEmp();
        this.refuseVisible =false;
        }else{
          config.errorMsg(this,'失败')
        }
        
      } catch (error) {
        config.errorMsg(this,'失败')
      }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //分页操作
    CurrentChange(val){
      this.currenPage = val;
    },
    //取消下拉框关键字时，刷新页面
    valueChange(val){
      if(val){
      this.job="";
      this.city = "";
      this.title = "";
      this.findAllEmp();
      }else{
        this.value=''
        this.findAllEmp();
        this.input=null;
      }
    },
    //进行关键字查找
    async tochaxun(input){
      if(this.value=="城市"){
      try{
        let res = await findEmploymentByCity({city:input});
        this.temp = res.data;
        this.selectstatus();
        this.timeDataClear();
        let temp = this.employmentData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.employmentData =temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllEmp();
        }else{
          config.errorMsg(this,'没有这个城市')
          this.findAllEmp();
        }
      }catch(err){
        console.log(err);
        config.errorMsg(this,'错误')
      }
      }else if (this.value=="职位"){
          try{
        let res = await findEmploymentByJob({job:input});
        this.temp = res.data;
        this.selectstatus();
        this.timeDataClear();
        let temp = this.employmentData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.employmentData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllEmp();
        }else{
          config.errorMsg(this,'没有这个职位')
          this.findAllEmp();
        }
      }catch(err){
        config.errorMsg(this,'错误')
      }
      }else if (this.value=="标题"){
          try{
        let res = await findEmploymentByTitle({title:input});
        this.temp = res.data;
        this.selectstatus();
        this.timeDataClear();
        let temp = this.employmentData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.employmentData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllEmp();
        }else{
          config.errorMsg(this,'输入错误')
          this.findAllEmp();
        }
      }catch(err){
        config.errorMsg(this,'错误')
      }
      }else if(this.value=="福利"){
        try{
        let res = await findEmploymentByWelfare({welfare:input});
        this.temp = res.data;
        this.selectstatus();
        this.timeDataClear();
        let temp = this.employmentData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.employmentData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllEmp();
        }else{
          config.errorMsg(this,'输入错误')
          this.findAllBus();
        }
      }catch(err){
        config.errorMsg(this,'错误')
      }
      }else{
        config.errorMsg(this,'请选择关键字')
      }
    },
     async findAllEmp() {
      try {
        let res = await findAllEmployment();
        this.temp = res.data;
        this.selectstatus();
        this.timeDataClear();
        let statusArr = this.employmentData.map(item => {
          return item.status;
        });
        this.statusData = [...new Set(statusArr)];
        let jobArr = res.data.map(item => {
          return item.job;
        });
        //去重
        this.jobData = [...new Set(jobArr)];
        //规模数组
        let titleArr = res.data.map(item => {
          return item.title;
        });
        //去重
        this.titleData = [...new Set(titleArr)];
        let cityArr = res.data.map(item => {
          return item.city;
        });
        //去重
        this.cityData = [...new Set(cityArr)];
      } catch (error) {
        config.errorMsg(this,'查找失败')
      }
    },
    selectstatus(){
      this.employmentData = [];
      this.temp.forEach(item=>{
        console.log(item)
        if('待审核'===item.status){
          this.employmentData.push(item);
          console.log(this.employmentData,"222")
        }
        console.log(this.employmentData,"123");
      })
    },
    timeDataClear(res){
      this.temp.forEach(item=>{
        item.publishTime = item.publishTime.slice(0,10)
      })
    },
    handleSelectionChange(val) {
    this.statuses =val
    },
     //一键通过
    toadopt(){
      let statuses = this.statuses
      if (statuses.length>0) {
         this.$alert('是否通过', '提示', {
          confirmButtonText: '确定',
          callback: action => {
           if (action==='confirm') {
             let result = [];
             statuses.forEach(async(item)=>{
               item.status='审核通过';
               delete item.publishTime;
               delete item.startTime;
               delete item.endTime;
                try {
                    let res =await saveOrUpdateEmployment(item);
                    result.push(res.status);
                    } catch (error) {
                      config.errorMsg(this,'失败')
                      }
              })
             setTimeout(()=>{
               let resu = result.every((item)=>{
                 return item ===200;
               })
               if(resu){
                 config.successMsg(this,'成功');
                 this.findAllEmp();
               }
             },500)
           }
          }
        });
      } else {
         this.$message({
          message: "请选中要通过的商家",
          type: "warning"
        });
      }
    },
    splitWelfare(res){
        this.welfareList = res.welfare.split('、');
      },
      splitDescription(res){
        this.descriptionList = res.description.split("/");
      },
    //改变
    async jobChange(val) {
      this.value="",
      this.city = "";
      this.title = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findEmploymentByJob({ job: val });
          this.temp = res.data;
          this.selectstatus();
        this.timeDataClear();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过职业查找招聘信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },
    //职位发生改变
    async titleChange(val) {
      this.value="",
      this.city = "";
      this.job = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findEmploymentByTitle({ title: val });
          this.temp = res.data;
          this.selectstatus();
          this.timeDataClear();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过标题查找招聘信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },
     //城市发生改变
    async cityChange(val) {
      this.value="",
      this.title = "";
      this.job = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findEmploymentByCity({ city: val });
          this.temp = res.data;
          this.selectstatus();
          this.timeDataClear();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过标题查找招聘信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },
  },
  created() {
    this.findAllEmp();
  },
  mounted() {}
};
</script>
<style scoped>
.tableDiv {
  margin-top: 10px;
}
.box{
  float: right
}
.footerDiv{
  overflow: hidden;
  margin-top: 10px;
}
.btnDiv{
  float: left;
}
.pageDiv{
  float: right;
}
.Reset{
  float: right;
}
.dialog-footer{
  text-align: center;
  margin-top: -40px;
}
  .titleDiv{
    font-size:2em;
    font-weight:500;
    display: inline-block;
  }
  .salaryDiv{
    margin-top: -5px;
    float: right;
    font-size: 2.5em;
    color: rgb(150, 150, 13);
  }
  .numDiv{
    margin-top: 20px;
    }
  .addressDiv{
    margin-top: 20px;
    font-size: 15px;
    color: rgb(189, 186, 47);
  }
  .tag-group{
    margin-top: 20px;
    display:inline-block;
  }
  .tag{
    margin-right: 20px;
  }
  .businessDiv{
    color: rgb(94, 131, 233);
    float: right;
    margin-top: 20px;
  }
  .border{
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
  }
  .descriptionDiv{
    margin-top: 30px;
  }
  .searchDiv{
    margin-right: 20px;
    overflow: hidden;
  }
</style>