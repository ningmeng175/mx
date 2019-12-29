/*
 * @Author: liuyr 
 * 福利管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: Wuxy
 * @Last Modified time: 2019-12-29 20:19:06
 */

<template>
  <div id="moduleBoon">
<<<<<<< HEAD


<el-button @click="dialogFormVisi = true" class="butt" type="primary" icon="el-icon-plus" size="mini" round>添加福利</el-button>
=======
    <div class="buttonDiv" align="right">
<el-button @click="buttn" class="butt" type="primary" icon="el-icon-plus" size="mini">添加福利</el-button>
</div>
>>>>>>> 618373c622aef4b92779e1f4f8f1711b4ffe8346
      <el-dialog title="添加福利" :visible.sync="dialogFormVisi" width="30%"> 
        <el-form :model="addWelfare">
          <el-form-item label="福利名称">
            <el-input v-model="addWelfare.name" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisi = false">取 消</el-button>
          <el-button type="primary" @click="addWf()">确 定</el-button>
        </div>
      </el-dialog>
    <div class="searchDiv">
      <el-select @change="Welfarefilter" size="mini" v-model="all" clearable placeholder="全部">
        <el-option v-for="(item) in useStatus" :key="item" :value="item"></el-option>
      </el-select>
    </div>
  <template>
  <el-table :data="WelfareList" ref="multipleTable"  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="name" label="姓名" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="status" label="状态" align="center" width="150">
        <template slot-scope="scope" >
            <div v-html="scope.row.status" v-if="scope.row.status == '使用中'" style="color:#67C23A"></div>
            <div v-html="scope.row.status" v-if="scope.row.status == '冻结中'" style="color:#F56C6C"></div>
          </template>
    </el-table-column>
    <el-table-column  label="编辑" width="70" align="center">
      <template slot-scope="scope">
      <el-button size="mini"   type="text" @click="change(scope.row)" >编辑</el-button>

      <el-dialog title="修改" :visible.sync="dialogFormVisible" width="30%"> 
        <el-form :model="changedata">
          <el-form-item label="省份名称">
            <el-input v-model="changedata.name" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toSave()">确 定</el-button>
        </div>
      </el-dialog>


      </template>
    </el-table-column >
    <el-table-column label="操作" width="150"  align="center" >
        <template slot-scope="scope">
          <div v-if="scope.row.status == '冻结中'">
        <el-button size="mini" type="success" @click="changeStatus_a(scope.row)">使用</el-button>
          </div>
          <div v-if="scope.row.status == '使用中'">
          <el-button size="mini" type="danger" @click="changeStatus_b(scope.row)">冻结</el-button>
          </div>
      </template>
      </el-table-column>
      
  </el-table>
  <el-pagination class="pagination"
  @current-change="currentChange"
:current-page.sync="currentPage"
  :page-size="10"
 size="mini"
  background
  layout="prev, pager, next"
  :total="tableData.length">
</el-pagination>
  <div style="margin-top: 20px">
    <el-button class="delete" @click="toBatchDelete()" type="danger" size="mini" plain>批量删除</el-button>
    
  </div>
</template>



  </div>
</template>

