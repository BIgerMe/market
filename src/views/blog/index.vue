<template>
  <a-row :gutter="20" style="font-family: serif">
    <a-col v-if="device !== 'mobile'" :md="4" :lg="4" :xl="4" class="left" style="max-height: 80vh;">
      <a-affix :offset-top="140">
        <el-scrollbar
          wrap-class="categoryList"
          wrap-style="color: red;"
          view-style="font-weight: bold;"
          view-class="view-box"
          :native="false"
        >
          <el-card class="md-card no-shadow">
            <a-menu
              style="width: auto"
              :default-selected-keys="['']"
              mode="inline"
              theme="light"
              @click="changeCategory"
            >
              <a-menu-item key="">全部</a-menu-item>
              <a-menu-item key="博客">博客
                <a-badge
                  :count="category['博客']"
                  :number-style="{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', }"
                />
              </a-menu-item>
              <a-menu-item v-for="(item, index) in category" v-if="index!=='博客'" :key="index">
                {{ index }}
                <a-badge
                  :count="item"
                  :number-style="{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', }"
                />
              </a-menu-item>
            </a-menu>
          </el-card>
        </el-scrollbar>
      </a-affix>
    </a-col>
    <a-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
      <div>
        <a-col v-if="'mobile' === device" :xs="24" >
          <el-card align="center" class="md-card">
            <div id="cy" style="width: 300px; height: 300px;"></div>
          </el-card>
        </a-col>
        <a-col :xs="24">
          <a-card v-for="item in lists" class="blogCard">
            <img
              v-if="item.cover"
              slot="cover"
              :src="item.cover"
              class="cover"
            />
            <a-card-meta>
              <template slot="title">
                <h3>
                  <a>
                    <router-link
                      :to="{ name: 'BlogDetail', params: { id: item.id } }"
                    >
                      {{ item.title }}
                    </router-link>
                  </a>
                </h3>
                <div>
                  <a-avatar style="margin-right: 3px" :size="28" :src="item.avatar" />
                  <el-link>{{ item.nickname }}</el-link>

                  <a-divider type="vertical" />
                  <el-tag v-for="c in item.category" effect="plain" type="info">
                    <a>{{ c }}</a>
                  </el-tag>
                  <a-divider type="vertical" />
                  <span v-if="'mobile' !== device"
                        style="
                      font-family: 'Droid Serif', Georgia, 'Times New Roman',
                        'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans CN',
                        'WenQuanYi Micro Hei', 'Microsoft Yahei', serif;color: #0808087d;
                    "
                  >
                    {{ item.update_at }}
                  </span>
                  <a-divider type="vertical" />
                  <a-icon type="eye" />&nbsp;{{item.view}}
                  &emsp;
                  <a-icon type="message" />&nbsp;{{item.comment}}
                </div>
              </template>
              <template slot="description">
                <div>
                  <video style="width: 100%;max-width:500px;" v-if="item.video !== '' && item.video !== null" controls="controls" >
                    <source :src="item.video" type="video/mp4" />
                    Video not playing? <a :href="item.video">Download file</a> instead.
                  </video>
                </div>
                <mavon-editor
                  :subfield="false"
                  :default-open="'preview'"
                  :toolbars-flag="false"
                  :editable="false"
                  :scroll-style="true"
                  :ishljs="true"
                  :value="item.original_content"
                />
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-col>
    <a-col v-if="'mobile' !== device" :xs="0" :sm="0" :md="6" :lg="6" :xl="6" >
      <el-card align="center" class="md-card">
        <div id="cy" style="width: 300px; height: 300px;"></div>
      </el-card>
      <el-card class="md-card">
        <div slot="header"><h3>技术栈超链接</h3></div>
        <div style="margin-bottom: 3px">
          <el-radio-group v-model="group.group_title" size="medium" @change="group.group_subtitle='';getGroupDetail()">
            <el-radio-button v-for="(item,key) in navGroup" :label="key"></el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin-bottom: 3px" >
          <el-radio-group v-model="group.group_subtitle" size="mini" @change="getGroupDetail">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button v-for="(item,key) in navGroup[group.group_title]" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <ul>
            <li v-for="item in groupDetail">
              <a :href="item.href" target="_blank">{{item.title}}</a>
            </li>
          </ul>
        </div>
      </el-card>
    </a-col>
  </a-row>
