<template>
  <div style="position: relative">
    <img style="position:absolute;right:0;height:100vh;width: 100%;object-fit: cover;" src="//head.xxroom.xyz/Flv2TIrxK0MiyPFh-9T0eEecpd7E  " />
    <div style="position:fixed;right: 200px;top: 200px">
      <a-card
          style="width: 100%"
          :tab-list="tabList"
          :active-tab-key="key"
          @tabChange="key => onTabChange(key, 'key')"
      >
        <template #customRender="item">
          <span>
            <WechatOutlined />
            {{ item.key }}
          </span>
        </template>
        <div v-show="key==='wx'" id="wx_login" style="height:400px;width:400px;"></div>
        <div v-show="key==='account'" style="height:400px;width:400px;">
          <a-form :model="account">
            <a-form-item>
              <a-input v-model:value="account.username" placeholder="用户名">
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-model:value="account.password" type="password" placeholder="密码">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                  type="primary"
                  @click="handleLoginSubmit()"
                  :disabled="account.username === '' || account.password === ''"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-card>


    </div>
  </div>
</template>

<script>
    import { useUserStore } from '@/store/modules/user'
    import { WechatOutlined,UserOutlined,LockOutlined } from '@ant-design/icons-vue'
    import {loadJs} from "@/utils/common";
    export default {
    name: 'login',
    data() {
      return {
          key:'wx',
          tabList:[
            {key:'wx',tab:'微信登录'},
            {key:'account',tab:'账号登录'},
          ],
          account:{
              username:'',
              password:'',
          },
          userStore:useUserStore()
      }
    },
    computed: {

    },
    components:{ WechatOutlined,UserOutlined,LockOutlined },
    mounted() {
        loadJs([
            '//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
        ]).then(()=> {
            this.loadWx()
        })
    },
    methods: {
        loadWx(){
            let obj = new WxLogin({
                self_redirect: true,
                id: "wx_login",
                appid: "wxd5e70a9ab58f69f9",
                scope: "snsapi_login",
                redirect_uri: encodeURI("http://xxroom.xyz/z/user/home"),
                state: "market",
                style: "black",
                href: ""
            });
        },
        onTabChange(value, type){
            this.key = value
        },
        handleLoginSubmit(){
            console.log(123)
        }
    },
  }
</script>
