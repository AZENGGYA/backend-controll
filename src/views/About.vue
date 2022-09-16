<template>
  <div class="about">

    <el-container style="height: 600px; margin-top:0px;border: 1px solid #eee;">
      <!-- 顶部 -->
      <el-header style="text-align: right; font-size: 12px;background-color:#3C8CBD;box-shadow:12px 15px 10px -15px #000">
          <span style="color:white;float:left;font-size:25px;margin-left:10px;">宠可梦管理平台</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>曾思恒</span>
        </el-header>
        
        
    <!-- 下方部分 -->
    <el-container style="max-height:600px;">
      <!-- 左部导航栏 -->
      <el-aside width="200px" style="background-color: #ECECEC">
        <el-menu
          :default-active="$route.path"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          background-color="#545c64"
      text-color="#fff"
      active-text-color="#38A3F7"
      style="height: 100%"
          >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商店管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分级</template>
                
                  <el-menu-item index="/main">商品管理</el-menu-item>

                  <!-- <el-menu-item index="/addshop"

                  :disabled="judge_status"
                    >
                    新增商店
                  </el-menu-item> -->
            </el-menu-item-group>
            
          </el-submenu>

          
         
            <el-menu-item index="/crm" >
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
     
          


          
            <el-menu-item index="/ordermanage" >
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
        

        
            <el-menu-item index="/datastatistics">
              <i class="el-icon-setting"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
         

        </el-menu>


      </el-aside>
      
      <!-- 主要内容区域 -->
      <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to='/main'>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
            
            <router-view/>

        </el-main>

    </el-container>  
      
        
      
    </el-container>
    
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-menu-item.is-active {
   /* background-color: white !important; 无论怎么设置css都无法覆盖颜色，这时可以使用!important。 */
   border-left-color:black;
   
 }

</style>

<script>
  export default {
    data(){
      return{
        status : -2
      }
    },
    methods: {
      handleSelect(data){
        this.$router.push({path:data})
      },
      
    },
    created(){
      if(this.status == -2){
        this.judge_status = false;
      }else{
        this.judge_status = true;
      }
    }
    
  };
</script>
