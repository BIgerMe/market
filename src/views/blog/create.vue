<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-col :xs="24" :md="8">
            <el-form-item>
              <el-input v-model="form.title" style="width:400px">
                <template slot="prepend">标题</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.cover" style="width:400px">
                <template slot="prepend">封面图片</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item>
              <el-input v-model="form.video" style="width:400px">
                <template slot="prepend">开头视频链接</template>
              </el-input>
            </el-form-item>
            <div>
              <video width="320" height="240" v-if="form.video !== '' && form.video !==null" controls="controls" >
                <source :src="form.video" type="video/mp4" />
                Video not playing? <a :href="form.video">Download file</a> instead.
              </video>
            </div>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="分类">
              <el-select v-model="form.category" filterable clearable allow-create multiple placeholder="活动区域">
                <el-option v-for="item in options.category" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-radio-group v-model="form.private" size="small">
                <el-radio-button label="0">私有</el-radio-button>
                <el-radio-button label="1">公开</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-card class="blogCard">
          <a-card-meta>
            <template slot="description">
              <mavon-editor
                v-model="form.original_content" ref=md @imgAdd="$imgAdd" @save="$save" :toolbars="markdownOption" style="max-height:75vh"
              />
            </template>
          </a-card-meta>
        </a-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { uploadImg } from '@/api/qiniu'
  import { createBlog } from '@/api/blog'
  import { mavonEditor } from 'mavon-editor'
  import Vue from "vue";
  export default {
    name: 'CreateBlog',
    components: { 'mavon-editor': mavonEditor },
    data() {
      return {
        options:{
          category:['博客','php','python','java','html','vue','js'],
        },
        form:{
          title:'',
          category:[],
          private:'0',
          cover:'',
          video:'',
          original_content: '',
        },
        markdownOption:{
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    methods: {
      // 绑定@imgAdd event
      async $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        const formdata = new FormData();
        formdata.append('file', $file);
        const { data }  = await uploadImg(formdata);
        this.$refs.md.$img2Url(pos, data[0]);
      },
      async $save(md,content){
        var funDownload = function (content, filename) {
          var eleLink = document.createElement('a');
          eleLink.download = filename;
          eleLink.style.display = 'none';
          // 字符内容转变成blob地址
          var blob = new Blob([content]);
          eleLink.href = URL.createObjectURL(blob);
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        };
        let html = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title></title>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css">
</head>
<style type="text/css">
img{
    max-width: 100%;
}
</style>
<body style="width:80%;margin-left:10%">`
        let title = "<div style='text-align: center!important;'><h3>"+this.form.title+"</h3></div>";

        html += title+content+"</body></html>"
        funDownload(html,this.form.title+'.html')
      },
      async onSubmit(){
        await createBlog(this.form)
        Vue.prototype.$baseNotify(`新增成功`)
        this.$router.replace('/blog/self')
      }
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
