/*
 * @Author: luoya 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luoya
 * @Last Modified time: 2019-12-28 16:49:16
 */
<template>
  <div id="userList">
    <!-- 用户列表页面 -->

    <!-- 添加用户和导入用户按钮 -->
    <div class="buttonDiv" align="right">
    <el-button @click="toAdd" size="small" type="danger">添加用户</el-button>
    <el-button @click="toLead" size="small" type="primary">导入用户</el-button>
    </div>

    <!-- 点击添加用户按钮触发模态框 -->
    <el-dialog title="添加用户" :visible.sync="saveVisible"  :before-close="beforeClose">
    <el-form :model="jobhunter"  ref="ruleForm">
    <el-form-item label="用户名" :label-width="formLabelWidth">
    <el-input v-model="jobhunter.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth">
    <el-input v-model="jobhunter.telephone" placeholder="请输入用户手机号"></el-input>
    </el-form-item>
    </el-form>
    <div class="dialog-saveer">
    <el-button type="primary" @click="toSave('ruleForm')">添 加</el-button>
    </div>
    </el-dialog>

    <!-- 点击导入用户按钮触发模态框 -->
    <el-dialog title="导入说明" :visible.sync="leadVisible">
    <div class="dao">
    <div class="span">
    <span>使用导入功能时，请按照模板表格规定的字段去填写对应信息，<br>您可以点击按钮下载模板表格，填写完后在下提交 ：</span>
    </div>
    <div class="download">
    <el-button size="mini" @click="toDownload">下载模板</el-button>
    </div>
    </div>
    <div class="uploading">
    <el-upload class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    </div>
    <div class="dialog-leader">
    <el-button type="primary" @click="toup">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    </el-dialog>

    <!-- 选择器 -->
    <div class="frameDiv">
    <div class="selectDiv">
    <el-select @change="educationChange" v-model="education" clearable placeholder="学历" size="small">
    <el-option
      v-for="item in educationData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    <el-select @change="genderChange" v-model="gender" clearable placeholder="性别" size="small">
    <el-option
      v-for="item in genderData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    </div>
    <!-- 搜索框 -->
    <div class="searchDiv">

    <el-autocomplete placeholder="请输入内容" v-model="search" class="input-with-select" size="small">
    
    <el-select  v-model="keyword" slot="prepend" clearable placeholder="关键字" class="selection">
    <el-option label="用户名"  value="usernameData"></el-option>
    <el-option label="真实姓名" value="realnameData"></el-option>
    <el-option label="联系电话" value="telephoneData"></el-option>
    <el-option label="性别" value="genderData"></el-option>
    <el-option label="出生年月" value="birthData"></el-option>
    <el-option label="最高学历" value="educationData"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
    </el-autocomplete>
    </div> 
    </div>

    <!-- 表格 -->
    <div class="tableDiv">
    <el-table
    ref="multipleTable"
    :data="jobhunterList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column align="center" type="selection" width="55"></el-table-column>
    <el-table-column align="center" prop="username" label="用户名">
    <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column align="center" prop="realname" label="真实姓名"></el-table-column>
    <el-table-column align="center" prop="telephone" label="联系电话" ></el-table-column>
    <el-table-column align="center" prop="gender" label="性别" ></el-table-column>
    <el-table-column align="center" prop="birth" label="出生年月" ></el-table-column>
    <el-table-column align="center" prop="education" label="最高学历" ></el-table-column>
    <el-table-column label="操作" width="100">
    <template slot-scope="scope">
    <el-button @click="toEdit(scope.row)" type="text"  icon="el-icon-edit"></el-button>
    <el-button @click="toDelete(scope.row.id)" type="text"  icon="el-icon-delete"></el-button>
    </template>
    </el-table-column>
    </el-table>
    
    <div class="footerDiv">
    <!-- 批量删除按钮 -->
    <div class="btnDiv">
    <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
    </div>
    <!-- 分页 -->
    <div class="pagiDiv">
    <el-pagination 
    @current-change="pageChange"
    :current-page.sync="currentPage" 
    :page-size="pageSize"
    size="mini" background layout="prev, pager, next" 
    :total="jobhunterData.length"></el-pagination>
    </div>
    </div>

    <!-- 修改模态框 -->
    <el-dialog title="修改用户信息" :visible.sync="editVisible" width="50%" >
    <el-form :model="currentJo"  ref="ruleForm">
    <el-row>
    <el-col :span="12">
    <el-form-item label="用户名" :label-width="formLabelWidth">
    <el-input v-model="currentJo.username" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="12">
    <el-form-item label="真实姓名" :label-width="formLabelWidth">
    <el-input v-model="currentJo.realname" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    </el-row>
    <el-row>
    <el-col :span="12">
    <el-form-item label="性别" :label-width="formLabelWidth">
    <el-select v-model="currentJo.gender" placeholder="请选择">
    <el-option
      v-for="item in genderData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="12">
    <el-form-item label="最高学历" :label-width="formLabelWidth">
    <el-select v-model="currentJo.education" placeholder="请选择">
    <el-option
      v-for="item in educationData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    </el-form-item>
    </el-col>
    </el-row>
    <el-row>
    <el-col :span="12">
    <el-form-item label="联系方式" :label-width="formLabelWidth">
    <el-input v-model="currentJo.telephone" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="12">
    <el-form-item label="出生年月" :label-width="formLabelWidth">
    <el-input v-model="currentJo.birth" autocomplete="off"></el-input>
    </el-form-item>
    </el-col>
    </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="toCancel('ruleForm')">取 消</el-button>
    <el-button type="primary" size="small" @click="toconfirm">确 定</el-button>
    </div>
    </el-dialog>


    </div>
  </div>
