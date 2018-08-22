// 订单管理
<template>
  <div class="order_management">
    <crumbs>订单管理</crumbs>
    <div class="order_body">
        <!-- 头部 -->
        <div class="public_header">订单管理</div>
        <!-- 搜索框 -->
        <div class="public_search">
          <input type="text" placeholder="请输入订单号、邮箱账号、用户名等信息查询">
          <img src="~@/assets/img/main/search.png" alt="">
        </div>
        <!-- 筛选条件部分 -->
        <div class="filter_box">
          <div class="row">
            <ul class="col-md-11 choose_time">
              <li class="special_item">下单时间</li>
              <li>
                <datepicker format="yyyy-MM-dd" :language="zh" placeholder="选择日期">
                  <span slot="afterDateInput" class="animated-placeholder">
                    <img src="~@/assets/img/main/date.png" alt="">
                  </span>
                </datepicker>
              </li>
              <li class="special_item">
                ——
              </li>
              <li>
                <datepicker format="yyyy-MM-dd" :language="zh" placeholder="选择日期">
                  <span slot="afterDateInput" class="animated-placeholder">
                    <img src="~@/assets/img/main/date.png" alt="">
                  </span>
                </datepicker>
              </li>
            </ul>
            <div class="col-md-1 refresh_box">
              <img src="~@/assets/img/main/refresh.png" alt="">
            </div>
          </div>
          <ul class="choose_item">
              <li class="item_title">订单状态</li>
              <li>
                <span :class="{'activeItem':activeState == '待发货'}">待发货</span>
              </li>
              <li>
                <span :class="{'activeItem':activeState == '待收货'}">待收货</span>
              </li>
              <li>
                <span :class="{'activeItem':activeState == '已完成'}">已完成</span>
              </li>
          </ul>
        </div>
        <!-- 表格部分 -->
        <div class="public_table">
          <div class="table_header">所有订单</div>
          <table class="table">
            <thead>
              <tr>
                <td class="text-center">序号</td>
                <td class="text-center">订单号</td>
                <td class="text-center">下单时间</td>
                <td class="text-center">订单状态</td>
                <td class="text-center">用户名</td>
                <td class="text-center">操作</td>
              </tr>
            </thead>
            <tbody v-if="orderList.length > 0">
              <tr v-for="(orderInfo, index) in orderList" :key="orderInfo._id">
                <td class="text-center check_td">
                  <b-form-checkbox id="checkbox1" v-model="status" value="accepted" unchecked-value="not_accepted" class="check_box"></b-form-checkbox>
                  {{index+1}}
                </td>
                <td class="text-center" @click="showDetails(orderInfo._id)">{{orderInfo._id}}</td>
                <td class="text-center">2018-12-11 12:22</td>
                <td class="text-center">
                  <span class="state_one">待发货</span>
                  <!-- <span class="state_two">待收货</span> -->
                  <!-- <span>已完成</span> -->
                </td>
                <td class="text-center" v-if="orderInfo.customer !== null">{{orderInfo.customer.name}}</td>
                <td class="text-center" v-if="orderInfo.customer == null">无</td>
                <td class="text-center">
                  <button class="confirm_delivery" @click="showModal">确认发货</button>
                  <!-- <button class="cofirm_receipt">确认收货</button> -->
                  <!-- <button class="cofirm_receipt" @click="alertModal('doing')">运输中</button> -->
                  <!-- <button class="finished" @click="alertModal('did')">已完成</button> -->
                </td>
              </tr>
            </tbody>
            <tbody v-if="orderList.length == 0">
              <tr>
                <td colspan="6" class="no_data">
                  暂无订单
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页部分 -->
        <div class="paginationBox shadowDiv row">
            <div class="col-md-2 allCheck_box col-sm-12">
                <b-form-checkbox id="allCheck"
                     v-model="status"
                     value="accepted"
                     unchecked-value="not_accepted">
                     全选
                </b-form-checkbox>
            </div>
            <div class="col-md-10 col-sm-12">
                <ul class="pageList">
                    <li>
                        共
                        <span class="num">2</span>
                        页
                        <span class="num">/</span>
                        <span class="num">10</span>
                        条数据
                    </li>
                    <li class="borderBox clickBox">首页</li>
                    <li class="borderBox clickBox">上一页</li>
                    <li class="borderBox">1 / 2</li>
                    <li class="borderBox clickBox">下一页</li>
                    <li class="borderBox clickBox">尾页</li>
                    <li class="clickBox singleBorder" style="padding:0 10px!important;">跳至</li>
                    <li class="singleBorder">
                        <input type="text">
                    </li>
                    <li class="singleBorder">页</li>
                </ul>
            </div>
        </div>
        <!-- 分页end -->

        <!-- 模态框 填写物流信息-->
        <b-modal ref="myModalRef" hide-footer size="lg">
          <div class="logistics_box">
            <div>
              <img src="~@/assets/img/order-management/logistics.png" alt="">
            </div>
            <div>
              <write-info :message="data" @close-modal = 'closeModal'></write-info>
            </div>
          </div>
        </b-modal>
        <!-- 模态框 订单详情-->
        <b-modal ref="orderDetails" hide-footer size="lg" title="订单详情">
          <order-details ref="getDetail" :message="data" @close-modal = 'closeDetailsModal'></order-details>
        </b-modal>
        <!-- 模态框 提示-->
        <b-modal ref="alertModal" hide-footer size="sm" title="提示">
          <alert :message="data" @close-modal = 'closeAlertModal'></alert>
        </b-modal>
    </div>
  </div>
</template>

<script>
import Crumbs from '@/components/crumbs'
import WriteInfo from './form/write-info'
import OrderDetails from './form/order-details'
import Alert from './form/alert'
import Datepicker from 'vuejs-datepicker'
import {en, zh} from 'vuejs-datepicker/dist/locale'
import OrderService from '@/service/order/OrderService'
export default {
  name: 'OrderManagement',
  components: {
    Crumbs,
    WriteInfo,
    OrderDetails,
    Alert,
    Datepicker
  },
  data () {
    return {
      'activeState': '待发货',
      status: 'not_accepted',
      data: {},
      en: en,
      zh: zh,
      orderService: OrderService,
      orderList: []
    }
  },
  created () {
    this.loadOrderList() // 查找所有订单信息
  },
  methods: {
    // 查找所有订单信息
    loadOrderList () {
      this.orderService.loadOrderList({}).then((results) => {
        if (results.data.success) {
          this.orderList = results.data.data
          if (this.orderList == null) {
            this.orderList = []
          }
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    // 模态框--填写物流信息
    showModal () {
      this.$refs.myModalRef.show()
      this.data = {
        state: 'state'
      }
    },
    // 关闭模态框
    closeModal () {
      this.$refs.myModalRef.hide()
    },

    // 模态框--订单详情
    showDetails (id) {
      this.$refs.orderDetails.show()
      this.$refs.getDetail.getOrderDetail(id)
      this.data = {
        orderId: id
      }
    },
    // 关闭模态框
    closeDetailsModal () {
      this.$refs.orderDetails.hide()
    },
    // 模态框--提示
    alertModal (state) {
      this.$refs.alertModal.show()
      this.data = {
        state: state
      }
    },
    // 关闭模态框
    closeAlertModal () {
      this.$refs.alertModal.hide()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
@import "./order-management.scss";
</style>
