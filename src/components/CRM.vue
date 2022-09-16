<template>
  <div>
  <el-tabs type="border-card" style="margin-top:20px;">
    <el-tab-pane >
      <span slot="label"><i class="el-icon-date"></i> 用户管理</span>

      <el-table :data="tableData">
        <el-table-column prop="id" label="ID号" >
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" >
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="money" label="积分">
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editUser(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>  
      </el-table>
      <el-pagination
        background
        layout="total, sizes,prev, pager, next, jumper"
        :total="total"
        :page-size="this.pageInfo.pageSize"
        @current-change="toPage"
        style="float:right;margin-top:20px"
        :page-sizes="[3, 5, 10]"
        @size-change="handleSizeChange"
        >
      </el-pagination>
      

      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-grid"></i>审核会员申请</span>
        <el-table :data="tableData2">
        <el-table-column prop="id" label="ID号" >
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" >
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="money" label="积分">
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="agreeApply(scope.row)">同意</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="disagressApply(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>  
      </el-table>
      <el-pagination
        background
        layout="total, sizes,prev, pager, next, jumper"
        :total="total2"
        :page-size="this.pageInfo2.pageSize"
        @current-change="toPage2"
        @size-change ="handleSizeChange2"
        :page-sizes="[3,5,10]"
        style="float:right;margin-top:20px"
        >
      </el-pagination>
        

      </el-tab-pane>


      <el-dialog title="用户修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules"  ref="form" >
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model.number="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户积分" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" :label-width="formLabelWidth">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="会员用户" value="1"></el-option>
            <el-option label="管理员" value="-1"></el-option>
            <el-option label="会员申请中" value="2"></el-option>
          </el-select>
        </el-form-item>


        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUser('form')" :disabled="flag">确 定</el-button>
      </div>
      </el-dialog>

      

  </el-tabs>
      
  </div>
</template>

<script>
import {instance} from '../network/index.js'
export default {
    data(){
    return{
      tableData:null,
      tableData2:null,
      flag:false,
      pageInfo:{
        _currentPage:1,
        pageSize:5
      },
      pageInfo2:{
        _currentPage:1,
        pageSize:3
      },
      total:null,
      total2:null,
      dialogFormVisible: false,
      form: {
        id: '',
        username: '',
        telephone: '',
        nickname: '',
        email: '',
        state: '',
        money: '',
      },
      formLabelWidth: '120px',
      
    }
  },
  methods:{
    getRow(){
      let _this = this;
      instance.post('/user/UserGetRow')
      .then(function(response){
        
        _this.total = response.data.data;
      }),response=> {
        alert("数据行数请求失败！")
      }
    },
    getRow2(){
      let _this = this;
      instance.post('/user/ApplyGetRow')
      .then(function(response){
        _this.total2 = response.data.data;
      }),response=> {
        alert("数据行数请求失败！")
      }
    },
    rawPage(){
      let _this = this
      instance.post('/user/UserPageQuery',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data.data
      },response=> {
        alert("第一页请求失败！");
      })
    },
    rawPage2(){
      let _this = this
      instance.post('/user/getApply',this.pageInfo2)
      .then(function(response){
        _this.tableData2 = response.data.data
      },response=> {
        alert("第一页请求失败！");
      })
    },
    toPage(currentPage){
      this.pageInfo._currentPage = currentPage;
      let _this = this
      instance.post('/user/UserPageQuery',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data.data
      },response=> {
        alert("请求失败！");
      })
    },
    toPage2(currentPage){
      this.pageInfo2._currentPage = currentPage;
      let _this = this
      instance.post('/user/getApply',this.pageInfo2)
      .then(function(response){
        _this.tableData2 = response.data.data
      },response=> {
        alert("请求失败！");
      })
    },
    editUser(row){
      if(row.state == 0){
        this.form.state = '普通用户'
        this.flag = false
      }
      else if(row.state == 1){
        this.form.state = '会员用户'
        this.flag = false
      }
      else if(row.state == -1){
        this.form.state = '管理员'
        this.flag = true
        alert("不允许管理员修改管理员数据")
      }
      else if(row.state == 2)
      {
        this.flag = false
        this.form.state = '会员申请中'
      }
        
      this.dialogFormVisible = true;
      
      this.form.username = row.username;
      this.form.nickname = row.nickname;
      this.form.telephone = row.telephone;
      this.form.email = row.email;
      this.form.money = row.money;
      this.form.id = row.id;
    },
    agreeApply(row){
      let _this = this
      this.form.username = row.username;
      this.form.nickname = row.nickname;
      this.form.telephone = row.telephone;
      this.form.email = row.email;
      this.form.money = row.money;
      this.form.id = row.id;
      this.form.state = '1';
      instance.post('/user/update',this.form)
      .then(function(response){
            if(response.data.code == 200){              
                  _this.dialogFormVisible = false;
                  _this.tableData = response.data.data
                  _this.$router.go(0)
                  _this.$message({
                    message: '审核成功',
                    type: 'success'
                  });                
            }
            else
            alert('审核失败')
      })
    },
    disagressApply(row){
      let _this = this
      this.form.username = row.username;
      this.form.nickname = row.nickname;
      this.form.telephone = row.telephone;
      this.form.email = row.email;
      this.form.money = row.money;
      this.form.id = row.id;
      this.form.state = '0';
      instance.post('/user/update',this.form)
      .then(function(response){
            if(response.data.code == 200){              
                  _this.dialogFormVisible = false;
                  _this.tableData = response.data.data
                  _this.$router.go(0)
                  _this.$message({
                    message: '取消成功',
                    type: 'success'
                  });                
            }
            else
            alert('审核失败')
      })
    },
    changeUser(form2){
      let _this = this
      this.$refs[form2].validate((valid) => {
        if (valid) {
          instance.post('/user/update',this.form)
          .then(function(response){
            if(response.data.code == 200){              
                  _this.dialogFormVisible = false;
                  _this.tableData = response.data.data
                  _this.$router.go(0)
                  _this.$message({
                    message: '恭喜你，修改成功',
                    type: 'success'
                  });                
            }
      }),response=> {
        alert("修改失败！")
      }
          } else {
            return false;
          }
      });
    },
    deleteUser(row){
      let _this = this
      
        this.$confirm('此操作将永久删除'+row.username+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          //当点击确定，就会进入到then里的回调函数，然后就可以执行删除操作，最后通过回滚让页面重定向
        }).then(() => {
            if(row.state == -1){_this.$alert('不能删除管理员账号')}
            else{
              instance.delete('/user/UserDelete/'+row.id).then(function(response) {
              if(response.data === 200){
                //删除成功后，在进入一个新的then回调函数，则弹窗提示用户删除成功
                _this.$alert(row.username+'删除成功！','删除数据',{
                  confirmButtonText:'确定',
                  callback:action => {
                    //页面回滚 === 刷新
                    location.reload()
                  }
                });
              }
            })
            }
          //如果在删除页面取消删除，则会进入改回调函数显示取消删除
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleSizeChange(size){
      this.pageInfo.pageSize = size;
      let _this = this
      instance.post('/user/UserPageQuery',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data.data
      },response=> {
        alert("请求失败！");
      })
    },
    handleSizeChange2(size){
      this.pageInfo2.pageSize = size;
      let _this = this
      instance.post('/user/getApply',this.pageInfo2)
      .then(function(response){
        _this.tableData2 = response.data.data
      },response=> {
        alert("请求失败！");
      })
    },
  },
  created(){
    this.rawPage();
    this.rawPage2();
  },
  mounted(){
    this.getRow()
    this.getRow2()
  }
}
</script>

<style>

</style>