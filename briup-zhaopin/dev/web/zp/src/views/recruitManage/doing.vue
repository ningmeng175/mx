/*
 * @Author: liuyr 
 * 招聘中页面
 * @Date: 2019-12-23 17:03:30 
 * @Last Modified by: 0tt0
 * @Last Modified time: 2019-12-28 19:52:00
 */
<template>
  <div id="recruitDoing" class="wrap">
    <div id="post">
      <!-- 发布职位按钮 -->
    <el-button type="primary" icon="el-icon-edit" size="mini" id="publish" @click="publishPost">发布职位</el-button>
    <!-- 导入职位按钮 -->
    <el-button type="primary" icon="el-icon-edit" size="mini" id="leading-in" @click="leadPost">导入职位</el-button>
    </div>
    <!-- 搜索按钮 -->
    <div id="search">
      <div id="determineDiv">
        <el-button icon="el-icon-search" size="medium" @click="search"></el-button>
      </div>
      <!-- 搜索input框 -->
      <div id="inputDiv">
        <el-input v-model="input" placeholder="请输入内容" size="medium" style="width:200px" clearable @change="toOption"></el-input>
      </div>
      <!-- 搜索下拉框 -->
      <div id="selectDiv">
        <template>
          <el-select v-model="option" clearable placeholder="关键字" size="medium" style="width:100px" @change="toOption">
            <el-option
              v-for="(item,index) in optionData"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </div>
      <!-- 职位类型 -->
      <div id="post_type">
        <template>
        <el-select v-model="job" clearable placeholder="职位类型" size="medium" @change="toFind">
          <el-option
            v-for="(item,index) in jobData"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        </template>
        <el-button icon="el-icon-refresh" circle class="searchBtn" @click="flush"></el-button>
      </div>
    </div>
    
    <div id="tableDiv"> 
        <!-- 表格 -->
        <el-table
        id="table"
        ref="multipleTable"
        :data="employmentList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="SelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          property="title"
          label="招聘标题">
        </el-table-column>
        <el-table-column
          property="contactName"
          label="发布人">
        </el-table-column>
        <el-table-column
          property="contactPhone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          property="job"
          label="招聘职位">
        </el-table-column>
        <el-table-column
          property="publishTime"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="详情">
          <template slot-scope="scope">
                <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
              </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
                <el-button @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footerDiv">
      <div class="pageDiv">
        <!-- 分页 currentChange用于翻页功能，currentPage页码-->
        <el-pagination
          @current-change="currentChange"
          :current-page.sync="currentPage"
          background
          layout="prev, pager, next"
          :total="employmentData.length">
        </el-pagination>
      </div>
      <div class="btnDiv">
        <div >
          <el-button @click="toBatchDelete">批量删除</el-button>
        </div>
      </div>
    </div>

    <!-- 查看功能 -->
    <el-dialog :title="currentEemployment.title" :visible.sync="seeVisible">
      <div class="titleDiv">
        {{currentEemployment.title}}
      </div>
      <div class="salaryDiv">
        {{currentEemployment.salary}}<span>元/月</span>
      </div>
      <div class="numDiv">
        <span>招</span>{{currentEemployment.num}}<span>人</span>
      </div>
      <div class="addressDiv">
        <i class="el-icon-location"></i>&nbsp;{{currentEemployment.city}}--{{currentEemployment.province}}
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
        <span>招聘公司：</span>{{currentEemployment.businessId}}
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

    <!-- 修改/发布功能 -->
    <el-dialog title="招聘信息" :visible.sync="editVisible" class="editDialog" :before-close="beforeClose">
      <el-form :model="currentEemployment" :rules="rules" ref="ruleForm">
        <el-form-item label="招聘名称：" prop="title" :label-width="formLabelWidth">
          <el-input v-model="currentEemployment.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="job" label="选择工作信息：" :label-width="formLabelWidth">
                <el-select v-model="currentEemployment.job" placeholder="请选择工作类型">
                  <el-option
                    v-for="item in jobData"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="num" label="招聘人数：" :label-width="formLabelWidth">
              <el-input v-model="currentEemployment.num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="businessId" label="招聘公司： " :label-width="formLabelWidth">
                <el-select v-model="currentEemployment.businessId" placeholder="请选择工作类型">
                  <el-option
                    v-for="(item,index) in businessList"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="salary" label="薪资水平：" :label-width="formLabelWidth">
              <el-input v-model="currentEemployment.salary"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 福利 -->
        <el-row>
          <el-col :span="24">
              <el-form-item label="福利标签：" :label-width="formLabelWidth">
                <el-row>
                  <el-col :span="3">
                    <el-button icon="el-icon-edit" size="mini" @click="welfareBtn"></el-button>
                  </el-col>
                  <el-col :span="21">
                    <el-input prop="welfare" v-model="welfareValueInput" :disabled="true"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
          </el-col>
        </el-row>
        <!-- 联系人姓名、联系方式 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="contactName" label="联系人姓名" :label-width="formLabelWidth">
              <el-input v-model="currentEemployment.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contactPhone" label="联系人电话" :label-width="formLabelWidth">
              <el-input v-model="currentEemployment.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 时间 -->
        <el-form-item prop="timeValue" label="招聘时间：" :label-width="formLabelWidth">
          <template>
            <div class="block" style="width:400px">
              <el-date-picker
                style="width:400px"
                v-model="currentEemployment.timeValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <!-- 描述 -->
        <el-row>
          <el-col :span="24">
            <el-tooltip placement="top">
              <div slot="content">请使用"/"对描述进行换行</div>
                  <el-form-item prop="description" label="职位描述：" :label-width="formLabelWidth">
                        <el-input  type="textarea" :rows="4" v-model="currentEemployment.description"></el-input>
                  </el-form-item> 
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form>
      
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="toEditSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择福利视图 -->
    <el-dialog
      title="选择福利"
      :visible.sync="welfareVisible">
      <el-form>
        <el-form-item label="福利标签："  :label-width="formLabelWidth">
          <template>
            <el-transfer v-model="welfareValue" :data="welfareData" filterable :filter-method="filterMethod" filter-placeholder="请输入想要福利得拼音" :titles="['选择', '确认添加']"></el-transfer>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="welfareVisible = false">取 消</el-button>
        <el-button type="primary" @click="welfareDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