</template>
<script>
  import { categoryCY, lists } from '@/api/blog'
  import { getGroupList, getGroupDetail } from '@/api/navigation'
  import { mavonEditor } from 'mavon-editor'
  import * as echarts from 'echarts'
  import {mapGetters} from "vuex";
  import { bus } from '@/utils/bus'
  import { getUrlParam } from '@/utils/index'
  export default {
    name: 'Blog',
    components: { 'mavon-editor': mavonEditor },
    data() {
      return {
        category: [],
        navGroup:[],
        group:{
          group_title:'',
          group_subtitle:'',
        },
        groupDetail:[],
        lists: [],
        total: 0,
        listQuery: {
          category: '',
          key: '',
          page: 1,
          pageSize: 5,
        },
        cy: {
          series: [
            {
              type: 'wordCloud',
              shape: 'circle',
              // maskImage: maskImage,
              maskImage: '',
              left: 'center',
              top: 'center',
              width: '100%',
              height: '100%',
              right: null,
              bottom: null,
              sizeRange: [10, 60],
              rotationRange: [-45, 90],
              autoSize: {
                enable: true,
                minSize: 10,
              },
              textPadding: 0,
              drawOutOfBound: false,
              textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                // Color can be a callback function or a color string
                color: function () {
                  // Random color
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(',') +
                    ')'
                  )
                },
              },
              emphasis: {
                focus: 'self',

                textStyle: {
                  shadowBlur: 10,
                  shadowColor: '#333',
                },
              },
            },
          ],
        },
        loading: false,
      }
    },
    computed: {
      ...mapGetters({
        device: 'settings/device',
        accessToken: 'user/accessToken',
      }),
      noMore() {
        return this.listQuery.page * this.listQuery.pageSize >= this.total
      },
      disabled() {
        return this.loading || this.noMore
      },
    },
    activated(){

    },
    created() {
      let _this = this
      this.$nextTick(() => {
        // this.initScroll()
        window.onscroll = function () {
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop
          //变量windowHeight是可视区的高度
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight
          //变量scrollHeight是滚动条的总高度
          var scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight
          //滚动条到底部的条件
          // console.log('距顶部+可视区高度' + (scrollTop + windowHeight) + '滚动条总高度' + scrollHeight)
          if (scrollTop + windowHeight === scrollHeight) {
            //写后台加载数据的函数
            // console.log('距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight)
            if (!_this.disabled) {
              _this.load()
            }
          }
        }
      })
      this.fetchData()
    },
    mounted() {
      let code = getUrlParam('code')
      if(code!==null && !this.accessToken){//如果是微信登陆
        //根据code获取access_token
        this.$store.dispatch('user/wxLogin', {code:code})
          .then(() => {})
          .catch(() => {})
      }


      bus.$on('search',(content)=>{
        this.listQuery.key = content
        this.listQuery.page = 1
        this.getList();
      })
    },
    methods: {

      async fetchData() {
        /*分类*/
        let { data } = await categoryCY()
        this.category = data
        this.setCy()
        await this.getList()
        await this.getGroupList()
        await this.getGroupDetail()
      },
      async getList(push = false) {
        /*文章列表*/
        const { data } = await lists(this.listQuery)
        if (push) {
          for (let i in data.data) {
            this.lists.push(data.data[i])
          }
        } else {
          this.lists = data.data
        }
        this.total = data.total
      },
      async getGroupList(){
        const {data} = await getGroupList()
        this.navGroup = data
        this.group.group_title = Object.keys(data)[0]
      },
      async getGroupDetail(){
        const {data} = await getGroupDetail(this.group)
        this.groupDetail = data
      },
      setCy(){//生成词云
        let cyData = []

        for (let index in this.category) {
          cyData.push({ name: index, value: parseInt(this.category[index]) })
        }
        let maskImage = new Image()
        let cyChart = echarts.init(document.getElementById('cy'))
        maskImage.src = require('@/assets/mask/twitter.png')
        maskImage.onload = () => {
          this.cy.series[0].data = cyData
          // this.cy.series[0].maskImage = maskImage
          cyChart.setOption(this.cy)
          cyChart.on('click', (params)=> {
            this.changeCategory({'key':params.data.name})
          })
        }
      },
      changeCategory(e) {
        this.listQuery.category = e.key
        this.listQuery.page = 1
        window.scrollTo(0, 0)
        this.getList()
      },
      load() {
        this.listQuery.page = this.listQuery.page + 1
        this.getList(true)
      },
    },
  }
</script>
<style type="scss" scoped>

  @import "~@/styles/themes/neumorphism.scss";
  .left> div,.right>div{
    width: 100% !important;
    height: 100% !important;
  }
  .center{
    width:100% !important;
    height: auto!important;
    text-align: center;
  }
  .ant-menu-item{
    margin-bottom: 0!important;
  }
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0 solid #e8e8e8 !important;
  }
  .el-scrollbar >>> .categoryList {
    max-height: 80vh;
  }
  .v-note-wrapper {
    z-index: 0 !important;
    min-height: 100px;
    max-height: 450px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 9;
    overflow: hidden;
  }
  a {
    color: black;
  }
  a:hover {
    color: #1890ff;
  }
</style>
<style>
  .hljs {
    background: #f6f8fa !important;
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background: black!important;
    border: 0!important;
    -webkit-box-shadow: 0 0 0 0!important;
    box-shadow: 0 0 0 0!important;
  }
  .el-radio-button__inner{
    border: 0!important;
  }
</style>
