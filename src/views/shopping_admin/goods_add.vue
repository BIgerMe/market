<template>
  <div style="padding:30px;">
    <el-form ref="form" :model="form" label-width="160px">
      <el-card class="box-card">
        <div class="el-card__body" style="height: 80vh;overflow-y: scroll;border-bottom: 1px #eeeeee solid;margin-bottom: 10px">
          <el-tabs v-model="activeName" >
            <el-tab-pane label="基础设置" name="first">
              <el-row>
                <el-col :lg=24>
                  <el-form-item label="名称">
                    <el-input v-model="form.title" maxlength="255" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="封面视频">
                    <el-input v-model="form.video"></el-input>
                  </el-form-item>
                  <el-form-item label="图片">
                    <div class="editor-container">
                      <dropzone id="picture" url="//xxroom.xyz/z/qiniu/uploadImg" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
                    </div>
                  </el-form-item>
                  <el-form-item label="分类">
                    <el-select
                      style="width: 100%"
                      v-model="form.category"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择分类标签">
                      <el-option
                        v-for="item in options.category"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>

                </el-col>
                <el-col :lg="24">
                  <el-col :lg="6">
                    <el-form-item label="一口价">
                      <el-input-number v-model="form.price" controls-position="right" :precision="2" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label="原单价">
                      <el-input-number v-model="form.origin_price" controls-position="right" :precision="2" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label="库存">
                      <el-input-number v-model="form.storage" controls-position="right" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label="单位">
                      <el-input v-model="form.unit" controls-position="right"></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :lg="24">
                  <el-col :lg="6">
                    <el-form-item label="最少购买数量">
                      <el-input-number v-model="form.min" controls-position="right" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label="最多购买数量">
                      <el-input-number v-model="form.max" controls-position="right" :step="1" :min="0"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label="上架状态">
                      <el-radio-group v-model="form.shelf" size="small">
                        <el-radio-button label="1">上架</el-radio-button>
                        <el-radio-button label="0">下架</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label="推荐">
                      <el-rate v-model="form.recommend"></el-rate>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
            </el-tab-pane>
<!--            <el-tab-pane label="规格属性" name="second">规格属性</el-tab-pane>-->
<!--            <el-tab-pane label="媒体设置" name="third">媒体设置</el-tab-pane>-->
<!--            <el-tab-pane label="商品详情" name="fourth">商品详情</el-tab-pane>-->
          </el-tabs>
        </div>
        <div class="el-footer">
          <el-button type="primary" @click="handleSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import {createGoods} from '@/api/shopping_admin'
  import Dropzone from '@/components/Dropzone'
  import Vue from "vue";
  export default {
    name: 'shopping_goods_add',
    components: { Dropzone },
    data() {
      return {
        options:{
          category:['电器','衣服','玩具'],
        },
        activeName: 'first',
        form: {
          title:'',
          cover:'',
          video:'',
          imgList:[],
          price:'',
          origin_price:'',
          unit:'件',
          min:0,
          max:0,
          storage:0,
          shelf:'0',
          recommend:0,
          category:[],
        }
      };
    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {
      /* 图片上传*/
      dropzoneS(file, response) {
        file.previewElement.getElementsByTagName('img')[0].src = JSON.parse(response)['data'][0] //data替换成七牛URL
        this.changePic()
        Vue.prototype.$baseNotify(`上传成功`)
      },
      dropzoneR(file, dom) {
        this.changePic()
        Vue.prototype.$baseNotify(`删除成功`)
      },
      changePic(){
        let pictures = []
        let imgNode = document.querySelectorAll('#picture img')
        for(let i=0;i<imgNode.length;i++){
          pictures.push(imgNode[i].src)
        }
        this.form.imgList = pictures
      },
      handleSubmit() {
        createGoods(this.form).then(response => {
          Vue.prototype.$baseNotify(`新增成功`)
        })
      }
    }
  };
</script>
