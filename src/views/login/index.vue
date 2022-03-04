<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-tabs type="border-card" class="login-form" >
          <el-tab-pane label="微信登录">
            <div id="wxqr"></div>
          </el-tab-pane>
          <el-tab-pane label="账号登录" >
            <el-form ref="form" :model="form" :rules="rules" label-position="left">
              <el-form-item style="margin-top: 40px" prop="username">
                <span class="svg-container svg-container-admin"></span>
                <el-input v-model.trim="form.username" v-focus placeholder="请输入用户名" tabindex="1" type="text"/>
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container"></span>
                <el-input :key="passwordType" ref="password" v-model.trim="form.password" :type="passwordType" tabindex="2" placeholder="请输入密码" @keyup.enter.native="handleLogin"/>
                <span v-if="passwordType === 'password'" class="show-password" @click="handlePassword"></span>
                <span v-else class="show-password" @click="handlePassword"></span>
              </el-form-item>
              <el-button :loading="loading" class="login-btn" @click="handleLogin">
                登录
              </el-button>
              <!-- <router-link to="/register">
                <div style="margin-top: 20px">注册</div>
              </router-link>-->
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from '@/utils/validate'
  import {loadJs} from "../../utils/vab";

  export default {
    name: 'Login',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      const validateusername = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'wx',
        nodeEnv: process.env.NODE_ENV,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, trigger: 'blur', validator: validateusername },
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword },
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
    },
    mounted() {

        loadJs([
            '//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
        ]).then(()=> {
            var obj = new WxLogin({
                self_redirect: true,
                id: "wxqr",
                appid: "wxd5e70a9ab58f69f9",
                scope: "snsapi_login",
                redirect_uri: encodeURI("http://xxroom.xyz/z/user/home"),
                state: "",
                style: "black",
                href: ""
            });
        })
    },
    // head:{
    //   script:[
    //     {src:"http//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"}
    //   ]
    // },
    methods: {
      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.form)
              .then(() => {
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url('http://head.xxroom.xyz/lqRIRuUiCunOpaivwT6T_KsS_ouk')
      center center fixed no-repeat;
    background-size: cover;

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;
      color: white !important;
      background: #11485aa1 !important;
      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 425px) / 2) 10% 10%;
      overflow: hidden;
    }
    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