<script>
import { deleteWelfareById,findAllWelfare,saveOrWelfareUpdate } from "@/api/boon.js";
import { async } from 'q';
export default {
  data() {
    return {
      all:"",
      tableData:[],
      useStatus:["使用中","冻结中"],
      deletarepeat:[],
      multipleSelection:[],
      //批量删除
      ids:[],
      currentPage:1,
      input:'',
      dialogFormVisible:false,
      dialogFormVisi:false,
      changedata:{
        id:'',
        name:'',
        status:'',
      },
      addWelfare:{
        name:'',
        status:'使用中',
      },
      
    };
  },
  computed: {
    WelfareList(){
      //current
      let temp = [...this.tableData];
      let pageSize =10;
      let page = this.currentPage
      return temp.slice((page-1)*pageSize,pageSize*page)
    },

  },
  methods: {

    currentChange(val){
      // val是当前点击页面的页数
      // console.log(val)
      this.currentPage = val
    },
    
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        //val 就是选中的对象组成的数组
        console.log(val)
        let ids = val.map((item)=>{
            return item.id;
        });
        this.ids = ids;
        this.changedata = val
      },

      //批量删除
      toBatchDelete(){
        let ids = this.ids
        if(ids.length>0){
          this.$alert('是否删除？', '提示', {
          confirmButtonText: '删除',
          callback: action => {
            if(action=='confirm'){
              let result = [];
              ids.forEach(async id=>{
                try{
                  let res = await deleteWelfareById ({id:id})
                  result.push(res.status);
                }catch(error){
                  result = 500;
                }
              })
              setTimeout(()=>{
                // console.log(result)
                let resu = result.every(
                  (item)=>{
                    return item === 200;
                  })
                  if(resu){
                    this.$message({
                    type: 'success',
                    message: '批量删除成功!'
                    });
                  }else{
                    this.$message({
                    type: 'success',
                    message: '批量删除失败!'
                    });
                  }
                  this.findAllWelfa()
              },2000)
            }
          }
        });
        }else{
           this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        });
        }
      },
      //获取所有福利信息
      async findAllWelfa(page){
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await findAllWelfare();
        this.tableData = res.data;
        console.log(this.tableData)
      } 
      catch (err) {
        this.$notify.error({
          title: "错误",
          message: "1查找失败"
        });
      }
    },
    
    //状态筛选
    async Welfarefilter(val) {
      if (val) {
        try {
          let res = await findAllWelfare();
          let temp = res.data;
          let resu = temp.filter((item)=>{
            return item.status === val;
          });
          this.tableData = resu;
        } catch (error) {
        this.$notify.error({
                  title: "错误",
                  message: "3查找失败"
                });
        }
      } else {
        this.findAllWelfa();
      }
    },

    //更改使用状态
    async changeStatus_a(row){
      let name = row
      //筛选
      if(name.status == '冻结中'){
      try {
        name.status = '使用中'
        console.log(name)
        let res = await saveOrWelfareUpdate(name);
        this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
      } 
      catch (err) {
        this.$notify.error({
          title: "错误",
          message: "5查找失败"
        });
      }
    }else{this.$notify.error({
          title: "错误",
          message: "状态已为'使用中'"
        });}
    },

    async changeStatus_b(row){
      let name = row
      if(name.status == '使用中'){
      try {
        name.status = '冻结中'
        console.log(name)
        let res = await saveOrWelfareUpdate(name);
        this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
      } 
      catch (err) {
        this.$notify.error({
          title: "错误",
          message: "5查找失败"
        });
      }
    }else{this.$notify.error({
          title: "错误",
          message: "状态已为'冻结中'"
        });}
    },
    
    change(row){
      this.changedata = {...row}
      this.dialogFormVisible = true
    },

    async toSave(){
      console.log(this.changedata)
      let name = this.changedata
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await saveOrWelfareUpdate(name);
        console.log(res)
        this.dialogFormVisible = false,
        this.findAllWelfa();
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

    async addWf(){
      console.log(this.addWelfare)
      let name = this.addWelfare
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await saveOrWelfareUpdate(name);
        console.log(res)
        this.dialogFormVisi = false,
        this.findAllWelfa();
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
    buttn(){
      this.dialogFormVisi = true
      this.addWelfare.name = ''
    }
  },

  created() {
    this.findAllWelfa()
  },
  mounted() {}
};
</script>
<style scoped>
.in{
  float: right;
  padding: 0;
  margin: 0;
}
.inp{
  width: 150px;
}
.delete{
  float: left;
}
.butt{
  float: right;
}
.pagination{
  float: right;
}
.butt{
  margin-top: -55px;
};
</style>