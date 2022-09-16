<template>
  <div style="margin-top:20px;">
    <el-dialog  title="订单详情"
      :visible.sync="dialogVisible2"
      width="30%">
      <el-steps :active="active" align-center>
        <el-step title="步骤1" description="审核退单理由"></el-step>
        <el-step title="步骤2" description="确定是否为该用户退单"></el-step>       
        <el-step title="步骤3" description="审核完成"></el-step>     
      </el-steps>

      <el-descriptions  direction="vertical" :column="3" border v-if="active == 0? true:active == 1? true:false" style="margin-top:20px">
          <el-descriptions-item label="订单号">{{examineOrderForm.id}}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{examineOrderForm.userName}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{examineOrderForm.userPhone}}</el-descriptions-item>
          <el-descriptions-item label="收货地址" :span="2">{{examineOrderForm.userAddress}}</el-descriptions-item>   
          <el-descriptions-item label="订单总金额">{{examineOrderForm.totalAmount}}</el-descriptions-item>          
          <el-descriptions-item label="退单原因" >{{examineOrderForm.reason}}</el-descriptions-item>
      </el-descriptions>

      
         
            <div style="margin-top:20px;margin-right:5px; display:inline-block;" 
                v-if="active == 1? true:false">    
              <el-popover
                placement="top"
                width="160"
                v-model="visible_refute">
                <p>确定拒予退单吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible_refute = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="examineOrderResult(false)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" round>拒绝</el-button>
              </el-popover>     
            </div>
       

  
          
            <div style="margin-top:20px;margin-left:5px; display:inline-block;" 
                v-if="active == 1? true:false">    
              <el-popover
                placement="top"
                width="160"
                v-model="visible_approval">
                <p>确定批准退单吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible_approval = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="examineOrderResult(true)">确定</el-button>
                </div>
                <el-button slot="reference" type="success" round>通过</el-button>
              </el-popover>     
            </div>
          
          

     

      <el-result icon="success" title="成功提示" subTitle="审核完成！" v-if="active == 2 ? true:false">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="dialogVisible2 = false">关闭</el-button>
        </template>
      </el-result>
    

      <el-button style="margin-top: 12px;float:bo" @click="next" v-if="active == 0 ? true:false">下一步</el-button>  

    

    </el-dialog>


    <el-dialog     
      title="订单详情"
      :visible.sync="dialogVisible"
      width="30%"
      >
        <el-descriptions  direction="vertical" :column="3" border >
          <el-descriptions-item label="订单号">{{orderInfoForm.id}}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{orderInfoForm.createTime}}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{orderInfoForm.userName}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{orderInfoForm.userPhone}}</el-descriptions-item>
          <el-descriptions-item label="收货地址" :span="2">{{orderInfoForm.userAddress}}</el-descriptions-item>
          <el-descriptions-item label="订单状态">
            <el-tag size="small">{{
                        orderInfoForm.status == 0
                        ? "待支付"
                        : orderInfoForm.status == 1
                        ? "待发货"
                        : orderInfoForm.status == 2
                        ? "待收货"
                        : orderInfoForm.status == 3
                        ? "待评价"
                        : orderInfoForm.status == 4
                        ? "已完成"
                        : orderInfoForm.status == -1
                        ? "订单已取消"
                        : orderInfoForm.status == -2
                        ? "申请退单"
                        : orderInfoForm.status == -3  
                        ? "退单成功"
                        : orderInfoForm.status == -4
                        ? "退单成功"
                        : "订单状态异常"
                    }}                    </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="订单总金额">{{orderInfoForm.totalAmount}}</el-descriptions-item>          
          <el-descriptions-item label="退单原因" v-if="orderInfoForm.status == -2 ? true : false">{{orderInfoForm.reason}}</el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    

    <el-tabs v-model="activeName" >
      <el-tab-pane label="所有订单管理" name="first"  >
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select" style="width:30%;float:left">
          <el-button slot="append" icon="el-icon-search" @click="searchOrder()"></el-button>
        </el-input>

        <el-table
        :data="tableData"  
        style="width: 100%">
          <el-table-column
          
              prop="id"
              label="订单编号"
              width="180">
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="创建日期"
            width="200">
          </el-table-column>

          

          <el-table-column
              prop="totalAmount"
              label="订单价格"
              width="200">
          </el-table-column>

          
          <el-table-column
            prop="userName"
            label="用户名"
            width="200">
          </el-table-column>

          <el-table-column
            prop="userAddress"
            label="地址"
             width="200">
          </el-table-column>

          <el-table-column
              prop="date"
              label="支付状态"
              width="180">
                <template slot-scope="scope">
                    <el-tag 
                    size="medium"
                    :type="scope.row.status > 0 
                           ? 'success' 
                           :scope.row.status == -2
                           ? 'success' : 'danger' 
                           "
                    >
                    {{
                        scope.row.status > 0
                        ? "已付款"
                        : scope.row.status == -2
                        ? "已付款" : "未付款"                       
                    }}
                    </el-tag>
                </template>
          </el-table-column>

          <el-table-column
              prop="date"
              label="订单状态"
              width="180">
              <template slot-scope="scope">
                    <el-tag 
                    size="medium"
                    :type="
                    scope.row.status == 4 
                    ?  'success' 
                    : scope.row.status == -3
                    ?  'warning'
                    : scope.row.status == -4
                    ? 'warning'
                    : 'danger' "
                    >
                    {{
                        scope.row.status == 0
                        ? "待支付"
                        : scope.row.status == 1
                        ? "待发货"
                        : scope.row.status == 2
                        ? "待收货"
                        : scope.row.status == 3
                        ? "待评价"
                        : scope.row.status == 4
                        ? "已完成"
                        : scope.row.status == -1
                        ? "订单已取消"
                        : scope.row.status == -2
                        ? "申请退单"
                        : scope.row.status == -3  || -4
                        ? "退单成功"
                        : "订单状态异常"
                    }}                    
                    </el-tag>
                </template>
          </el-table-column>

          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
              style="margin-left: 0;margin-right:10px"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                v-if="scope.row.status == 1 ? true:false"                                         
                @click="delivery(scope.$index, scope.row)">发货</el-button>
                <el-button
                style="margin-left: 0;margin-right:10px;margin-top:5px"
                size="mini"
                type="warning"
                icon="el-icon-circle-close"
                v-if="scope.row.status ==  0 
                      ? true
                      : scope.row.status == 1
                      ? true
                      : false"                                         
                @click="cancelOrder(scope.$index, scope.row)">取消订单</el-button>
              <el-button
                style="margin-left: 0 ;margin-right:10px;margin-top:5px"
                size="mini"
                icon="el-icon-delete"
                v-if="                   
                      scope.row.status == -2
                      ? true : false"  
                type="danger"
                @click="examineOrder(scope.$index, scope.row)">申请退单</el-button>

                <el-button
                style="margin-left: 0 ;margin-right:10px;margin-top:5px"
                size="mini"
                icon="el-icon-delete"
                v-if="
                      scope.row.status == 3
                      ? true : false"  
                type="danger"
                @click="directCB(scope.$index, scope.row)">直接退单</el-button>

              <el-button
                style="margin-left: 0;margin-right:10px;margin-top:5px"
                size="mini"
                
                type="info" icon="el-icon-info"
                @click="orderInfo(scope.$index, scope.row)">订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination
          background
          :page-size="this.pageInfo.pageSize"
          @current-change="toPage"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          style="float:right;margin-top:20px">
          </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="订单退单申请" name="second">
        <!-- <el-input placeholder="请输入内容" v-model="search_chargeback" class="input-with-select" style="width:30%;float:left">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->

        <el-table
        :data="chargeBackData"  
        style="width: 100%">
          

          <el-table-column
          
              prop="id"
              label="订单编号"
              width="200">
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="创建日期"
            width="200">
          </el-table-column>

         

          <el-table-column
              prop="totalAmount"
              label="订单价格"
              width="200">
          </el-table-column>

          
          <el-table-column
            prop="userName"
            label="用户名"
            width="200">
          </el-table-column>

          <el-table-column
            prop="userAddress"
            label="地址"
            width="200">
          </el-table-column>

          <el-table-column
              prop="date"
              label="支付状态"
              width="180">
                <template slot-scope="scope">
                    <el-tag 
                    size="medium"
                    :type="scope.row.status > 0 
                           ? 'success' 
                           : scope.row.status == -2
                           ? 'success'
                           : 'danger'" 
                    >
                    {{
                        scope.row.status > 0
                        ? "已付款"
                        : scope.row.status == -2
                        ? "已付款" : "未付款"                       
                    }}
                    </el-tag>
                </template>
          </el-table-column>

          <el-table-column
              prop="date"
              label="订单状态"
              width="180">
              <template slot-scope="scope">
                    <el-tag 
                    size="medium"
                    :type="

                    scope.row.status == 4 
                    ?  'success' 
                    : scope.row.status == -3
                    ?  'warning'
                    : scope.row.status == -4
                    ? 'warning'
                    : 'danger'
                     
                    
                    "
                    >
                    {{
                        scope.row.status == 0
                        ? "待支付"
                        : scope.row.status == 1
                        ? "待发货"
                        : scope.row.status == 2
                        ? "待收货"
                        : scope.row.status == 3
                        ? "待评价"
                        : scope.row.status == 4
                        ? "已完成"
                        : scope.row.status == -1
                        ? "订单已取消"
                        : scope.row.status == -2
                        ? "申请退单"
                        : scope.row.status == -3   
                        ? "退单成功"
                        : scope.row.status == -4
                        ? "退单成功"
                        : "订单状态异常"
                    }}                    
                    </el-tag>
                </template>
          </el-table-column>

          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
              style="margin-left: 0;margin-right:10px"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                v-if="scope.row.status == 1 ? true:false"                                         
                @click="delivery(scope.$index, scope.row)">发货</el-button>
                <el-button
                style="margin-left: 0;margin-right:10px;margin-top:5px"
                size="mini"
                type="warning"
                icon="el-icon-circle-close"
                v-if="scope.row.status ==  0 
                      ? true
                      : scope.row.status == 1
                      ? true
                      : false"                                         
                @click="cancelOrder(scope.$index, scope.row)">取消订单</el-button>
              <el-button
                style="margin-left: 0 ;margin-right:10px;margin-top:5px"
                size="mini"
                icon="el-icon-delete"
                v-if="
                      scope.row.status == 3                      
                      ? true : false"  
                type="danger"
                @click="directCB(scope.$index, scope.row)">直接退单</el-button>
                <el-button
                style="margin-left: 0 ;margin-right:10px;margin-top:5px"
                size="mini"
                icon="el-icon-delete"
                v-if="
                      scope.row.status == -2
                      ? true : false"  
                type="danger"
                @click="examineOrder(scope.$index, scope.row)">申请退单</el-button>
              <el-button
                style="margin-left: 0;margin-right:10px;margin-top:5px"
                size="mini"               
                type="info" icon="el-icon-info"
                @click="orderInfo(scope.$index, scope.row)">订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          :page-size="this.pageInfo.pageSize"
          @current-change="toPage2"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total2"
          style="float:right;margin-top:20px">
          </el-pagination>
          
      </el-tab-pane>

      <el-tab-pane label="待定" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="待定" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>

    
  </div>