</template>

<script>
import {findAllJobhunter} from "@/api/user.js";
import {findJobhunterByEducation} from "@/api/user.js";
import {findJobhunterByGender} from "@/api/user.js";
import {deleteJobhunterById} from "@/api/user.js";
import {saveOrUpdateJobhunter,
        findJobhunterByUsername,
        findJobhunterByTelephone,
       } from "@/api/user.js";
import config from "@/utils/config.js";


export default {
  data() {
    return {
      //搜索
      search:'',
      //关键字
      keyword:'',
      //用户名
      username:'',
      //用户名数组
      usernameData:[],
      //真实姓名
      realname:'',
      //真实姓名数组
      realnameData:[],
      //联系电话
      telephone:'',
      //联系电话数组
      telephoneData:[],
      //性别
      gender:"",
      //性别数组
      genderData:[],
      //出生年月
      birth:'',
      //出生年月数组
      birthData:[],
      //学历
      education:"",
      //学历数组
      educationData:[],
      //求职者数组
      jobhunterData:[],
      //求职者列表，表格数据
      //jobhunterList:[],
      //添加按钮
      addVisible:false,
      //添加模态框显示与隐藏
      saveVisible:false,
      //导入模态框显示与隐藏
      leadVisible:false,
      //修改模态框显示与隐藏
      editVisible:false,
      //添加和修改模态框标题名称所占宽度
      formLabelWidth:"80px",
      //表单中的数据对象
      jobhunter:{
        username:'',
        telephone:'',
      },
      //当前页
      currentPage:1,
      //每页条数
      pageSize:config.page,
      //批量删除的ids
      ids:[],
      //当前修改的对象
      currentJo:{},

    };
  },

  //计算属性
  computed: {
    //定义求职者列表，表格中的数据
    jobhunterList(){
      let temp = [...this.jobhunterData];
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize, page * pageSize);
    }
  },

  //事件处理函数
  methods: {

    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.editVisible = false;
      this.saveVisible = false;
      
    },
    
    //修改模态框的取消按钮
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.$message({
            type: "info",
            message: "已取消修改"
          });
      this.editVisible = false;
    },

    //修改用户的保存
    async toconfirm(){
      try{
        let res = await saveOrUpdateJobhunter(this.currentJo);
        if (res.status === 200) {
        this.findAllJo();
        this.editVisible = false;
        config.successMsg(this, "修改成功");
        }else {
          config.errorMsg(this, "修改失败");
        }
        }catch (error) {
          console.log(error);
          config.errorMsg(this, "修改失败");
        } 
      },

    //添加用户的保存
    async toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
        //通过验证
        //保存
      try{
      let res = await saveOrUpdateJobhunter(this.jobhunter);
      if(res.status===200){
        this.findAllJo();//查找所有求职者数据
        this.saveVisible = false,
        config.successMsg(this, "保存成功");
      }else{
        config.successMsg(this, "保存失败");
      }
      }catch(error){
        console.log(error);
        config.successMsg(this, "保存失败");
       }
       }else{
          console.log("error submit!!");
          return false;
       }
     });
    },

    //添加按钮
    toAdd(){ 
      this.saveVisible = true;
    },

    //上传按钮
    toLead(){
        this.leadVisible = true;
    },

    //下载模板按钮
    toDownload(){
      this.$alert('请期待2.0版本谢谢！', {
          confirmButtonText: '期待下次使用',
        });
      this.leadVisible = true;
    },

    //上传按钮
    toup(){
      this.$alert('请期待2.0版本谢谢！', {
          confirmButtonText: '期待下次使用',
        });
       this.leadVisible = false;
    },

    //修改
    toEdit(row){
      this.currentJo = {...row};
      this.editVisible = true;
    },

    //删除
    toDelete(id){
      //row代表当前要删除的求职者对象
      //alter("删除");
      this.$confirm('是否删除该消息?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
       //访问后台接口
       try{
          let res = await deleteJobhunterById({id:id});
          console.log(res);
          if(res.status===200){
            config.successMsg(this,"删除成功");
            this.findAllJo();
          }else{
            config.successMsg(this,"删除失败");
         }
       }catch(error){
        config.successMsg(this,"删除失败");
       }
      }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消删除'
      });          
     });
    },

    //批量删除
    toBatchDelete(){
      //获得要批量删除id   this.ids
      let ids = this.ids
      if(ids.length>0){
        this.$alert('是否批量删除？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
        if(action==='confirm'){
          let result = [];
        ids.forEach(async id =>{
          try{
          let res = await deleteJobhunterById({id:id});
          result.push(res.status);
       }catch(error){
        result.push(500);
        config.successMsg(this,"删除失败");
       }
      })
      setTimeout(()=>{
        console.log(result);
        //判断是否都是200
        let  resu = result.every((item)=>{
          return item === 200;
        })
        if(resu){
          config.successMsg(this,"批量删除成功");
        }else {
          config.errorMsg(this, "批量删除失败");
        }
          this.findAllJo();
      },2000);
     }
    }
    });
      }else{
        this.$message({
        message: '请选中要删除数据',
        type: 'warning'
      });
      }
    },

    //复选框选中切换
    selectionChange(val){
      //val就是选中的对象组成的数组
      console.log(val);
      let ids = val.map((item)=>{
        return item.id;
      });
      this.ids = ids;
    },

    //分页
    pageChange(page){
      //val当前点击的页数
      // console.log(page);
      this.currentPage = page;
    },
  
    //学历发生改变
    async educationChange(val){
      this.gender='';
      //val是当前选中的value值
      // console.log(val);
      if(val){
        try{
        let res = await findJobhunterByEducation({education:val});
        this.jobhunterData = res.data;
        this.currentPage = 1;
      }catch(error){
        config.errorMsg(this, "通过学历查找求职者信息错误");
      }
      }else{
        this.findAllJo();
      }
    },

    //性别发生改变
    async genderChange(val){
      this.education='';
      //val是当前选中的value值
      // console.log(val);
      if(val){
        try{
        let res = await findJobhunterByGender({gender:val});
        this.jobhunterData = res.data;
        this.currentPage = 1;
      }catch(error){
        config.errorMsg(this, "通过性别查找求职者信息错误");
      }
      }else{
        this.findAllJo();
      }
    },

    //查找所有求职者信息
    async findAllJo(){
      try{
        let res = await findAllJobhunter();
        this.jobhunterData = res.data;
        this.currentPage = 1;
        //学历数组
        let educationArr = res.data.map(item => {
          return item.education;
        });
        //去重
        this.educationData = [...new Set(educationArr)];
        //性别数组
        let genderArr = res.data.map(item => {
          return item.gender;
        });
        //去重
        this.genderData = [...new Set(genderArr)];
      }catch(error){
      config.errorMsg(this, "查找错误");
      }
    }
  },

  //生命周期钩子函数，组件创建完毕
  created() {
   this.findAllJo()
  },
  mounted() {}
};

</script>
<style  lang="scss" scoped>
.buttonDiv{
  margin-top: -60px;
}
.dialog-saveer{
text-align: center;
}
.dialog-leader{
  text-align: center;
}
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
}
.frameDiv {
  overflow: hidden;
  margin: 20px;
  .selectDiv {
    float: left;
  }
  .searchDiv {
    float: right;
  }
}
//导入框中第二行的格式
.dao {
  overflow: hidden;
  margin: 20px;
  .span {
    float: left;
  }
  .download {
    float: right;
  }
}
.uploading{
   text-align: center;
   margin: 20px;
}
.dialog-footer{
  text-align: center;
  margin: -20px;
}
//关键字
.selection{
  width: 100px;
}
</style>