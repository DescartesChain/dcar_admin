// 操作提示
<template>
<div class="alert_wrap">
  <div class="alert_main">
    <slot></slot>
  </div>
  <div slot="modal-footer" class="w-100 modal_footer">
    <button class="btn modal_sure" @click="sureOperate">确认</button>
    <button class="btn modal_cancel" @click="cancel">关闭</button>
  </div>
</div>
</template>

<script>
import PostService from '@/service/post/PostService'
export default {
  name: 'Alert',
  props: {
    message: {}
  },
  data () {
    return {
      postService: PostService
    }
  },
  methods: {
    // 确定 state : delete--删除 / shield--屏蔽 / visible--可见
    sureOperate () {
      if (this.message.state == 'delete') {
        this.deletePost() // 根据 id 删除公告
      }
    },
    // 根据 id 删除公告
    deletePost () {
      this.postService.deleteNew(this.message.postId).then((results) => {
        if (results.data.success) {
          this.$toaster.success('删除成功')
          this.$emit('child-say', {backData: results.data.data, backState: 'deleteSuccess', id: this.message.postId})
        } else {
          this.$toster.error(results.data.msg)
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
.alert_main {
  font-size: 15px;
  background: #f1f4f9;
  padding: 20px;
}
</style>
