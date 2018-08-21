// 新闻公告
<template>
  <div class="news_bulletin">
    <crumbs>新闻公告</crumbs>
    <div class="content">
      <!--标题-->
      <h3 class="title">新闻公告</h3>
      <!--搜索框和发布新闻-->
      <div class="search_box">
        <!--搜索框-->
        <div class="public_search">
          <input type="text" placeholder="请输入新闻标题或者关键字等信息查询">
          <img src="~@/assets/img/main/search.png" alt="">
        </div>
        <!--发布新闻-->
        <button class="release" @click="showNewsModal('add')"><img src="../../assets/img/news-bulletin/release.png"/>发布新闻</button>
      </div>
      <!--筛选-->
      <div class="screen">
        <!--发布时间-->
        <div class="screen_time">
          <p class="tag">发布时间</p>
          <div class="time">
            <datepicker format="yyyy-MM-dd" :language="zh" placeholder="选择日期">
              <span slot="afterDateInput" class="animated-placeholder">
              <img src="~@/assets/img/main/date.png" alt="">
            </span>
            </datepicker>
            <span class="line">——</span>
            <datepicker format="yyyy-MM-dd" :language="zh" placeholder="选择日期">
              <span slot="afterDateInput" class="animated-placeholder">
            <img src="~@/assets/img/main/date.png" alt="">
          </span>
            </datepicker>
          </div>
        </div>
        <!--新闻类型-->
        <div class="screen_type">
          <p class="tag">新闻类型</p>
          <div class="type">
            <span @click="active(0)" :class="{active:ins==0}">一级新闻</span>
            <span @click="active(1)" :class="{active:ins==1}">二级新闻</span>
          </div>
        </div>
        <!--状态-->
        <div class="screen_type">
          <p class="tag">状态</p>
          <div class="type">
            <span @click="change(0)" :class="{active:flag==0}">已发布</span>
            <span @click="change(1)" :class="{active:flag==1}">草稿</span>
            <span @click="change(2)" :class="{active:flag==2}">已屏蔽</span>
          </div>
        </div>
        <!--刷新-->
        <div class="refresh">
          <img src="../../assets/img/main/3.png" />
        </div>
      </div>
      <!--主要内容-->
      <div class="news_content">
        <p v-if="postList.length==0" class="noData">暂无新闻公告</p>
        <b-container class="bv-example-row" fluid v-if="postList.length>0">
          <b-row>
            <b-col cols="12" sm="12" md="12" lg="6" xl="4" align-self="start" v-for="postInfo in postList" :key="postInfo._id">
              <div class="news_term">
                <span class="label" v-if="postInfo.status == 1">已发布</span>
                <span class="label" v-if="postInfo.status == 0">草稿</span>
                <div class="pic">
                  <img src="../../assets/img/news-bulletin/news_1.jpg" />
                </div>
                <div class="text">
                  <div class="headline">
                    <p class="topic">{{postInfo.title}}</p>
                    <p class="scan">
                      <img @click="showAlertModal('shield')" v-if="visible" src="../../assets/img/news-bulletin/eye_open.png" />
                      <img @click="showAlertModal('visible')" v-else src="../../assets/img/news-bulletin/eye_close.png" />
                      <span>700</span>
                    </p>
                  </div>
                  <p class="info">{{postInfo.content}}</p>
                  <div class="handle">
                    <span class="time">2018-06-13  09:11:55</span>
                    <p class="btn">
                      <span class="editor" @click="showNewsModal('alter',postInfo)">编辑</span>
                      <span class="line"></span>
                      <span class="delete" @click="showAlertModal('delete',postInfo)">删除</span>
                    </p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <!-- 分页部分 -->
      <div class="paginationBox shadowDiv row">
        <div class="col-md-2 col-sm-12">
          <!--<p-checkbox name="group1" value="全选" label="全选" [(ngModel)]="selectedCities" inputId="ny"></p-checkbox>-->
          <!--<span class="batchBox">批量删除</span>-->
        </div>
        <div class="col-md-10 col-sm-12">
          <ul class="pageList">
            <li>
              共
              <span class="num">2</span> 页
              <span class="num">/</span>
              <span class="num">10</span> 条数据
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
      <!-- 模态框 发布新闻-->
      <b-modal ref="releaseNews" hide-footer :title="modalTitle">
        <release-news ref="editUser" :message="data" @close-modal='closeNewsModal' @child-say="listenToChild"></release-news>
      </b-modal>
      <!--提示-->
      <b-modal ref="alertNews" hide-footer :title="alertModalTitle">
        <alert :message="order" @close-modal='closeAlertModal' @child-say="listenToOperate">{{alertModalContent}}</alert>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Crumbs from '@/components/crumbs'
