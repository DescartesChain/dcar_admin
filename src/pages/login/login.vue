<template>
   <div class="login_warp">
      <div class="login_content">
        <div class="main">
          <img src="~@/assets/img/login/logo.png" class="logo">
          <form>
            <div class="substance" :class="{ active: isActive == 0 }">
              <img src="~@/assets/img/login/user.png" >
              <input type="text" autofocus placeholder="请输入账户名" v-model="name" @focus="showStyle(0)">
              <img v-if="hide" src="~@/assets/img/login/suces.png" >
            </div>
            <div class="substance" :class="{ active: isActive == 1 }">
              <img src="~@/assets/img/login/pwd.png" >
              <input type="password" placeholder="请输入密码" v-model="password" @focus="showStyle(1)">
              <img v-if="hide" src="~@/assets/img/login/suces.png" >
            </div>
            <div class="substance" :class="{ active: isActive == 2 }">
              <img src="~@/assets/img/login/guard.png" >
              <input type="text" placeholder="请输入验证码" v-model="codeText" @focus="showStyle(2)">
              <div class="code" @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <img v-if="hide" src="~@/assets/img/login/suces.png" >
            </div>
          </form>
          <div class="prompt" v-if="prompt">
            <img src="~@/assets/img/login/warn.png" >
            <p>账号或密码错误</p>
          </div>
          <button class="submit" @click="land">登陆</button>
        </div>
      </div>
   </div>
</template>

<script>
import SIdentify from '@/components/identify'
import AuthenticationService from '@/service/authentication/AuthenticationService'
export default {
  name: 'Login',
  components: {
    SIdentify
  },
  data () {
    return {
      isActive: 0,
      hide: false,
      prompt: false,
      identifyCodes: '1234567890abcdefghigklmnopqrstuvwxyz',
      identifyCode: '',
      name: '', // 用户名
      password: '', // 密码
      codeText: '', // 验证码
      authenticationService: AuthenticationService,
      storage: {}
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    showStyle (num) {
      this.isActive = num
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    },
    land () {
      if (this.name == '') {
        this.$toaster.error('用户名不能为空')
      } else if (this.password == '') {
        this.$toaster.error('密码不能为空')
      } else if (this.codeText == '') {
        this.$toaster.error('验证码不能为空')
      } else if (this.codeText != '') {
        if (this.codeText != this.identifyCode) {
          this.$toaster.error('验证码输入错误')
        } else if (this.codeText == this.identifyCode && this.name != '' && this.password != '') {
          this.authenticationService.login({
            'name': this.name,
            'password': this.password
          }).then((results) => {
            console.log(results)
            if (results.data.success) {
              this.$toaster.success('登录成功')
              localStorage.setItem('userid', results.data.data.id)
              localStorage.setItem('token', results.data.data.token)
              let that = this
              setTimeout(() => {
                that.$router.push({
                  name: 'UserManagement'
                })
              }, 1500)
            } else {
              this.$toaster.error(results.data.msg)
            }
          })
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
@import "./login.scss";
</style>
