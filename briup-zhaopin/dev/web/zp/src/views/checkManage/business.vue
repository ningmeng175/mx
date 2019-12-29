/*
 * @Author: mx 
  * 商家审核页面
 * @Date: 2019-12-25 15:04:56 
 * @Last Modified by: mx
 * @Last Modified time: 2019-12-29 20:01:11
 */
<template>
  <div id="businessList">
    <!-- 定义一个关键字下拉列表，输入框还有按钮，在关键字范围内进行查询 -->
    <div class="searchDiv">
      <el-select @change="industryChange" size="mini" v-model="industry" clearable placeholder="行业">
        <el-option v-for="item in industryData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="scaleChange" size="mini" v-model="scale" clearable placeholder="规模">
        <el-option v-for="item in scaleData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="cityChange" size="mini" v-model="city" clearable placeholder="城市">
        <el-option v-for="item in cityData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="provinceChange" size="mini" v-model="province" clearable placeholder="规模">
        <el-option v-for="item in provinceData" :key="item" :label="item" :value="item"></el-option>
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
    <!-- 页面商家表单数据 -->
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="businessList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
      <!-- 建立对应数据的表格 -->
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="contactName" label="联系人"></el-table-column>
        <el-table-column align="center" prop="industry" label="行业"></el-table-column>
        <el-table-column align="center" label="所在地" >
          <template slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
        <!-- 查看操作，触发相应事件 -->
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="mini" >查看</el-button>
          </template>
        </el-table-column>
        <!-- 待审核状态操作 -->
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-button  @click="toYes(scope.row)" size="mini" type="text" >通过</el-button>
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
        :total="businessData.length">
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
   <el-dialog :title="currentBus.name" :visible.sync="seeVisible">
      <!-- 行业类型 -->
      <div class="seeDiv">
        <span>行业类型：</span>
        {{currentBus.industry}}
      </div>
      <!-- 成立时间 -->
      <div class="seeDiv">
        <span>成立时间：</span>
        {{currentBus.establishedTime}}
      </div>
      <!-- 注册资本 -->
      <div class="seeDiv">
        <span>注册资本：</span>
        {{currentBus.registeredCapital}}
      </div>
      <!-- 公司规模 -->
      <div class="seeDiv">
        <span>公司规模：</span>
        {{currentBus.scale}}
      </div>
      <!-- 公司详情 -->
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div>
      <!-- 营业执照 -->
      <div class="imgDiv">
        <a :href="currentBus.businessLicense" target="_blank">
        <img :src="currentBus.businessLicense" alt width="200" height="150" />
        </a>
      </div>
    </el-dialog>
  <!-- 通过按钮 -->
  <el-dialog title="提示" :visible.sync="adoptVisible"  width="20%">
      <td>是否确实通过？</td>
    <div slot="footer" class="dialog-footer" >
    <el-button @click="adoptVisible = false" type="danger" size="mini">  取消</el-button>
    <el-button type="primary" @click="toSave" size="mini">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 拒绝按钮 -->
 <el-dialog title="提示" :visible.sync="refuseVisible" width="40% "  :before-close="handleClose">
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
import { findAllBusiness,findBusinessByCity,findBusinessByProvince,findBusinessByScale,findBusinessByIndustry,saveOrUpdateBusiness } from "@/api/business.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      province:'',
      provinceData: [],
      city:'',
      cityData: [],
      //行业
      industry: "",
      //规模
      scale: "",
      //行业数组
      industryData: [],
      //规模数组
      scaleData: [],  
      ruleForm:{name:''},
      refuseVisible:false,
      adoptVisible:false,
      temp:[],
      input:'',
      //搜索输入
      value:'',
      //页数
      currentPage:1,
      //每页条数
      pageSize:config.pageSize,
      //状态
      status:'',
      //状态数组
      statusData:[],
      //商家数组
      businessData: [],
      //自定义 搜索关键字选择数组
      boxData:{
        city:'城市',
        province:'省份',
        scale:'规模',
        industry:'行业类型',
      },
       statuses: [],
      //当前查看或修改的对象
      currentBus: {},
      //模态框显示与否
      seeVisible: false,
      rules: {
          name: 
            [{ required: true, message: "请输入理由", trigger: "blur" }],
          }
    };
  },
  computed: {
    //分页操作
      //数组展开传递
       businessList(){
       let temp =[...this.businessData];
       let page = this.currentPage;
       let pageSize = config.pageSize;
       return temp.slice ((page-1)*pageSize,page*pageSize)
     },
  },
  methods: {
    handleClose(){
      this.refuseVisible=false;
      this.$refs["ruleForm"].resetFields();
    },
    refuse(formName){
      this.refuseVisible=false;
      this.$refs[formName].resetFields();
    },
    //分页操作
    CurrentChange(val){
      this.currenPage = val;
    },
    //查看
    toSee(row) {
      this.currentBus = { ...row };
      this.seeVisible = true;
    },
    //通过
    toYes(row) {
      this.currentBus = {...row};
      this.adoptVisible =true;
    },
    //拒绝
    toNo(row) {
      this.currentBus = {...row};
      this.refuseVisible =true;
    },
    //取消下拉框关键字时，刷新页面
    valueChange(val){
      this.city = "";
      this.industry = "";
      this.scale = "";
      this.province="";
      this.findAllBus();
      if(val){
      }else{
        this.value=''
        this.findAllBus();
        this.input=null;
      }
    },
    //进行关键字查找
    async tochaxun(input){
      
      if(this.value=="省份"){
      try{
        let res = await findBusinessByProvince({province:input});
        this.temp = res.data;
        this.selectStatus();
        let temp = this.businessData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.businessData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllBus();
        }else{
          config.errorMsg(this,'没有这个省份')
          this.findAllBus();
        }
      }catch(err){
        console.log(err);
        config.errorMsg(this,'错误')
      }
      }else if (this.value=="城市"){
          try{
        let res = await findBusinessByCity({city:input});
        this.temp = res.data;
        this.selectStatus();
        let temp = this.businessData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.businessData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllBus();
        }else{
          config.errorMsg(this,'没有这个城市')
          this.findAllBus();
        }
      }catch(err){
        config.errorMsg(this,'错误')
      }
      }else if (this.value=="规模"){
          try{
        let res = await findBusinessByScale({scale:input});
        this.temp = res.data;
        this.selectStatus();
        let temp = this.businessData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.businessData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllBus();
        }else{
          config.errorMsg(this,'输入错误')
          this.findAllBus();
        }
      }catch(err){
        config.errorMsg(this,'错误')
      }
      }else if(this.value=="行业"){
        try{
        let res = await findBusinessByIndustry({industry:input});
        this.temp = res.data;
        this.selectStatus();
        let temp = this.businessData
        this.currentPage = 1;
        if(temp.length!=0 ){
          this.businessData = temp;
        }else if(input==''){
          config.errorMsg(this,'请输入')
          this.findAllBus();
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
     torefuse(formName){
      this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.currentBus.status="审核未通过"
      try {
        let res =await saveOrUpdateBusiness(this.currentBus);
        this.$refs[formName].resetFields();
        if(res.status===200){
          config.successMsg(this,'成功'); 
        this.findAllBus();
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
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    async toSave(){
      try {
        this.currentBus.status="审核通过"
        let res =await saveOrUpdateBusiness(this.currentBus);
        if(res.status===200){
          config.successMsg(this,'成功'); 
        this.findAllBus();
        this.adoptVisible =false;
        }else{
          config.errorMsg(this,'失败')
        }
        
      } catch (error) {
        config.errorMsg(this,'失败')
      }
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
               item.status='审核通过'
               console.log(statuses)
                try {
                    let res =await saveOrUpdateBusiness(item);
                    
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
                 this.findAllBus();
               }
             },1000)
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
    //复选框选中切换
    handleSelectionChange(val) {
      this.statuses = val;
    },
    //查找所有的商家信息
    async findAllBus() {
      try {
        let res = await findAllBusiness();
        this.temp = res.data;
        this.selectStatus();
        //状态数组
        let statusArr = this.businessData.map(item => {
          return item.status;
        });
        //去重
        this.statusData = [...new Set(statusArr)];
         let industryArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.industryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        //去重
        this.scaleData = [...new Set(scaleArr)];
        let cityArr = res.data.map(item => {
          return item.city;
        });
        //去重
        this.cityData = [...new Set(cityArr)];
        let provinceArr = res.data.map(item => {
          return item.province;
        });
        //去重
        this.provinceData = [...new Set(provinceArr)];
      } catch (error) {
        config.errorMsg(this,'查找失败')
      }
    },
    selectStatus(){
      this.businessData = [];
      this.temp.forEach(item=>{
        if('待审核'===item.status){
          this.businessData.push(item);
        }
      })
    },
    //行业发生改变
    async industryChange(val) {
      this.province = "";
      this.value ="",
      this.city = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByIndustry({ industry: val });
          this.temp = res.data;
          this.selectStatus();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //规模发生改变
    async scaleChange(val) {
      this.value ="",
      this.province = "";
      this.city = "";
      this.industry = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByScale({ scale: val });
          this.temp = res.data;
          this.selectStatus();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过规模查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    async cityChange(val) {
      this.value ="",
      this.province = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByCity({ city: val });
          this.temp = res.data;
          this.selectStatus();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过城市查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    async provinceChange(val) {
      this.value ="",
      this.city = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByProvince({ province: val });
          this.temp = res.data;
          this.selectStatus();
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过城市查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
  },
  created() {
    this.findAllBus();
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
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
}
.descDiv {
  font-weight: bold;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv {
  text-align: center;
}
.dialog-footer{
  text-align: center;
  margin-top: -40px;
}
.searchDiv{
  margin-right: 20px;
    overflow: hidden;
}

</style>