</template>

<script>

import {instance} from "../network/index.js"
export default {
  
  data() {
      return {
        visible_refute: false,
        visible_approval:false,
        active:0,
        dialogVisible2:false,
        currentPage:1,
        judgeSearch:false,
        total:null,
        total2:null,
        pageInfo:{
          _currentPage:1,
          pageSize:3
        },
        pageInfo2:{
          _currentPage:1,
          pageSize:3
        },
        dialogVisible: false,
        activeName: 'first',
        tableData: null,
        chargeBackData:null,
        search:null,
        search_chargeback:'',
        deliveryForm:{
          id:null,
          status:null
        },
        cancelOrderForm:{
          id:null,
          status:null,
          userid:null,
          totalAmount:null,
          judgePay:null
        },
        chargeBackForm:{
          id:null,
          status:null,
          userid:null,
          totalAmount:null,
          closeType:null,
          opinion:null
        },
        orderInfoForm:{
          id:null,
          totalAmount:null,
          userName:null,
          userPhone:null,
          userAddress:null,
          createTime:null,
          reason:null
        },
        examineOrderForm:{
          index:null,
          id:null,
          userId:null,
          totalAmount:null,
          userName:null,
          userPhone:null,
          userAddress:null,
          reason:null,
          closeType:null,
          status:null
        }
      }
    },
    methods:{
      next() {
        if (this.active++ > 2) this.active = 0;
      },

      delivery(index, row) {
        this.deliveryForm.id = row.id;
        this.deliveryForm.status = row.status
        this.$confirm('您确定要将该订单进行发货吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let _this = this
          instance.post("/backendorder/deliveryCommodity",this.deliveryForm)
          .then(function(response){
            if(response.data.code == 200){
              row.status = 2
              _this.$message({
                message: '发货成功',
                type: 'success'
              });          
            }
          },response=>{
            alert("错误")
        })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消发货'
          });          
        });
        
      },
       cancelOrder(index, row) {
        this.cancelOrderForm.id = row.id;
        this.cancelOrderForm.status = row.status;
        this.cancelOrderForm.userid = row.userId;
        if(row.status == 1){
          this.cancelOrderForm.totalAmount = row.totalAmount;
          this.cancelOrderForm.judgePay = true
        }
        // else{
        //   this.cancelOrderForm.judgePay = false
        // }
        this.$confirm('您确定取消该订单吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let _this = this
          instance.post("/backendorder/cancelOrder",this.cancelOrderForm)
          .then(function(response){
            if(response.data.code == 200){
              row.status = -1
              _this.$message({
                message: '取消订单成功',
                type: 'success'
              });   
            }
              
          },response=>{
            alert("取消订单错误")
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '不取消该订单'
          });          
        });
      },
      directCB(index, row) {
        this.$prompt('请录入退单理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.+$/,
          inputErrorMessage: '退单理由不能为空'
        }).then(({ value }) => {
          let _this = this
          this.chargeBackForm.id = row.id;
          this.chargeBackForm.status = row.status;
          this.chargeBackForm.userid = row.userId;
          this.chargeBackForm.totalAmount = row.totalAmount;
          this.chargeBackForm.reason = value
          // this.chargeBackData.totalAmount = value
          instance.post("/backendorder/directCB",this.chargeBackForm)
          .then(function(response){
            if(response.data.code == 200){
              row.status = -4;
              _this.$message({
                type: 'success',
                message: '退单成功'
              });
            }
          },response=>{
            alert("退单错误！")
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消录入'
          });       
        });
      },
      examineOrder(index, row){
        this.examineOrderForm = row
        this.examineOrderForm.index = index
        this.dialogVisible2 = true;
      },

      examineOrderResult(judge){
        if(!judge){
          this.visible_refute = false;
          this.chargeBackForm.opinion = false;
          this.chargeBackForm.id = this.examineOrderForm.id;
          this.chargeBackForm.status = this.examineOrderForm.status;
          this.chargeBackForm.closeType = this.examineOrderForm.closeType        
          let _this = this
          instance.post("/backendorder/examineOrder",this.chargeBackForm)
          .then(function(response){
            if(response.data.code == 200){
              _this.tableData[_this.examineOrderForm.index].status = _this.examineOrderForm.closeType;
              _this.tableData[_this.examineOrderForm.index].closeType = null;
              _this.active++;
              _this.$message({
                type: 'success',
                message: '审核完成，拒予退单'
              });
            }
          },response=>{
            alert("退单错误！")
          })
        }else{
          this.visible_approval = false;
          this.chargeBackForm.opinion = true;
          this.chargeBackForm.id = this.examineOrderForm.id;
          this.chargeBackForm.totalAmount = this.examineOrderForm.totalAmount
          this.chargeBackForm.userid = this.examineOrderForm.userId;
          this.chargeBackForm.status = this.examineOrderForm.status;
          this.chargeBackForm.closeType = this.examineOrderForm.closeType          
          let _this = this
          instance.post("/backendorder/examineOrder",this.chargeBackForm)
          .then(function(response){
            if(response.data.code == 200){
              _this.tableData[_this.examineOrderForm.index].status = -3;
              _this.tableData[_this.examineOrderForm.index].closeType = _this.examineOrderForm.closeType;
              _this.active++;
              _this.$message({
                type: 'success',
                message: '审核完成，允许退单'
              });
            }
          },response=>{
            alert("退单错误！")
          })         
        }
      },

      rawAllOrder(){
        let _this = this
        instance.post('/backendorder/getAllOrder',this.pageInfo)
        .then(function(response){
          if(response.data.code == 200){
            _this.tableData = response.data.data
            
          }
        }),response=>{
          alert("数据行数请求失败！")
        }
        /* 请求退单申请数据 */
        
        instance.post('/backendorder/getChargeBack',this.pageInfo2)
        .then(function(response){
          if(response.data.code == 200){
            _this.chargeBackData = response.data.data
          }
        }),response=>{
          alert("数据行数请求失败！")
        }
          
      },
      
      orderInfo(Index,row){
        this.dialogVisible = true;
        this.orderInfoForm = row;
      },

      searchOrder(){
        if(!this.judgeSearch)
          this.judgeSearch = true;       
        let _this = this;
        this.pageInfo._currentPage = 1;
        this.currentPage = 1;
        if(this.search != null && this.search !=''){
          instance.post("/backendorder/searchOrder",{search:this.search,pageInfo:this.pageInfo})
          .then(function(response){
            if(response.data.code == 200){
              _this.tableData = response.data.data
              if(_this.tableData != ''){          
                _this.total = _this.tableData[0].searchTotal               
              }else{
                _this.total = 0;
              }
            }
          },response=>{
            alert("搜索失败")
          })
        }else{
          this.judgeSearch = false;
          this.rawAllOrder();
          this.getCount();  
        }
      },

      getCount(){
        let _this = this;
        instance.post("/backendorder/getCount")
          .then(function(response){
            if(response.data.code == 200){
              _this.total = response.data.data
            }
          },response=>{
            alert("搜索失败")
          })
      },
      getChargeBackCount(){
        let _this = this;
        instance.post("/backendorder/getChargeBackCount")
          .then(function(response){
            if(response.data.code == 200){
              _this.total2 = response.data.data
            }
          },response=>{
            alert("搜索失败")
          })
      },

      toPage(currentPage){
        let _this = this
        if(!this.judgeSearch){
          this.pageInfo._currentPage = currentPage;
          instance.post('/backendorder/getAllOrder',this.pageInfo)
          .then(function(response){
            if(response.data.code == 200){
              _this.tableData = response.data.data
            }
          }),response=>{
            alert("数据行数请求失败！")
          }
        }else{
          this.pageInfo._currentPage = currentPage;
          if(!this.judgeSearch)
            this.judgeSearch = true;       
          let _this = this;
          if(this.search != null && this.search !=''){
            instance.post("/backendorder/searchOrder",{search:this.search,pageInfo:this.pageInfo})
            .then(function(response){
              if(response.data.code == 200){
                _this.tableData = response.data.data
                if(_this.tableData != ''){          
                  _this.total = _this.tableData[0].searchTotal               
                }else{
                  _this.total = 0;
                }
              }
            },response=>{
              alert("搜索失败")
            })
          }else{
            this.judgeSearch = false;
            this.rawAllOrder();
            this.getCount();  
          }
        }
      },
      toPage2(currentPage){
        let _this = this
        this.pageInfo2._currentPage = currentPage;
        instance.post('/backendorder/getChargeBack',this.pageInfo2)
        .then(function(response){
          if(response.data.code == 200){
            _this.chargeBackData = response.data.data
          }
        }),response=>{
          alert("数据行数请求失败！")
        }
      }
    },

    created(){
      this.rawAllOrder();
      this.getCount();
      this.getChargeBackCount()
    }
}
</script>

<style>

</style>