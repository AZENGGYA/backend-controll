<template>
  <div style="background-color:#FDFDFD;height:750px">

    <div style="width:400px;margin:auto;">
      
      <el-card shadow="always" >
        <span style="font-family:微软雅黑;font-size:20px;font-weight:bold;">登录页面</span>
        <div style="margin: 30px;"></div>
        <el-form  label-position="right" status-icon  label-width="100px" style="float:left">
          <el-form-item label="用户名">
           <el-input v-model="userlogin.username" placeholder="请输入账号" ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userlogin.password" placeholder="请输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item style="margin-top:-20px;margin-left:-120px">
            <el-checkbox checked=true>记住密码</el-checkbox>
          </el-form-item>

          <el-form-item style="margin-top:-10px">
            <el-button type="primary" icon="el-icon-search" @click="login"  style="margin-left:-30px;">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return{
      userlogin:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      let _this = this
      this.$axios.post('/user/login',this.userlogin)
      .then(function(response){
        if(response.data.code === 200){
          localStorage.setItem('token',JSON.stringify(response.data.data.token));
        
          _this.$router.push("/about")
        }else{
          alert("登录失败！失败！");
        }
      },response=> {
      alert("请求失败！");
    })
    },
  }
}
</script>
<style scoped>
  .el-card{
    height:300px;
    border-radius: 10px;
  }
  .el-card.is-always-shadow{
    box-shadow: 10 20px 20px 0 rgba(0,0,0,.1);
  }
  
</style>
