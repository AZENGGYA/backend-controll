<template>
  <div>
  <el-tabs type="border-card" style="margin-top:20px;">
    <el-tab-pane >
      <span slot="label"><i class="el-icon-date"></i> 我的行程</span>

      <el-table :data="tableData">
        <el-table-column prop="article_id" label="ID号" width="140">
        </el-table-column>

        <el-table-column prop="article_date" label="发表时间" width="140">
        </el-table-column>

        <el-table-column prop="article_name" label="标题" width="120">
        </el-table-column>

        <el-table-column prop="article_author" label="作者">
        </el-table-column>

        <el-table-column prop="article_type" label="所属分类">
        </el-table-column>

        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="editArticle(scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteArticle(scope.row)">Delete</el-button>
          </template>
        </el-table-column>            
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="this.pageInfo.pageSize"
        @current-change="toPage"
        style="float:right;margin-top:20px"
        >
      </el-pagination>

      </el-tab-pane>

      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
      
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:null,
      pageInfo:{
        _currentPage:1,
        pageSize:3
      },
      total:null
    }
  },
  methods:{
    rawPage(){
      let _this = this
      this.$axios.post('/getinfo',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data
      },response=> {
      alert("文章第一页请求失败！");
    })
    },

    toPage(currentPage){
      this.pageInfo._currentPage = currentPage;
      let _this = this
      this.$axios.post('/getinfo',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data
      },response=> {
        alert("请求失败！");
      })
    },

    getRow(){
      let _this = this;
      this.$axios.post('/getrow')
      .then(function(response){
        _this.total = response.data;
      }),response=> {
        alert("数据行数请求失败！")
      }
    },

    deleteArticle(row){
      let _this = this
        this.$confirm('此操作将永久删除'+row.article_name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          //当点击确定，就会进入到then里的回调函数，然后就可以执行删除操作，最后通过回滚让页面重定向
        }).then(() => {
            this.$axios.delete('/delete/'+row.article_id).then(function(response) {
              if(response.data === true){
                //删除成功后，在进入一个新的then回调函数，则弹窗提示用户删除成功
                _this.$alert(row.article_name+'删除成功！','删除数据',{
                  confirmButtonText:'确定',
                  callback:action => {
                    //页面回滚 === 刷新
                    location.reload()
                  }
                });
              }
            })
          //如果在删除页面取消删除，则会进入改回调函数显示取消删除
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    editArticle(row){
      this.$router.push('/editarticleinfo?article_id='+row.article_id)
    }
  },
  
  created(){
    this.rawPage()
  },
  mounted(){
    this.getRow()
  }

}
</script>

<style>

</style>