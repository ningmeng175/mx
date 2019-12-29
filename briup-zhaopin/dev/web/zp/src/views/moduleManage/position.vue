/*
 * @Author: liuyr 
 * 职位管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: Wuxy
 * @Last Modified time: 2019-12-29 20:21:54
 */
<template>

  <div>
    <div class="butt" align="right">
        <el-button @click="bttun" type="primary" icon="el-icon-plus" size="mini">
      添加职业</el-button>
            <el-button @click="bttun1" type="primary" icon="el-icon-plus" size="mini" >添加行业</el-button>
</div>
      <el-dialog title="添加职业" :visible.sync="dialogTableVisible" width="30%">
        <el-form :model="jobsform">
          <el-form-item label="职业名称" :label-width="long">
            <el-input v-model="jobsform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属行业" :label-width="long">
            <el-select v-model="jobsform.jobTypeId" placeholder="请选择行业">
              <el-option v-for="(item,index) in jobsData" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
            
          </el-form-item>
          <!-- <el-form-item label="职业ID" :label-width="long">
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="tojobsSave">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加行业" :visible.sync="dialogFormVisible" width="30%"> 
        <el-form :model="jobTypeIdform">
          <el-form-item label="行业名称">
            <el-input v-model="jobTypeIdform.name" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toJobTypeSave()">确 定</el-button>
        </div>
      </el-dialog><br>

    <div>
      <el-table :data="jobsData">
        <el-table-column  type="expand" prop="jobs">
          <template slot-scope="scope" >
            <el-table  :data="scope.row.job" >
              <el-table-column prop="name" label="职业"  align="left">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="play"  label="操作" align="right" >
                <template slot-scope="scope">
                    <el-button  @click="deleteJobs(scope.row.id)"  type="success" size="mini" icon="el-icon-delete" circle></el-button>
                  </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
          <el-table-column prop="name" label="行业"  align="left" >
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
          </el-table-column>
        <el-table-column fixed="right" align="right"  label="操作">
          <template slot-scope="scope">
              <el-button  @click="deletejobtype(scope.row.id)"  type="primary" size="mini" icon="el-icon-delete" circle>  
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

      
  </div>
</template>

<script>
import { findJobsByStatus,deleteJobsById,saveOrJobsUpdate,findAllJobs } from "@/api/job.js";
import { findAllJobType,deleteJobTypeById,saveOrJobTypeUpdate,findJobTypeById } from "@/api/jobtype.js";
import { async } from 'q';
export default {
  data() {
    return {
      jobsData:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      long:"120px",
      jobsform: {
           name:'',
           jobTypeId:'',
           status: '',
        },
      jobTypeIdform: {
           name: '',
        },
    };
  },
  computed: {},
  methods: {
    async findAllJobType(page){
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        //获取职业
        let res = await findAllJobs();
        let temp = [...res.data];
        // console.log(temp)
        //获取行业
        let resp = await findAllJobType()
        let temps = [...resp.data]
        // console.log(temps)
        temps.forEach(item =>{ 
          let id = item.id
          let job = temp.filter((ite)=>{
            return ite.jobTypeId === id;
          });
          item.job = job;
          // for(let i=0;i<tjobTypeIdemp.length;i++){
          //   // console.log(temp[i].jobTypeId)
          // if(id === temp[i].){
          //   // temps.jobs = temp[i]
          //   // console.log(temp[i])
          //   let flag = temp[i]
          //   // item.jobs = temp[i]
          //   let jos = []
          //   // jos.push(flag)
          //   console.log(job)

          //   // item.jobs.push(flag)
          //   // console.log(temp[i])
          //   console.log(item)

          //   console.log(item.jobs)
          // }
          // }
          
        })
        setTimeout((items)=>{
                    this.jobsData = temps
                  },500)} 
      catch (err) {
        this.$notify.error({
          title: "错误",
          message: "1查找失败"
        });
      }
    },

      deletejobtype(id){
      this.$confirm('是否删除该行业', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
        
          try{
            let res = await deleteJobTypeById({id:id});
            if(res.status === 200){
             this.$message({
            type: 'success',
            message: '删除成功!'
             });
             this.findAllJobType();
            }else{this.$message({
            type: 'info',
            message: '删除失败'
          });  }
          }catch(error){
            this.$notify({
            title: "错误",
            message: "删除失败",
            type: "error"
          })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

      deleteJobs(id){
      this.$confirm('是否删除该职业', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          // alert(1);
          //访问后台接口
          try{
            let res = await deleteJobsById({id:id});
            if(res.status === 200){
             this.$message({
            type: 'success',
            message: '删除成功!'
             });
             this.findAllJobType();
            }else{this.$message({
            type: 'info',
            message: '删除失败'
          });  }
          }catch(error){}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },


      async tojobsSave(){
      // console.log(this.jobsform)
      let name = this.jobsform
      try{
      let res = await saveOrJobsUpdate(name);
      // console.log(res);
      this.dialogTableVisible = false;
      this.findAllJobType()
      this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
      }catch(err){
        console.log(err)
        }
      },

      async toJobTypeSave(){
      // console.log(this.jobTypeIdform.name)
      let name = this.jobTypeIdform.name
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await saveOrJobTypeUpdate({name:name});
        console.log(res)
        this.dialogFormVisible = false,
        this.findAllJobType();
        this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "1查找失败"
        });
      }
    },
       bttun(){
      this.dialogTableVisible = true,
      this.jobsform.name = ""
       this.jobsform.jobTypeId =""
    },
    bttun1(){
      this.dialogFormVisible = true,
      this.jobTypeIdform.name = ""
     
    }
  },
  created() {
    this.findAllJobType()
  },
  mounted() {}
};
</script>
<style scoped>
.butt{
  float: right;
}
.butt{
  margin-top: -55px;
};
</style>