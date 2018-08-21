// 兑换码
<template>
   <div class="redeem_code">
    <crumbs>兑换码</crumbs>
    <div class="code_main">
        <!-- 饼图和筛选部分 -->
        <div class="redeem_top">
          <!-- 饼图 -->
          <div class="chart_box">
            <h5 class="title">兑换码使用率</h5>
            <doughnut-example :width="160" :height="160" class="douStyle"></doughnut-example>
          </div>
          <div class="filter_main">
            <!-- 头部 -->
            <div class="public_header">兑换码</div>
            <!-- 搜索框 -->
            <div class="add_code_box">
              <div class="public_search">
                <input type="text" placeholder="请输入电话、姓名等信息查询">
                <img src="~@/assets/img/main/search.png" alt="">
              </div>
              <button class="add_code" @click="showAddModal">
                <img src="~@/assets/img/main/add_code.png" alt="">
                新增兑换码
              </button>
            </div>
            <!-- 筛选条件部分 -->
            <div class="filter_box">
              <div class="row">
                <ul class="col-md-11 choose_time">
                  <li class="special_item">生成时间</li>
                  <li>
                    <datepicker format="yyyy-MM-dd" :language="zh" placeholder="选择日期">
                      <span slot="afterDateInput" class="animated-placeholder">
                        <img src="~@/assets/img/main/date.png" alt="">
                      </span>
                    </datepicker>
                  </li>
                  <li class="special_item">
                    ——
                  </li>
                  <li>
                    <datepicker format="yyyy-MM-dd" :language="zh" placeholder="选择日期">
                      <span slot="afterDateInput" class="animated-placeholder">
                        <img src="~@/assets/img/main/date.png" alt="">
                      </span>
                    </datepicker>
                  </li>
                </ul>
                <div class="col-md-1 refresh_box">
                  <img src="~@/assets/img/main/refresh.png" alt="">
                </div>
              </div>
              <ul class="choose_item">
                  <li class="item_title">状态</li>
                  <li>
                    <span :class="{'activeItem':activeState == '未分配'}">未分配</span>
                  </li>
                  <li>
                    <span :class="{'activeItem':activeState == '未使用'}">未使用</span>
                  </li>
                  <li>
                    <span :class="{'activeItem':activeState == '已失效'}">已失效</span>
                  </li>
                  <li class="item_title">可用次数</li>
                  <li>
                    <span :class="{'activeItem':activeState == '单次'}">单次</span>
                  </li>
                  <li>
                    <span :class="{'activeItem':activeState == '多次'}">多次</span>
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 表格部分 -->
        <div class="public_table">
          <div class="table_header">兑换码</div>
          <table class="table">
            <thead>
              <tr>
                <td class="text-center">序号</td>
                <td class="text-center">名称</td>
                <td class="text-center">可用次数</td>
                <td class="text-center">生成时间</td>
                <td class="text-center">所属用户</td>
                <td class="text-center">操作</td>
              </tr>
            </thead>
            <tbody v-if="codeList.length>0">
              <tr v-for="(codeInfo, index) in codeList" :key="codeInfo._id">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{codeInfo.code}}</td>
                <td class="text-center">{{codeInfo.quantity}}</td>
                <td class="text-center">2018-12-11 12:22</td>
                <td class="text-center">啦啦啦</td>
                <td class="text-center">
                  <toggle-switch :value="false" class="switch_icon" @change="showDisabledModal"></toggle-switch>
                  <img src="~@/assets/img/main/alter.png" alt="" class="alter_icon" @click="showAlterModal">
                </td>
              </tr>
            </tbody>
            <tbody v-if="codeList.length == 0">
              <tr>
                <td colspan="5" class="no_data">
                  暂无兑换码
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
        <!-- 模态框 新增兑换码-->
        <b-modal ref="addCode" hide-footer title="新增兑换码">
          <add-code :message="data" @close-modal = 'closeAddModal' @child-say="listenToChild"></add-code>
        </b-modal>
        <!-- 模态框 修改兑换码-->
        <b-modal ref="AlterCode" hide-footer title="修改兑换码">
          <alter-code :message="data" @close-modal = 'closeAlterModal'></alter-code>
        </b-modal>
        <!-- 模态框 禁用兑换码-->
        <b-modal ref="DisabledCode" hide-footer title="禁用兑换码">
          <disabled-code :message="data" @close-modal = 'closeDisabledModal'></disabled-code>
        </b-modal>
    </div>
   </div>
</template>

<script>
import Crumbs from '@/components/crumbs'
import ToggleSwitch from '@/components/toggle-switch'
import AddCode from './form/add-code'
import AlterCode from './form/alter-code'
import DisabledCode from './form/disabled-code'
import DoughnutExample from './chart/DoughnutExample'
import Datepicker from 'vuejs-datepicker'
import {en, zh} from 'vuejs-datepicker/dist/locale'
import VoucherService from '@/service/voucher/VoucherService'
export default {
  name: 'RedeemCode',
  components: {
    Crumbs,
    ToggleSwitch,
    AddCode,
    DoughnutExample,
    AlterCode,
    DisabledCode,
    Datepicker
  },
  data () {
    return {
      'activeState': '未分配',
      data: {},
      en: en,
      zh: zh,
      voucherService: VoucherService,
      codeList: []
    }
  },
  created () {
    this.loadVoucherList() // 获取所有兑换码
  },
  methods: {
    // 接收子组件的值 新增兑换码
    listenToChild (emit) {
      if (emit.state == 'finish') {
        this.$refs.addCode.hide()
      }
      for (var i = 0; i < emit.backData.length; i++) {
        this.codeList.push(emit.backData[i])
      }
    },
    // 获取所有兑换码
    loadVoucherList () {
      this.voucherService.loadVoucherList({}).then((results) => {
        if (results.data.success) {
          this.codeList = results.data.data
        } else {
          this.$toaster.error(results.data.success)
        }
      })
    },
    // 模态框--新增兑换码
    showAddModal () {
      this.$refs.addCode.show()
      this.data = {
        state: 'state'
      }
    },
    // 关闭模态框
    closeAddModal () {
      this.$refs.addCode.hide()
    },
    // 模态框--修改兑换码
    showAlterModal () {
      this.$refs.AlterCode.show()
      this.data = {
        state: 'state'
      }
    },
    // 关闭模态框
    closeAlterModal () {
      this.$refs.AlterCode.hide()
    },
    // 模态框--禁用兑换码
    showDisabledModal () {
      this.$refs.DisabledCode.show()
      this.data = {
        state: 'state'
      }
    },
    // 关闭模态框
    closeDisabledModal () {
      this.$refs.DisabledCode.hide()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
@import "./redeem-code.scss";
</style>
