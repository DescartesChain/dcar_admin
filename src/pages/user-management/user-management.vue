<template>
  <div class="user_management">
    <crumbs>用户管理</crumbs>
    <div class="user_main">
      <div class="header">
          <div class="user_number">
            <h5 class="title">用户总人数</h5>
            <h6>86889</h6>
            <p>
              <span>近7天+86889</span>
            </p>
            <img src="~@/assets/img/user-management/user-number.png">
          </div>
          <div class="line">
            <div class="line_header">
              <h5 class="title" @click="ceshi">增长趋势</h5>
              <div class="dropdown_box">
                <div class="dropdown">
                  <p @click="showYear">{{this.currentYear}}<span></span></p>
                  <ul v-if="year">
                    <li>
                      <p @click="chooseYear(2010)">2010</p>
                      <p @click="chooseYear(2011)">2011</p>
                      <p @click="chooseYear(2012)">2012</p>
                    </li>
                    <li>
                      <p @click="chooseYear(2013)">2013</p>
                      <p @click="chooseYear(2014)">2014</p>
                      <p @click="chooseYear(2015)">2015</p>
                    </li>
                    <li>
                      <p @click="chooseYear(2016)">2016</p>
                      <p @click="chooseYear(2017)">2017</p>
                      <p @click="chooseYear(2018)">2018</p>
                    </li>
                    <li>
                      <p @click="chooseYear(2019)">2019</p>
                      <p @click="chooseYear(2020)">2020</p>
                      <p @click="chooseYear(2021)">2021</p>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <p @click="showMonth">{{this.currentMonth}}月<span></span></p>
                  <ul v-if="month">
                    <li>
                      <p @click="chooseMonth(1)">1月</p>
                      <p @click="chooseMonth(2)">2月</p>
                      <p @click="chooseMonth(3)">3月</p>
                    </li>
                    <li>
                      <p @click="chooseMonth(4)">4月</p>
                      <p @click="chooseMonth(5)">5月</p>
                      <p @click="chooseMonth(6)">6月</p>
                    </li>
                    <li>
                      <p @click="chooseMonth(7)">7月</p>
                      <p @click="chooseMonth(8)">8月</p>
                      <p @click="chooseMonth(9)">9月</p>
                    </li>
                    <li>
                      <p @click="chooseMonth(10)">10月</p>
                      <p @click="chooseMonth(11)">11月</p>
                      <p @click="chooseMonth(12)">12月</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <line-example :data="this.data" :labels="[1, 5, 10, 15, 20, 25, 30]" :width="792" :height="174"></line-example>
          </div>
          <div class="sex">
            <h5 class="title">性别</h5>
            <div class="taxonomy row">
              <div class="col-md-6 col-sm-6 col-xs-6">
                <div class="genre man">
                  <img src="~@/assets/img/user-management/man.png">
                  <p>4562<span>(人)</span></p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-6">
                <div class="genre women">
                  <img src="~@/assets/img/user-management/women.png">
                  <p>8796<span>(人)</span></p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <!-- 搜索框 -->
      <div class="public_search">
        <input type="text" placeholder="请输入管理员姓名等信息查询">
        <img src="~@/assets/img/main/search.png" alt="" @click="show">
      </div>
      <!-- 表格部分 -->
      <div class="public_table">
        <div class="table_header">用户列表</div>
        <table class="table">
          <thead>
            <tr>
              <td class="text-center">姓名</td>
              <td class="text-center">邮箱</td>
              <td class="text-center">注册时间</td>
              <td class="text-center">最后登陆时间</td>
              <td class="text-center">操作</td>
            </tr>
          </thead>
          <tbody v-if="userList.length > 0">
            <tr v-for="userInfo in userList" :key="userInfo._id">
              <td class="text-center">{{userInfo.name}}</td>
              <td class="text-center">{{userInfo.email}}</td>
              <td class="text-center">2018-12-11 12:22</td>
              <td class="text-center">2018-12-11 12:22</td>
              <td class="text-center">
                <img @click="showModal(userInfo._id)" src="~@/assets/img/user-management/see.png">
              </td>
            </tr>
          </tbody>
          <tbody v-if="userList.length == 0">
            <tr>
              <td colspan="5" class="no_data">
                暂无用户
              </td>
            </tr>
          </tbody>
        </table>
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
      <!-- 模态框 用户详情-->
      <b-modal ref="myModalRef" title="用户详情" hide-footer size="lm">
        <user-detail ref="seekDetail" :message="modalData" @close-modal = 'closeModal'></user-detail>
      </b-modal>
      <!-- 模态框end -->
    </div>
  </div>
</template>

<script>
import LineExample from './chart/LineExample'
import UserDetail from './form/user-detail/user-detail'
import Crumbs from '@/components/crumbs'
import UserService from '@/service/user/UserService'
export default {
  name: 'UserManagement',
  components: {
    LineExample,
    UserDetail,
    Crumbs
  },
  data () {
    return {
      data: [40, 39, 10, 40, 39, 80, 40],
      modalData: {},
      currentMonth: 7,
      currentYear: 2018,
      month: false,
      year: false,
      message: 'My Toaster message.',
      userService: UserService,
      userList: []
    }
  },
  created () {
    this.loadUserList() // 获取所有用户信息
  },
  methods: {
    // 获取所有用户信息
    loadUserList () {
      this.userService.loadUserList({}).then((results) => {
        if (results.data.success) {
          this.userList = results.data.data
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    show () {
      this.$toaster.error(this.message)
    },
    ceshi () {
      console.log(1)
      this.data = [10, 20, 20, 30, 50, 60]
    },
    showMonth () {
      if (this.month === false) {
        this.month = true
        this.year = false
      } else {
        this.month = false
      }
    },
    showYear () {
      if (this.year === false) {
        this.year = true
        this.month = false
      } else {
        this.year = false
      }
    },
    chooseMonth (num) {
      this.currentMonth = num
      this.month = false
    },
    chooseYear (num) {
      this.currentYear = num
      this.year = false
    },
    showModal (id) {
      this.$refs.myModalRef.show()
      this.$refs.seekDetail.getUserDetail(id)
    },
    // 关闭模态框
    closeModal () {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
@import "./user-management.scss";
</style>