import { findAllEmployment,deleteEmploymentById,findEmploymentByJob,findEmploymentByWelfare,findEmploymentByTitle,findEmploymentByCity,saveOrUpdateEmployment } from "@/api/employment.js";
import { findBusinessById } from '@/api/business.js'
import config from "@/utils/config.js";
import axios from "axios";
import qs from "qs";
// 设置基础路径
axios.defaults.baseURL = "http://127.0.0.1:8899";

export default {
  data() {
    const generateData = _ => {
        const pinyin = ['zhufangfuli','daixinxiujia','shengrifuli','jiaotongfuli','jiankangtijian','wuxianyijin','nianzhongfenhong','baowuwancan',
        'gaowenbutie','jiabanbuzhu','yuangonglvyou','chuguolvxing','yiliaobaoxian','tietanxinggongzuo','gupiaoqiquan','jiaotongbutie','zhuzhaifuli',
        'shuangxiu','lvyoujiangli','guojiefei','jinshengtouming','gaowenjia'];
        const data = [{
            key:"住房福利",
            label:"住房福利",
          },
          {
            key:"带薪休假",
            label:"带薪休假",
          },
          {
            key:"生日福利",
            label:"生日福利",
          },
          {
            key:"交通福利",
            label:"交通福利",
          },
          {
            key:"健康体检",
            label:"健康体检",
          },
          {
            key:"五险一金",
            label:"五险一金",
          },
          {
            key:"年终分红",
            label:"年终分红",
          },
          {
            key:"包午晚餐",
            label:"包午晚餐",
          },
          {
            key:"高温补贴",
            label:"高温补贴",
          },
          {
            key:"加班补助",
            label:"加班补助",
          },
          {
            key:"员工旅游",
            label:"员工旅游",
          },
          {
            key:"出国旅行",
            label:"出国旅行",
          },
          {
            key:"医疗保险",
            label:"医疗保险",
          },
          {
            key:"贴弹性工作",
            label:"贴弹性工作",
          },
          {
            key:"股票期权",
            label:"股票期权",
          },
          {
            key:"交通补贴",
            label:"交通补贴",
          },
          {
            key:"住宅福利",
            label:"住宅福利",
          },
          {
            key:"双休",
            label:"双休",
          },
          {
            key:"旅游奖励",
            label:"旅游奖励",
          },
          {
            key:"过节费",
            label:"过节费",
          },
          {
            key:"晋升透明",
            label:"晋升透明",
          },
          {
            key:"高温假",
            label:"高温假",
          }
        ];
        data.forEach((item,index)=>{
          item.pinyin = pinyin[index];
        })
        return data;
      };
    return {
       rules: {
          title: [
            { required: true, message: '请输入招聘标题', trigger: 'blur' }
          ],
          num:[
            { required: true, message: '请输入招聘人数', trigger: 'blur' }
          ],
          description:[
            { required: true, message: '请输入公司描述', trigger: 'blur' }
          ],
          salary:[
            { required: true, message: '请输入薪资水平', trigger: 'blur' }
          ],
          timeValue:[
            { required: true, message: '请输入时间', trigger: 'change' }
          ],
          welfare:[
            { required: true, message: '请输入福利', trigger: 'blur' }
          ],
          contactName:[
            { required: true, message: '请输入联系人名字', trigger: 'blur' }
          ],
          contactPhone:[
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          businessId:[
            { required: true, message: '请选择公司', trigger: 'change' }
          ],
          job:[
            { required: true, message: '请选择职业', trigger: 'change' }
          ],
        },
      // 招聘时间
      timeValue:'',
      // 福利的视图
      welfareVisible:false,
      filterMethod(query, item){
        return item.pinyin.indexOf(query) > -1;
      },
      welfareData: generateData(),
      // input框的福利
      welfareValueInput:[],
      // 双向绑定的福利
      welfareValue: [],
      // 公司
      businessList:[],
      // 福利列表
      welfareList:[],
      welfare:'',
      currentEemployment:{},
      seeVisible:false,
      totalemploymentData:[],
      // 招聘中、审核通过的放到一个数据中
      employmentData: [],
      // 招聘完成的放到一个数组
      recruitmentCompleted:[],
      multipleSelection: [],
      // 职位类型的数据,不带重复
      job:'',
      jobData:[],
      currentPage:1,
      // 批量删除
      ids:[],
      // 选择关键字
      option:'',
      optionData:[
        {
          name:'标题',
          value:'title'
        },
        {
          name:'职业',
          value:'job'
        },
        {
          name:'城市',
          value:'city'
        },
        {
          name:'福利',
          value:'welfare'
        },
      ],
      input:'',
      descriptionList:[],
      formLabelWidth:"120px",
      editVisible:false,
    };
  },
  computed: {
    employmentList(){
      let temp = [...this.employmentData];
      let pageSize = 10;
      let page = this.currentPage;
      let result = temp.slice((page-1)*pageSize,pageSize*page); // 页数数据
      return result;
      }
  },
  methods: {
      // 刷新页面
      flush(){
        this.findAllEmployment();
      },
      // 导入职位
      leadPost(){
        config.errorMsg(this,"请期待2.0版本");
      },
      // 发布职位
      publishPost(){
        this.currentEemployment = {};
        this.editVisible = true;
        this.connectBusiness();
        // 获取福利数组
        this.splitWelfare(this.currentEemployment);
        this.welfareValueInput = this.welfareList;
      },
      beforeClose(){
        this.$refs["ruleForm"].resetFields();
        this.editVisible = false;
      },
      // 取消
      toCancel(formName){
        // 重置表单验证
        this.$refs[formName].resetFields();
        this.editVisible = false;
      },
      // 编辑保存按钮
      toEditSave(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 对this.welfare判断是否为空，this.welfare用于保存福利变量，如果变化将改动，要是没有变动将为空
            if(this.welfare === ""){}else{
              this.currentEemployment.welfare = this.welfare
            }
            console.log(this.currentEemployment);
            delete this.currentEemployment.startTime;
            delete this.currentEemployment.endTime;
            delete this.currentEemployment.publishTime;
            this.currentEemployment.status = "审核通过";
            if(this.currentEemployment.city == null){
              this.currentEemployment.city = "成都";
              this.currentEemployment.province = "四川";
            }
            let rs = await saveOrUpdateEmployment(this.currentEemployment);
            console.log(this.timeValue);
            if(rs.status === 200){
              config.successMsg(this,"保存成功！！！");
              this.editVisible = false;
              this.findAllEmployment();
            }else{
              config.errorMsg(this,"保存失败！！！");
            }
          }else{
            console.log('error submit!!');
            return false;
          }
        })
        
      },
      // 添加福利到input框
      welfareDialog(){
        // items.join("")
        console.log(this.welfareValue);
        this.welfareValueInput = this.welfareValue;
        // 判断如果第一个为0说明一开始是没有数据
        if(this.welfareValueInput[0] == ""){
          this.welfareValueInput.splice(0,1) ;
        }
        // 先重置welfare，将使用、福利拼接
        this.welfare = '';
        this.welfareValueInput.forEach(item=>{
          this.welfare += item +'、';
        })
        this.welfare.trim("、");
        this.welfareVisible = false;
      },
      // 打开福利的dialog进行选择
      welfareBtn(){
        this.welfareVisible = true;
        // 将输入框的福利传给双向绑定的福利
        this.welfareValue = this.welfareValueInput;
        
      },
      
      toOption(val){
        // 如果关键字选择和输入框两个同时不为空则不重置
        if(val){
          this.job = "";
          this.findAllEmployment();
        }else{ 
          this.setNull();
          this.findAllEmployment();
        }
      },
      // 关键字查询
      async search(){
        if(this.option == "title"){
          let res = await findEmploymentByTitle({title:this.input})
          this.searchIfError(res,"查询不到结果");
          this.setNull();
        }else if(this.option == "job"){
          let res = await findEmploymentByJob({job:this.input})
          this.searchIfError(res,"查询不到结果");
          this.setNull();
        }else if(this.option == "welfare"){
          let res = await findEmploymentByWelfare({welfare:this.input})
          this.searchIfError(res,"查询不到结果");
          this.setNull();
        }else if(this.option == "city"){
          let res = await findEmploymentByCity({city:this.input})
          this.searchIfError(res,"查询不到结果");
          this.setNull();
        }else{
          this.searchIfError(null,"操作有误！");
          this.setNull();
        }
      },
      // 分页功能
      currentChange(val){
        // val为当前点击的页数
        this.currentPage = val;
      },
      // 下拉框职业类型选择查询功能
      async toFind(job){
        if(job){
          this.input = "";
          this.option = "";
          this.currentPage = 1;
          // let res = await axios.get("/Employment/findByJob",{params:{job:"程序员"}});
          let res = await findEmploymentByJob({job});
          this.saveEmploymentData(res);
        }else{
          this.input = "";
          this.option = "";
          this.findAllEmployment();
        }
        
      },
      async toSee(row){
        // 如果不加...那就是引用传递，也就是值改row也改
        this.currentEemployment = {...row};
        this.splitWelfare(this.currentEemployment);
        // 因为是async所以会返回Promise类型的数据需要then接受
        this.getBusinessName(this.currentEemployment).then(item=>{
          this.currentEemployment.businessId = item;
        });
        this.splitDescription(this.currentEemployment);
        this.seeVisible = true;
      },
      toEdit(row){
        this.currentEemployment = {...row};
        this.editVisible = true;
        this.connectBusiness();
        // 获取福利数组
        this.splitWelfare(this.currentEemployment);
        this.welfareValueInput = this.welfareList;
      },
      toDelete(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            let res = await deleteEmploymentById({id});
            this.findAllEmployment();
          } catch (error) {
            console.log(error);
          }
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 批量删除
      toBatchDelete(rows) {
        //获取要批量删除的id  this.ids
        let ids = this.ids;
        if (ids.length > 0) {
          this.$alert("是否删除？", "提示", {
            confirmButtonText: "删除",
            callback: action => {
              if (action === "confirm") {
                let result = [];
                ids.forEach(async id => {
                  try {
                    let res = await deleteEmploymentById({ id: id });
                    result.push(res.status);
                  } catch (error) {
                    result.push(500);
                  }
                });
                setTimeout(() => {
                  // console.log(result);
                  //判断是否都是200
                  // every()是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true
                  let resu = result.every(item => {
                    return item === 200;
                  });
                  if (resu) {
                    config.successMsg(this, "批量删除成功");
                  } else {
                    config.errorMsg(this, "批量删除失败");
                  }
                  this.findAllEmployment();
                }, 500);
              }
            }
          });
        } else {
          this.$message({
            message: "请选中要删除的数据",
            type: "warning"
          });
        }
      },
      // 获取页面的当前页数
      SelectionChange(val) {
        //val 就是选中的对象组成的数组
        // console.log(val);
        let ids = val.map(item => {
          return item.id;
        });
        this.ids = ids;
      },
      async findAllEmployment(){
        try{
          let arrTime = [];
          let res = await findAllEmployment();
          this.totalemploymentData = res.data;
          this.currentPage = 1;
          // 时间数据清洗
          this.timeDataClear();
          // 审核数据清洗
          this.selectStatus();
          // 将职业类型数据去重
          let jobArr = this.employmentData.map((item)=>{
          // map映射
          return item.job;
          });
          // 去重
          this.jobData = [...new Set (jobArr)];
          
        }catch(erro){
          console.log(erro);
        }
      },
      // 时间数据清洗
      timeDataClear(){
        // 处理时间数据清洗
        this.totalemploymentData.forEach(item=>{
            item.publishTime = item.publishTime.slice(0,10);
          })
      },
      // 筛选招聘状态
      selectStatus(){
        this.employmentData = [];
        this.totalemploymentData.forEach(item=>{
          if(('审核通过' === item.status) || ('招聘中' === item.status)){
            this.employmentData.push(item);
          }else if('招聘完成' === item.status){
            this.recruitmentCompleted = item;
          }
        })
      },
      saveEmploymentData(res){
          this.totalemploymentData = res.data;
          this.timeDataClear();
          this.selectStatus();
      },
      // 查找错误
      searchIfError(res,msg){
        if(res){
          if(res.data.length != 0){
            // 保存信息到数组中
            this.saveEmploymentData(res);
          }else{
            config.searchError(this,msg);
          }
        }else{
          config.searchError(this,msg);
        }
        
      },
      // 两个选择框，一个输入框设置为空
      setNull(){
          this.input = "";
          this.option = "";
          this.job = "";
      },
      // 分割福利
      splitWelfare(res){
        this.welfareList = res.welfare.split('、');
        // 去除空的数组
        this.welfareList.splice(this.welfareList.length-1,1) ;
      },
      // 获取公司名称
      async getBusinessName(res){
          let rs = res.businessId;
          let data = await findBusinessById({id:rs});
          let name = data.data.name;
          return name;  
      },
      // 分割描述
      splitDescription(res){
        let rs = res.description;
        this.descriptionList = rs.split("/");
        console.log(res.description);
      },
      // 拼接公司name、value到一个数组中
      connectBusiness(){
        // 将公司id去重
        let businessArr = this.totalemploymentData.map((item)=>{
            // map映射
            return item.businessId;
        });
        // 去重
        let BusinessList = [...new Set (businessArr)];
        BusinessList.forEach(async item=>{
          let data = await findBusinessById({id:item});
          let name = data.data.name;
          // 将公司id与公司名字连接成一个字典
          this.businessList.push({id:item,name:name});
        })
      }
  },
  created() {
    this.findAllEmployment();
  },
  mounted() {}
};
</script>
<style scoped>
</style>
<style>
  #table{
    margin-top: 10px;
  }
</style>
<style lang="scss"  scoped>
  .wrap{
    position: absolute;
    width: 100%;
  }
  #post{
    position: relative;
    float: right;
    margin-top: -50px;
    margin-right: 30px;
  }
  .footerDiv{
    overflow: hidden;
    margin-top: 10px;
    .btnDiv{
      float: left;
    }
    .searchBtn{
      float: left;
    }
    .pageDiv{
      float: right;
    }
  }
  #search{
    margin-right: 20px;
    overflow: hidden;
    
    #selectDiv{
      float: right;
    }
    #inputDiv{
      float: right;
    }
    #determineDiv{
      float: right;
    }
    
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
    span{
      font-size: 20px;;
    }
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
  .editDialog{
    margin-top: -80px;
  }
</style>