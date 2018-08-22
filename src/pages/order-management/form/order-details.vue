// 订单详情
<template>
  <div class="order_details">
    <div class="details_main" v-if="showData">
      <!-- 订单信息 -->
      <div class="order_body">
        <p class="border_title">
          <b></b>
          <span>订单信息</span>
        </p>
        <div class="order_main">
          <div class="row">
            <div class="col-md-7">
              <span>订单号：</span>
              {{orderDetailInfo._id}}
            </div>
            <div class="col-md-5">
              <span>下单时间：</span>
              2018-03-06 23:00
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <span>商品名称：</span>
              <p>{{orderDetailInfo.product.name}}</p>
            </div>
            <div class="col-md-5">
              <span>商品数量：</span>
              {{orderDetailInfo.product.discount}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <span>支付方式：</span>
              <p v-if="orderDetailInfo.pay == 0">兑换码</p>
              <p v-if="orderDetailInfo.pay == 1">ETH</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <span>收货人：</span>
              <p v-if="orderDetailInfo.shipAddress != null">{{orderDetailInfo.shipAddress.receiver}}</p>
            </div>
            <div class="col-md-5">
              <span>联系方式：</span>
              <p v-if="orderDetailInfo.shipAddress != null">{{orderDetailInfo.shipAddress.phone}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <span>收货地址：</span>
              <p v-if="orderDetailInfo.shipAddress != null">
                {{orderDetailInfo.shipAddress.province}}{{orderDetailInfo.shipAddress.city}}{{orderDetailInfo.shipAddress.district}}{{orderDetailInfo.shipAddress.street}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 物流信息 -->
      <div class="logistics_body">
        <p class="border_title">
          <b></b>
          <span>订单信息</span>
        </p>
        <div class="logistics_main">
          <ul class="white_line">
            <li>发货方式： 快递</li>
            <li>物流公司： 申通快递</li>
            <li>运单号码： 3555658688867</li>
          </ul>
          <!-- 无物流信息 -->
          <div class="no_info">
            <img src="~@/assets/img/order-management/no-info.png" alt="">
            订单还未发货！ 暂时没有物流信息
          </div>
          <div class="flow_detail">
            <div class="all_day">
                <p class="day">2017-12-17</p>
                <p class="week">周日</p>
                <ul class="day_detail">
                    <li>
                        <span class="round"></span>
                        <div class="line"></div>
                        <p class="time">12:55:08</p>
                        <p class="main">卖家发货</p>
                    </li>
                    <li>
                        <span class="round"></span>
                        <div class="line"></div>
                        <p class="time">12:55:08</p>
                        <p class="main">卖家发货</p>
                    </li>
                    <li>
                        <span class="round"></span>
                        <div class="line"></div>
                        <p class="time">12:55:08</p>
                        <p class="main">卖家发货</p>
                    </li>
                </ul>
            </div>
            <div class="all_day">
                <p class="day">2017-12-17</p>
                <p class="week">周日</p>
                <ul class="day_detail">
                    <li>
                        <span class="round"></span>
                        <div class="line"></div>
                        <p class="time">12:55:08</p>
                        <p class="main">卖家发货</p>
                    </li>
                    <li>
                        <span class="round"></span>
                        <div class="line"></div>
                        <p class="time">12:55:08</p>
                        <p class="main">卖家发货</p>
                    </li>
                    <li>
                        <span class="round"></span>
                        <div class="line"></div>
                        <p class="time">12:55:08</p>
                        <p class="main">卖家发货</p>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="modal-footer" class="w-100 modal_footer">
      <button class="btn modal_sure">确认</button>
      <button class="btn modal_cancel">关闭</button>
    </div>
  </div>
</template>

<script>
import OrderService from '@/service/order/OrderService'
export default {
  name: 'OrderDetails',
  props: {
    message: {}
  },
  data () {
    return {
      orderService: OrderService,
      orderDetailInfo: {},
      showData: false
    }
  },
  methods: {
    // 根据 id 查找订单信息
    getOrderDetail (id) {
      this.orderService.getOrderDetail(id).then((results) => {
        if (results.data.success) {
          this.orderDetailInfo = results.data.data
          this.showData = true
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
// 模态框样式
.modal_footer {
  @include modal_footer;
  margin-top: 20px;
  text-align: right;
}
//end
.border_title{
 @include border_title;
}
.order_details{
  font-size: 15px;
}
.order_body{
  padding:0 20px;
}
.order_main{
  padding:20px;
}
.order_main>div{
  padding:6px 0;
}
.order_main>div>div>span{
  font-weight: bold;
  padding-right:15px;
}
.order_main>div>div>p{
  display: inline-block;
}
.logistics_body{
  background: #F0F3F8;
  padding:20px;
}
.white_line{
  background: #fff;
  overflow: hidden;
  padding:3px 20px;
  border-radius: 15px;
  margin-top:15px;
}
.white_line>li{
  float: left;
  width:33.3%;
}
.white_line>li:nth-child(3){
  text-align: right;
}
.no_info{
  color:#F0691F;
  text-align: center;
  padding:8px 20px;
  border-radius: 15px;
  margin-top:15px;
  background: #fff;
  line-height: 15px;
  img{
    height:16px;
    vertical-align: top;
    margin-right:10px;
  }
}
.flow_detail{
    width: 100%;
    height: auto;
    padding: 20px;
    background: #F1F4F9;
}
.all_day{
    zoom: 1;
    margin-left: 34px;
}
.all_day:after{
    clear: both;
    content: " ";
    display: block;
}
.all_day .day, .week, .day_detail {
    float: left;
    margin-right: 20px;
    font-size: $font_sm;
    color: #424242;
    line-height: 24px;
}
.day_detail li{
    line-height: 24px;
    zoom: 1;
    position: relative;
}
.day_detail li:after{
    clear: both;
    content: " ";
    display: block;
}
.day_detail li .round{
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #E0CBAA;
    position: absolute;
    left: -170px;;
    top: 10px;
}
.day_detail li .line{
    width: 1px;
    height: 24px;
    border-left: 1px dotted #E0CBAA;
    position: absolute;
    left: -167px;;
    top: 10px;
}
.day_detail .time, .main{
    float: left;
}
.day_detail .time{
    margin-right: 20px;
}
.all_day:last-child .day_detail li:last-child .line{
    display: none;
}
</style>
