<template>
  <a-layout class="layout">
    <a-layout-header>
      <router-link to="/" style="float: left;height: 100%">
        <!-- logo -->
        <img style="width: auto;height: 100%" src="@/assets/logo/6.png">
      </router-link>
      <div style="display: inline-block;float: left">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="mail">
            <template #icon>
              <MailOutlined />
            </template>
            导航一
          </a-menu-item>
          <a-menu-item key="app">
            <template #icon>
              <appstoreOutlined />
            </template>
            导航二
          </a-menu-item>
          <a-sub-menu>
            <template #icon>
              <settingOutlined />
            </template>
            <template #title>导航三</template>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="alipay">
            <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
              导航四
            </a>
          </a-menu-item>
        </a-menu>
      </div>
      <div style="float: right;display: inline-block">
        <a-menu style="display: inline-block" mode="horizontal" @click="handleClick">
          <a-sub-menu>
            <template #title>
              <ShoppingCartOutlined :style="{fontSize: '20px'}" />
            </template>
          </a-sub-menu>
          <a-sub-menu>
            <template #title>
              <AlertOutlined  :style="{fontSize: '20px'}" />
            </template>
          </a-sub-menu>
          <a-sub-menu>
            <template #title>
              未登录
              <a-avatar shape="square">
                <template #icon><UserOutlined /></template>
              </a-avatar>
<!--              <a-avatar :size="32" shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />-->
            </template>
            <div v-if="accessToken">
              <a-menu-item key="logout">退出登录</a-menu-item>
            </div>
            <div v-else>
              <a-menu-item key="login">登录</a-menu-item>
            </div>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <router-view :key="key" class="app-main-height" />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      {{ footerCopyright }}
    </a-layout-footer>
  </a-layout>
</template>
<script>
  import { footerCopyright } from '@/config'
  import { AlertOutlined, ShoppingCartOutlined, UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

  export default({
      name:'appMain',
      data(){
          return{
              accessToken:'',
              footerCopyright
          }
      },
      components:{
          AlertOutlined,
          ShoppingCartOutlined,
          UserOutlined,
          MailOutlined,
          AppstoreOutlined,
          SettingOutlined,
      },
      computed:{
          key() {
              return this.$route.path
          },
      },
      methods:{
          handleClick(e){
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
              }
          },
          logout() {
              console.log('退出登录');return;
          },
      }
  });
</script>
<style >
  .ant-layout{
    background: #00000000!important;
  }
  .ant-menu-horizontal{
    border-bottom: 0;
  }
  .ant-layout-header {
    height: 64px;
    padding: 0 50px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 64px;
    background: #00000000!important;
  }
  .ant-menu-root{
    background: #00000000!important;
  }
</style>