import ReleaseNews from './form/release-news'
import Alert from './form/alert'
import Datepicker from 'vuejs-datepicker'
import {en, zh} from 'vuejs-datepicker/dist/locale'
import PostService from '@/service/post/PostService'
export default {
  name: 'NewsBulletin',
  data () {
    return {
      // label: false,
      ins: 0,
      flag: 0,
      visible: false,
      data: {},
      order: {},
      modalTitle: '',
      alertModalTitle: '',
      alertModalContent: '',
      en: en,
      zh: zh,
      postService: PostService,
      newState: '',
      postList: []
    }
  },
  components: {
    Crumbs,
    ReleaseNews,
    Alert,
    Datepicker
  },
  created () {
    this.loadPostList() // 获取所有公告信息
  },
  methods: {
    // 接收 发布公告传来的值
    listenToChild (emit) {
      this.$refs.releaseNews.hide()
      this.newState = emit.backState
      if (this.newState == 'createSuccess') {
        this.postList.push(emit.backData)
      } else if (this.newState == 'alterSuccess') {
        for (var i = 0; i < this.postList.length; i++) {
          if (this.postList[i]._id == emit.id) {
            this.postList.splice(i, 1, emit.backData)
          }
        }
      }
    },
    // 接收 操作公告传来的值   （删除、屏蔽、展示）
    listenToOperate (emit) {
      this.$refs.alertNews.hide()
      this.newState = emit.backState
      if (this.newState == 'deleteSuccess') {
        for (var i = 0; i < this.postList.length; i++) {
          if (this.postList[i]._id == emit.id) {
            this.postList.splice(i, 1)
          }
        }
      }
    },
    // 获取所有公告信息
    loadPostList () {
      this.postService.loadPostList({}).then((results) => {
        if (results.data.success) {
          this.postList = results.data.data
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },

    active (num) {
      this.ins = num
    },
    change (num) {
      this.flag = num
    },
    // 模态框 发布新闻
    showNewsModal (state, postInfo) {
      this.$refs.releaseNews.show()
      if (state === 'add') {
        this.modalTitle = '发布新闻'
      } else {
        this.modalTitle = '编辑新闻'
        this.$refs.editUser.seekNew(postInfo._id)
      }
      this.data = {
        state: state // 发布/编辑
      }
    },
    closeNewsModal () {
      this.$refs.releaseNews.hide()
    },
    // 模态框 提示
    showAlertModal (state, postInfo) {
      this.$refs.alertNews.show()
      if (state === 'delete') {
        this.alertModalTitle = '删除'
        this.alertModalContent =
          '确定要删除此新闻公告吗？删除后用户将无法看到此新闻'
      } else if (state === 'shield') {
        this.alertModalTitle = '屏蔽'
        this.alertModalContent =
          '确定要关闭此新闻吗？关闭后新闻将仅管理员可见，用户不可浏览'
      } else if (state === 'visible') {
        this.alertModalTitle = '可见'
        this.alertModalContent = '确定要开启此新闻吗？开启后新闻将对所有用户开放浏览'
      }
      this.order = {
        state: state,
        postId: postInfo._id
      }
    },
    closeAlertModal () {
      this.$refs.alertNews.hide()
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/public";
@import "./news-bulletin.scss";
</style>
