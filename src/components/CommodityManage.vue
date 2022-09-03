<template>
  <div>
  <el-tabs type="border-card" style="margin-top:20px;">
    <el-tab-pane >
      <span slot="label"><i class="el-icon-date"></i> 商店商品</span>

      <el-table :data="tableData">
        <el-table-column prop="id" label="ID号" >
        </el-table-column>

        <el-table-column prop="createTime" label="发表时间">
        </el-table-column>

        <el-table-column prop="name" label="名称">
        </el-table-column>

        <el-table-column prop="breed" label="品种">
        </el-table-column>

        <el-table-column prop="price" label="价格(￥)" >
        </el-table-column>

        <el-table-column prop="number" label="库存">
        </el-table-column>

      
        

        <el-table-column 
        prop="categoryName" 
        label="所属分类"
        :filters="[{ text: '狗狗', value: '狗狗' }, { text: '猫咪', value: '猫咪' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.categoryName === '狗狗' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.categoryName}}</el-tag>
        </template>
          
        </el-table-column>

        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="editCommodity(scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteCommodity(scope.row)">Delete</el-button>
          </template>
        </el-table-column>            
      </el-table>

      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
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

      <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

      <el-dialog title="商品修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules"  ref="form" >
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" :label-width="formLabelWidth">
          <el-select v-model="form.categoryName" placeholder="请选择商品类别">
            <el-option label="猫咪" value="1"></el-option>
            <el-option label="狗狗" value="2"></el-option>
            <el-option label="金鱼" value="3"></el-option>
            <el-option label="仓鼠" value="4"></el-option>
            <el-option label="宠物周边" value="5"></el-option>
            <el-option label="宠物食物" value="6"></el-option>
            <el-option label="宠物洗护" value="7"></el-option>
            <el-option label="宠物医疗" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品视频" :label-width="formLabelWidth">
          <el-input v-model="form.videoUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="疫苗证书" :label-width="formLabelWidth">
          <el-select v-model="form.vaccin" placeholder="请选择">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="2"></el-option>
            <el-option label="不是宠物" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="血统证书" :label-width="formLabelWidth">
          <el-select v-model="form.isPedigree" placeholder="请选择">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="2"></el-option>
            <el-option label="不是宠物" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驱虫证书" :label-width="formLabelWidth">
          <el-select v-model="form.isPest" placeholder="请选择">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="2"></el-option>
            <el-option label="不是宠物" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宠物种类" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
      </el-dialog>

  </el-tabs>
      
  </div>
</template>

<script>
import {instance} from '../network/index.js'
export default {
  data(){
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return{
      tableData:null,
      pageInfo:{
        _currentPage:1,
        pageSize:3
      },
      total:null,
      dialogFormVisible: false,
      form: {
        name: '',
        price: '',
        description: '',
        category: '',
        number:'',
        imgUrl: '',
        videoUrl: '',
        vaccin: '',
        isPedigree:'',
        isPest:'',
        breed:''
      },
      formLabelWidth: '120px',
      rules: {
          // pass: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // checkPass: [
          //   { validator: validatePass2, trigger: 'blur' }
          // ],
        price: [
          { validator: checkPrice, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    filterTag(value, row) {
      return row.categoryName === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    rawPage(){
      let _this = this
      instance.post('/commodity/backendPageQuery',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data.data      
      },response=> {
        alert("第一页请求失败！");
      })
    },

    toPage(currentPage){
      this.pageInfo._currentPage = currentPage;
      let _this = this
      instance.post('/commodity/backendPageQuery',this.pageInfo)
      .then(function(response){
        _this.tableData = response.data.data
      },response=> {
        alert("请求失败！");
      })
    },

    getRow(){
      let _this = this;
      instance.post('/commodity/backendGetRow')
      .then(function(response){
        _this.total = response.data.data;
      }),response=> {
        alert("数据行数请求失败！")
      }
    },
    editCommodity(row){
      if(row.vaccin == 1)
        this.form.vaccin = '有'
      else if(row.vaccin == 2)
        this.form.vaccin = '无'
      else
        this.form.vaccin = '不是宠物'
      
      if(row.isPedigree == 1)
        this.form.isPedigree = '有'
      else if(row.isPedigree == 2)
        this.form.isPedigree = '无'
      else
        this.form.isPedigree = '不是宠物'
      
      if(row.isPest == 1)
        this.form.isPest = '有'
      else if(row.isPest == 2)
        this.form.isPest = '无'
      else
        this.form.isPest = '不是宠物'

      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.price = row.price;
      this.form.description = row.description;
      this.form.category = row.category;
      this.form.imgUrl = row.imgUrl;
      this.form.videoUrl = row.videoUrl;
      this.form.breed = row.breed;
    },

    deleteCommodity(row){
      let _this = this
        this.$confirm('此操作将永久删除'+row.name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          //当点击确定，就会进入到then里的回调函数，然后就可以执行删除操作，最后通过回滚让页面重定向
        }).then(() => {
            instance.delete('/commodity/backendDelete/'+row.id).then(function(response) {
              if(response.data === 200){
                //删除成功后，在进入一个新的then回调函数，则弹窗提示用户删除成功
                _this.$alert(row.name+'删除成功！','删除数据',{
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
    this.rawPage();
  },
  mounted(){
    this.getRow()
  }

}
</script>

<style>

</style>