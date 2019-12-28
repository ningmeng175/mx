/*
 * @Author: liuyr 
 * 福利管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: Wuxy
 * @Last Modified time: 2019-12-27 20:47:47
 */

<template>
  <div id="moduleBoon">福利管理页面<br>
    <div class="searchDiv">
      <el-select @change="Welfarefilter" size="mini" v-model="all" clearable placeholder="全部">
        <el-option v-for="(item,index) in useStatus" :key="item" :value="item"></el-option>
      </el-select>
    </div>
  <template>
  <el-table :data="WelfareList" ref="multipleTable"  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="name" label="姓名" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="100">
    </el-table-column>
    <el-table-column label="操作" width="150"  align="center" >
        <template slot-scope="scope">
        <el-button size="mini" type="success" @click="changeStatus_a(scope.row)">使用</el-button>

          <el-button size="mini" type="danger" @click="changeStatus_b(scope.row)">冻结</el-button>
      </template>
      </el-table-column>
  </el-table>
  <el-pagination
  @current-change="currentChange"
:current-page.sync="currentPage"
  :page-size="5"
 size="mini"
  background
  layout="prev, pager, next"
  :total="tableData.length">
</el-pagination>
  <div style="margin-top: 20px">
    <el-button @click="toBatchDelete()" type="danger" size="mini">批量删除</el-button>
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
      
    };
  },
  computed: {
    WelfareList(){
      //current
      let temp = [...this.tableData];
      let pageSize =5;
      let page = this.currentPage
      return temp.slice((page-1)*pageSize,pageSize*page)
    }
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
        // console.log(val)
        let ids = val.map((item)=>{
            return item.id;
        });
        this.ids = ids;
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

      //   let temp = [...res.data]
      //   temp.forEach(item =>{
      //     if(item.status == '使用中'){
      //       item.value = 1;
      //     }else{
      //       item.value = 0;
      //     }
      //   })
      //   setTimeout(()=>{
      //     this.tableData = temp;
      //   },500)
      //   console.log(this.tableData)

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
      // console.log(val)
      //val 是option的value值
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
      // console.log(row)
      let name = row
      if(name.status == '冻结中'){
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        name.status = '使用中'
        console.log(name)
        let res = await saveOrWelfareUpdate(name);

        // this.findAllPro();
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
       
      // console.log(row)
      let name = row
      if(name.status == '使用中'){
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        name.status = '冻结中'
        console.log(name)
        let res = await saveOrWelfareUpdate(name);

        // this.findAllPro();
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
    
  },

  created() {
    this.findAllWelfa()
  },
  mounted() {}
};
</script>
<style scoped>
</style>