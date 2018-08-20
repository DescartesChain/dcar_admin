import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const OrderService = {
  // 查找所有订单信息
  loadOrderList: (info) => {
    return axios.get(CurrentInterface + 'order', info)
  }

}
export default OrderService
