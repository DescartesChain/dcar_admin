import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const VoucherService = {
  // 获取所有兑换码
  loadVoucherList: (info) => {
    return axios.get(CurrentInterface + 'voucher', info)
  },

  // 批量创建兑换码   参数： amount--生成多少张兑换码(Number) / quantity--一张兑换码可以兑换多少产品(Number)
  createVoucher: (info) => {
    return axios.post(CurrentInterface + 'voucher', info)
  }

}
export default VoucherService
