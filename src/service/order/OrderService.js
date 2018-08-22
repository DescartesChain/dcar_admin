import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const OrderService = {
  // 查找所有订单信息
  loadOrderList: (info) => {
    return axios.get(CurrentInterface + 'order', info)
  },

  // 根据 id 查找订单信息
  getOrderDetail: (id) => {
    return axios.get(CurrentInterface + 'order/' + id)
  }

}
export default OrderService
