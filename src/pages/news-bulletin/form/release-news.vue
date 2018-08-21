// 发布新闻、编辑新闻
<template>
  <div class="release-news">
    <div class="news_main">
      <div class="row">
        <label class="col-md-2">
          <span class="text-danger">*</span>
          类型
        </label>
        <div class="col-md-7">
          <select class="form-control own_select" @change="chooseCategory($event.target.value)">
            <option value="1" :selected="newArray.category == 1">一级新闻</option>
            <option value="0" :selected="newArray.category == 0">二级新闻</option>
          </select>
        </div>
      </div>
      <div class="row">
        <label class="col-md-2">
          <span class="text-danger">*</span>
          标题
        </label>
        <div class="col-md-10">
          <input type="text" class="form-control" placeholder="请输入文章标题" v-model="newArray.title">
        </div>
      </div>
      <div class="row">
        <label class="col-md-2">封面图</label>
        <div class="col-md-5">
          <!-- 新增 -->
          <div class="add_img" v-if="this.message.state == 'add'">
            <img src="~@/assets/img/news-bulletin/add-pic.png"/>
            <p>
              <label for="add">点击添加图片</label>
              <input type="file" id="add">
            </p>
          </div>
          <!-- 编辑 -->
          <div class="img_box" v-if="this.message.state == 'alter'">
            <img src="~@/assets/img/news-bulletin/news_1.jpg"/>
            <p>
              <label for="alter">点击更换图片</label>
              <input type="file" id="alter">
            </p>
          </div>
        </div>
        <div class="col-md-5 grey_text">
          支持jpg/png格式，大小不超过1M，建议尺寸为750 X 450px
        </div>
      </div>
      <div class="row">
        <label class="col-md-2">
          <span class="text-danger">*</span>
          正文
        </label>
        <div class="col-md-10">
          <textarea rows="5" placeholder="请输入文章内容" class="new_text" v-model="newArray.content"></textarea>
        </div>
      </div>
    </div>
    <div slot="modal-footer" class="w-100 modal_footer">
      <button class="btn modal_sure" @click="operateNew(1)">发布</button>
      <button class="btn modal_sure" @click="operateNew(0)">保存</button>
      <button class="btn modal_cancel" v-if="this.message.state == 'alter'" @click="cancel">关闭</button>
    </div>
  </div>
</template>

<script>
import PostService from '@/service/post/PostService'
export default {
  name: 'ReleaseNews',
  props: {
    message: {}
  },
  data () {
    return {
      postService: PostService,
      newArray: {
        title: '', // 标题
        content: '', // 正文内容
        category: 0, // 分类： 1 表示一级新闻， 0:二级新闻，默认为0
        banner: '', // 图片，如果使用 category 的值为 1，必须赋值
        status: '', // 状态
        author: localStorage.getItem('userid'),
        postId: ''
      }
    }
  },
  methods: {
    // 根据 id 查找公告
    seekNew (id) {
      this.postId = id
      this.postService.seekNew(id).then((results) => {
        if (results.data.success) {
          this.newArray = results.data.data
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    // 选择新闻公告类型
    chooseCategory (category) {
      this.newArray.category = category
    },
    // 新增/编辑
    operateNew (state) {
      this.newArray.status = state // 状态
      console.log(this.newArray)
      if (this.newArray.category === '') {
        this.$toaster.error('请选择文章类型')
        return false
      }
      if (this.newArray.title === '') {
        this.$toaster.error('请填写文章标题')
        return false
      }
      if (this.newArray.content === '') {
        this.$toaster.error('请填写文章内容')
        return false
      }
      if (this.newArray.category === 1 && this.newArray.banner === '') {
        this.$toaster.error('请上传封面照片')
        return false
      }
      if (this.message.state == 'add') {
        this.createPost() // 创建新公告
      } else {
        this.alterPost() // 根据 id 更新公告 修改
      }
    },
    // 创建新公告
    createPost () {
      this.postService.createNew(
        this.newArray
      ).then((results) => {
        if (results.data.success) {
          this.$toaster.success('创建成功')
          this.$emit('child-say', {backData: results.data.data, backState: 'createSuccess'})
          this.newArray = {
            title: '', // 标题
            content: '', // 正文内容
            category: 0, // 分类： 1 表示一级新闻， 0:二级新闻，默认为0
            banner: '', // 图片，如果使用 category 的值为 1，必须赋值
            status: '', // 状态
            author: localStorage.getItem('userid')
          }
        } else {
          this.$toaster.error('创建失败')
        }
      })
    },
    // 根据 id 更新公告 修改
    alterPost () {
      this.postService.updateNew(
        this.postId,
        this.newArray
      ).then((results) => {
        if (results.data.success) {
          this.$toaster.success('编辑成功')
          this.$emit('child-say', {backData: results.data.data, backState: 'alterSuccess', id: this.postId})
          this.newArray = {
            title: '', // 标题
            content: '', // 正文内容
            category: 0, // 分类： 1 表示一级新闻， 0:二级新闻，默认为0
            banner: '', // 图片，如果使用 category 的值为 1，必须赋值
            status: '', // 状态
            author: localStorage.getItem('userid')
          }
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    // 关闭模态框
    cancel () {
      this.$emit('child-say', {})
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
.news_main{
  font-size:15px;
}
.new_text{
  width:100%;
  border:1px solid #E1E8EE;
  resize: none;
  padding:5px 15px;
}
label{
  text-align: right;
  padding-top:5px;
}
.news_main>div{
  margin:15px 0;
}
.grey_text{
  color:#868686;
}
.img_box{
  // height:200px;
  position: relative;
}
.img_box>p{
  background: rgba(0,0,0,0.5);
  color:#fff;
  position: absolute;
  bottom:0;
  left:0;
  width:94%;
  padding-top:6px;
  text-align: center;
  cursor: pointer;
}
.add_img{
  background: #fff;
  position: relative;
  height:150px;
  width:100%;
  border:5px solid #F3F3F3;
  text-align: center;
  padding-top:30px;
}
.add_img>p{
  color:#808080;
  background: #F3F3F3;
  padding-top:6px;
  text-align: center;
  position: absolute;
  bottom:0;
  left:0;
  width:100%;
  cursor: pointer;
}
.img_box>p>input{
  display: none;
}
.add_img>p>input{
  display: none;
}
.own_select{
  @include own_select;
}
</style>
