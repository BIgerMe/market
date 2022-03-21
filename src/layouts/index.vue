<template>
  <a-layout class="layout">
    <a-layout-header>
      <router-link to="/" style="float: left;height: 100%">
        <!-- logo -->
        <img style="width: auto;height: 100%" src="@/assets/logo/6.png">
      </router-link>
      <div style="display: inline-block;float: left">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <!--<a-sub-menu>
            <template #icon>
              <settingOutlined/>
            </template>
            <template #title>菜单栏</template>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>-->
        </a-menu>
      </div>
      <div style="float: right;display: inline-block">
        <a-menu style="display: inline-block" mode="horizontal" @click="handleClick">
          <a-sub-menu>
            <template #title>
              <ShoppingCartOutlined @click="to('cart')" :style="{fontSize: '20px'}"/>
            </template>
          </a-sub-menu>
          <a-sub-menu>
            <template #title>
              <PayCircleOutlined :style="{fontSize: '20px'}" />
            </template>
            <div>
              <a-menu-item key="unpaid">待付款</a-menu-item>
              <a-menu-item key="unreceived">待收货</a-menu-item>
              <a-menu-item key="uncomment">待评价</a-menu-item>
              <a-menu-item key="allOrder">订单</a-menu-item>
            </div>
          </a-sub-menu>
          <a-sub-menu>
            <template #title>
              <div v-if="!user.accessToken">
                未登录
                <a-avatar shape="square">
                  <template #icon>
                    <UserOutlined/>
                  </template>
                </a-avatar>
              </div>
              <div v-else>
                {{user.nickname}}
                <a-avatar :size="32" shape="square" :src="user.avatar"/>
              </div>
            </template>
            <div v-if="user.accessToken">
              <a-menu-item key="logout">退出登录</a-menu-item>
            </div>
            <div v-else>
              <a-menu-item key="login">登录</a-menu-item>
            </div>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px;min-height: 85.5vh">
      <router-view :key="key" class="app-main-height"/>
    </a-layout-content>
    <a-layout-footer style="text-align: center;">
      {{ footerCopyright }}
    </a-layout-footer>
  </a-layout>
</template>
<script>
  import {footerCopyright} from '@/config'
  import {
    PayCircleOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined
  } from '@ant-design/icons-vue';
  import {useUserStore} from '@/store/modules/user'
  import {getUrlParam} from '@/utils/common'

  export default ({
    name: 'appMain',
    data() {
      return {
        user: useUserStore(),
        footerCopyright
      }
    },
    mounted() {
      let code = getUrlParam('code')
      if (code !== null && !this.user.accessToken) {//如果是微信登陆
        //根据code获取access_token
        this.user.wxLogin({code})
      }
    },
    components: {
      PayCircleOutlined,
      ShoppingCartOutlined,
      UserOutlined,
      MailOutlined,
      AppstoreOutlined,
      SettingOutlined,
    },
    computed: {
      key() {
        return this.$route.path
      },
    },
    methods: {
      handleClick(e) {
        switch (e.key) {
          case 'logout':
            this.logout()
            break
          case 'login':
            this.$router.push('/login')
            break
          case 'plus':
            window.open(
              'https://chu1204505056.gitee.io/admin-plus/?hmsr=homeAd&hmpl=&hmcu=&hmkw=&hmci='
            )
            break;
          case 'unpaid':
            this.$router.push('/shopping/unpaid')
            break;
          case 'unreceived':
            this.$router.push('/shopping/unreceived')
            break;
          case 'uncomment':
            this.$router.push('/shopping/uncomment')
            break;
        }
      },
      to(name){
        switch (name) {
          case 'cart':
            this.$router.push('/shopping/cart')
            break;
          case 'orderList':
            this.$router.push('/shopping/orderList')
            break;
          default:
            break;
        }
      },
      logout() {
        this.user.logout()
        const fullPath = this.$route.fullPath
        this.$router.push(`/login?redirect=${fullPath}`)
      },
    }
  });
</script>
<style>
  .ant-menu-vertical.ant-menu-sub{
    min-width: 0!important;
  }
  .ant-layout {
    background: #00000000 !important;
  }

  .ant-menu-horizontal {
    border-bottom: 0;
  }

  .ant-layout-header {
    height: 64px;
    padding: 0 50px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 64px;
    background: #00000000 !important;
  }

  .ant-menu-root {
    background: #00000000 !important;
  }
</style>
