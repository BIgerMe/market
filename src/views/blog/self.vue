<template>
  <a-row :gutter="20">
    <a-col :xs="0" :sm="24" :md="3" :lg="3" :xl="3" class="left" style="max-height: 80vh">
      <a-affix :offset-top="80">
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
              <a-menu-item v-for="(item, index) in category" :key="index">
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
    <a-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
      <el-card shadow="always">
        <a-card v-for="item in lists" class="md-card">
          <img
            v-if="item.cover"
            slot="cover"
            :src="item.cover"
            class="cover"
          />
          <a-card-meta>
            <template slot="title">
              <a-button
                type="link"
                @click="showBlogDetail(item.original_content,item.video)"
              >
                <h3>{{ item.title }}</h3>
              </a-button>
              <router-link
                :to="{ name: 'UpdateBlog', params: { id: item.id } }"
              >
                <a-button style="float: right" type="dashed" shape="circle" icon="edit" />
              </router-link>
              <div>
                <a-tag v-if="item.private == 1" color="blue"><a>公开</a></a-tag>
                <a-tag v-else color="red"><a>私有</a></a-tag>
                <a-divider type="vertical" />
                <a-tag v-for="c in item.category">
                  <a>{{ c }}</a>
                </a-tag>
                <a-divider type="vertical" />
                <span
                  style="
                    font-family: 'Droid Serif', Georgia, 'Times New Roman',
                      'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans CN',
                      'WenQuanYi Micro Hei', 'Microsoft Yahei', serif;
                  "
                >
                  {{ item.update_at }}
                </span>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </el-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="right">
      <a-affix :offset-top="80">
        <el-scrollbar
          wrap-class="blogDetail"
          wrap-style="color: red;"
          view-style="font-weight: bold;"
          view-class="view-box"
          :native="false"
        >
          <el-card shadow="always">
            <a-card-meta>
              <template slot="description">
                <div>
                  <video style="width: 100%;max-width:500px;" v-if="video !== '' && video !==null" controls="controls" >
                    <source :src="video" type="video/mp4" />
                    Video not playing? <a :href="video">Download file</a> instead.
                  </video>
                </div>
                <a-skeleton v-if="blogDetail == ''"></a-skeleton>
                <mavon-editor
                  v-else
                  :subfield="false"
                  :default-open="'preview'"
                  :toolbars-flag="false"
                  :editable="false"
                  :scroll-style="true"
                  :ishljs="true"
                  :value="blogDetail"
                />
              </template>
            </a-card-meta>
          </el-card>
        </el-scrollbar>
      </a-affix>
    </a-col>
  </a-row>
</template>
<script>
  import { selfCategoryCY, selfLists } from '@/api/blog'
  import { mavonEditor } from 'mavon-editor'
  import { bus }  from '@/utils/bus'
  export default {
    name: 'BlogSelf',
    components: { 'mavon-editor': mavonEditor },
    data() {
      return {
        blogDetail: '',
        video:'',
        category: [],
        lists: [],
        total: 0,
        listQuery: {
          category: '',
          key: '',
          page: 1,
          pageSize: 5,
        },
        loading: false,
      }
    },
    computed: {
      noMore() {
        return this.listQuery.page * this.listQuery.pageSize >= this.total
      },
      disabled() {
        return this.loading || this.noMore
      },
    },
    activated() {},
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
          if (scrollTop + windowHeight > scrollHeight-10) {
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
      bus.$on('search',(content)=>{
        this.listQuery.key = content
        this.listQuery.page = 1
        this.getList();
      })
    },
    methods: {
      async fetchData() {
        /*分类*/
        let { data } = await selfCategoryCY()
        this.category = data
        this.getList()
      },
      async getList(push = false) {
        /*文章列表*/
        const { data } = await selfLists(this.listQuery)
        if (push) {
          for (let i in data.data) {
            this.lists.push(data.data[i])
          }
        } else {
          this.lists = data.data
        }
        this.total = data.total
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
      showBlogDetail(value,video) {
        this.blogDetail = value
        this.video = video
      },
    },
  }
</script>
<style type="text/css" scoped>
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
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0 solid #e8e8e8 !important;
  }
  .el-scrollbar >>> .categoryList {
    max-height: 80vh;
  }
  .el-scrollbar >>> .blogDetail {
    max-height: 80vh;
  }

  .v-note-wrapper {
    z-index: 1 !important;
    /*min-height:100px;*/
    /*max-height: 450px;*/
    overflow: hidden;
    /*text-overflow:ellipsis;*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 9;
    /*overflow: hidden;*/
  }
  a {
    color: black;
  }
  a:hover {
    color: #1890ff;
  }
</style>
