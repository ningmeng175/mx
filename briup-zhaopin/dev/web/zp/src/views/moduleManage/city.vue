/*
 * @Author: liuyr 
 * 城市管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mx
 * @Last Modified time: 2019-12-29 09:41:53
 */
<template>
  <div>
    <el-button @click="dialogTableVisible = true" class="butt" type="primary" icon="el-icon-plus" size="mini" round>
      添加城市</el-button>
      <el-dialog title="添加城市" :visible.sync="dialogTableVisible" width="30%">
        <el-form :model="cityform">
          <el-form-item label="城市名称" :label-width="long">
            <el-input v-model="cityform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属省份" :label-width="long">
            <el-select v-model="cityform.provinceId" placeholder="请选省份">
              <el-option v-for="(item,index) in ProvinceData" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="toCitySave">确 定</el-button>
        </div>
      </el-dialog>

      <el-button @click="dialogFormVisible = true" class="butt" type="primary" icon="el-icon-plus" size="mini" round>添加省份</el-button>
      <el-dialog title="添加省份" :visible.sync="dialogFormVisible" width="30%"> 
        <el-form :model="Provinceform">
          <el-form-item label="省份名称">
            <el-input v-model="Provinceform.name" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="toProvinceSave()">确 定</el-button>
        </div>
      </el-dialog><br>
      
      <div>
      <el-table :data="ProvinceData">
        <el-table-column  type="expand" prop="city">
          <template slot-scope="scope" >
            <el-table  :data="scope.row.city" >
              <el-table-column prop="name" label="城市"  align="left">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="play"  label="操作" align="right" >
                <template slot-scope="scope">
                    <el-button  @click="deletecity(scope.row.id)"  type="success" size="mini" icon="el-icon-delete" circle></el-button>
                  </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
          <el-table-column prop="name" label="省份"  align="left" >
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
          </el-table-column>
        <el-table-column fixed="right" align="right"  label="操作">
          <template slot-scope="scope">
              <el-button  @click="deleteProvince(scope.row.id)"  type="primary" size="mini" icon="el-icon-delete" circle>  
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { findAllCity,findCityByProvinceId,saveOrUpdateCity,deleteCityById } from "@/api/city.js";
import { findAllProvince,saveOrUpdateProvince,deleteProvinceById } from "@/api/Province.js";
import { async } from 'q';
export default {
  data() {
    return {
      activeName:"1",
      input:"",
      ProvinceData:[],
      cityData:[],
      long:"120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      Provinceform: {
          name: '',
        },
      cityform: {
           provinceId:'',
           name: '',
        },

    };
  },
  computed: {},
  methods: {
    //获取信息
    //获取省份信息以及通过城市的省份id获取城市信息
    async findAllPro(page){
      try{
        let res = await findAllProvince();
        // console.log(res.data)
        // this.ProvinceData = res.data;
        let temp = [...res.data];
        temp.forEach(async (item)=>{
          let id = item.id;
          let resp = await findCityByProvinceId({provinceId:id})
          console.log(resp);
          item.city = resp.data;
        })
        setTimeout(()=>{
          this.ProvinceData = temp;
        },500)
      }catch(err){
        this.$notify.error({
          title: "错误",
          message: "1查找失败"
        });
      }
    },
    //获取城市信息
    async findAllCi(page){
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "1查找失败"
        });
      }
    },



    //删除
    //删除省份信息
    deleteProvince(id){
      this.$confirm('是否删除该记录', '提示', {
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
            let res = await deleteProvinceById({id:id});
            if(res.status === 200){
             this.$message({
            type: 'success',
            message: '删除成功!'
             });
             this.findAllPro();
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
    //删除城市信息
    deletecity(id){
      this.$confirm('是否删除该记录', '提示', {
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
            let res = await deleteCityById({id:id});
            if(res.status === 200){
             this.$message({
            type: 'success',
            message: '删除成功!'
             });
             this.findAllPro();
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


    //保存
    //保存新增城市信息
    async toCitySave(){
      console.log(this.cityform)
      let name = this.cityform
      try{
      let res = await saveOrUpdateCity(name);
      console.log(res);
      this.dialogTableVisible = false;
      this.findAllPro()
      this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
      }catch(err){
        console.log(err)
        }
      },

    //保存新增省份信息
    async toProvinceSave(){
      console.log(this.Provinceform.name)
      let name = this.Provinceform.name
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await saveOrUpdateProvince({name:name});
        console.log(res)
        this.dialogFormVisible = false,
        this.findAllPro();
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

  },
  created() {
    this.findAllCi();
    this.findAllPro();
    // this.findByProvinceIdtoCi();
    // this.addProvince();
    
  },
  mounted() {}
};
</script>
<style scoped>
.butt{
  float: right;
}
</style>