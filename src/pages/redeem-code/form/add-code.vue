// 新增兑换码
<template>
  <div class="add_code_main">
    <div class="add_body">
      <div class="row">
        <div class="col-md-3">
          数量
        </div>
        <div class="col-md-7">
          <input type="text" class="form-control" placeholder="请输入兑换码数量" v-model="createInfo.amount">
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          次数
        </div>
        <div class="col-md-7">
          <input type="text" class="form-control" placeholder="请设置兑换码使用次数" v-model="createInfo.quantity">
        </div>
      </div>
    </div>
    <div slot="modal-footer" class="w-100 modal_footer">
      <button class="btn modal_sure" @click="createVoucher('finish')">保存</button>
      <button class="btn modal_sure" @click="createVoucher('add')">保存并新增</button>
      <button class="btn modal_cancel">关闭</button>
    </div>
  </div>
</template>

<script>
import VoucherService from '@/service/voucher/VoucherService'
export default {
  name: 'AddCode',
  props: {
    message: {}
  },
  data () {
    return {
      voucherService: VoucherService,
      createInfo: {
        'amount': '',
        'quantity': ''
      }
    }
  },
  methods: {
    // 批量创建兑换码   参数： amount--生成多少张兑换码(Number) / quantity--一张兑换码可以兑换多少产品(Number)
    createVoucher (state) {
      this.voucherService.createVoucher(
        this.createInfo
      ).then((results) => {
        if (results.data.success) {
          this.$toaster.success('新增成功')
          this.$emit('child-say', {backData: results.data.data, state: state})
          this.createInfo = {
            'amount': '',
            'quantity': ''
          }
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
}
//end
.add_body{
  font-size: 15px;
}
.add_body>div{
  margin: 15px 0;
}
.add_body>div>div:nth-child(1){
  text-align: right;
  padding-top:7px;
}
.add_body>div:nth-child(2){
  margin-bottom:30px;
}
::-webkit-input-placeholder { /* WebKit browsers */
  color:#AFAFAF;
  font-size: 15px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:#AFAFAF;
  font-size: 15px;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#AFAFAF;
  font-size: 15px;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color:#AFAFAF;
  font-size: 15px;
}
</style>
