import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const PostService = {
  // 获取所有公告信息
  loadPostList: (info) => {
    return axios.get(CurrentInterface + 'post', info)
  },

  // 创建新公告
  createNew: (info) => {
    return axios.post(CurrentInterface + 'post', info)
  },

  // 根据 id 更新公告
  updateNew: (info) => {
    return axios.post(CurrentInterface + 'post/' + localStorage.getItem('userid'), info)
  }

}
export default PostService
