<template>
<div style="margin:0 auto;max-width:680px;">
  <h1>编辑界面</h1>
  <el-form ref="form" :rules="rules" :model="articleInfo" label-width="80px" style="width: 600px">

    <el-form-item label="ID号" prob="article_id">
      <el-input v-model="articleInfo.article_id" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="发表时间" prop="article_date">
      <el-input v-model="articleInfo.article_date" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="标题" prop="article_name">
      <el-input v-model="articleInfo.article_name"></el-input>
    </el-form-item>

    <el-form-item label="作者" prop="article_author">
      <el-input v-model="articleInfo.article_author"></el-input>
    </el-form-item>

    <el-form-item label="所属分类" prop="article_type">
      <el-input v-model="articleInfo.article_type"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
      <el-button @click="onCancel()">返回</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      articleInfo: {
      },
      //校验规则，详情了解element-ui，因为我也不是很懂
      rules:{
        //required是非空校验规则
        //required: true是必填项，如果不填，message会直接显示出来
        //trigger表示什么时候触发，blur表示当光标离开的时候就触发该校验
        //整个流程就是，当你点击立刻修改(光标离开该输入框 'blur') 则立刻进行非空校验，若为空，则显示message
        
        //type是类型校验规则，很容易明白，不为数字就触发该校验
        article_name:[
          { required: true, message: '请输入文章标题', trigger: 'blur' },
        ],
        article_author:[
          { required: true, message: '请输入文章作者', trigger: 'blur' }
        ],
        article_type:[
          { required: true, message: '请输入文章类型', trigger: 'blur' },
        ]
      }
    }
  },
  //在Table页面点击编辑按钮后，利用路由跳转到该界面，获取到传递的参数sno，然后利用该sno去调用后端查询方法，最后拿到指定sno的用户的数据
  created() {
    let article_id = this.$route.query.article_id
    let _this = this
    this.$axios.get('/find/'+article_id).then(function (response) {
      _this.articleInfo = response.data
    })
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this
          this.$axios.put('/update',this.articleInfo).then(function (response) {
            if(response.data){
              _this.$alert(_this.articleInfo.article_name+'修改成功！', '修改数据', {
                confirmButtonText: '确定',
                //若不执行立刻修改事件，则回滚到/table页面
                callback: action => {
                  //跳转到/table
                  _this.$router.push('/main')
                }
              });
            }
          })
        }
      });
    },
    //返回table页
    onCancel(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>