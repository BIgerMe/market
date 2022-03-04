<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-card class="blogCard">
          <a-card-meta>
            <template slot="title">
              <h2 style="text-align: center;white-space: normal;">{{ detail.title }}</h2>
              <div style="text-align: center;white-space: normal;">
                <a-tag>
                  <a>{{ detail.nickname }}</a>
                </a-tag>
                <a-divider type="vertical" />
                <a-tag v-for="c in detail.category">
                  <a>{{ c }}</a>
                </a-tag>
                <a-divider type="vertical" />
                <div
                  style="
                    font-family: 'Droid Serif', Georgia, 'Times New Roman',
                      'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans CN',
                      'WenQuanYi Micro Hei', 'Microsoft Yahei', serif;color: #0808087d;display: inline-block;
                  "
                >
                  {{ detail.update_at }}
                  <a-divider type="vertical" />
                  <a-icon type="eye" />&nbsp;{{detail.view}}
                  &emsp;
                  <a-icon type="message" />&nbsp;{{detail.comment}}
                </div>
              </div>
            </template>
            <template slot="description">
              <div v-if="detail.video !== '' && detail.video !==null" >
                <video style="width: 100%;max-width:500px;" controls="controls" >
                  <source :src="detail.video" type="video/mp4" />
                  Video not playing? <a :href="detail.video">Download file</a> instead.
                </video>
              </div>
              <mavon-editor
                :subfield="false"
                :default-open="'preview'"
                :toolbars-flag="false"
                :editable="false"
                :scroll-style="true"
                :ishljs="true"
                :value="detail.original_content"
              />
            </template>
          </a-card-meta>
        </a-card>
      </el-col>
      <el-col :span="24">
        <a-card class="md-card">
          <comments :blogID="$route.params.id"></comments>
        </a-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { detail } from '@/api/blog'
  import { mavonEditor } from 'mavon-editor'
  import comments from './components/comments'
  import {mapGetters} from "vuex";
  export default {
    name: 'BlogDetail',
    components: { 'mavon-editor': mavonEditor , comments },
    data() {
      return {
        detail: {
          video:''
        },
      }
    },
    created() {
      this.fetchData()
    },
    computed:{
      ...mapGetters({
        visitedRoutes: 'tabsBar/visitedRoutes',
        routes: 'routes/routes',
      }),
    },
    mounted() {},
    methods: {
      async fetchData() {
        const { data } = await detail({ id: this.$route.params.id })
        this.detail = data.data
        document.title = this.detail.title
      },
    },
  }
</script>
<style scoped>
  .v-note-wrapper {
    z-index: 1 !important;
  }
  .ant-card-meta-title {
    text-align: center !important;
  }
  .ant-card-bordered {
    border: 0 !important;
  }
  /*.v-show-content{
   padding: 0;
 }*/
</style>
<style>
  .hljs {
    background: #f6f8fa !important;
  }
</style>
