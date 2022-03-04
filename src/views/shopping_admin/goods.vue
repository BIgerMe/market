<template>
  <div>
    <el-row :gutter="10">
      <el-col :lg="24" style="margin-bottom: 10px">
        <el-button type="primary" plain round icon="el-icon-plus">
          <router-link :to="{ name: 'shopping_goods_add'}">新增商品</router-link>
        </el-button>
      </el-col>
      <el-col :lg="24">
        <el-card class="md-light-card">
          <el-table :data="goods">
            <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="300" align="center"></el-table-column>
            <el-table-column prop="cover" label="封面图片">
              <template slot-scope="{row}">
                <el-image
                  v-if="row.cover"
                  style="width: 50px; height: 50px"
                  :src="row.cover"
                  :preview-src-list="row.imgList">
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="所属分类">
              <template slot-scope="{row}">
                <el-tag style="margin: 3px" v-for="item in row.category">
                  {{item}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="一口价"></el-table-column>
            <el-table-column prop="origin_price" label="原单价"></el-table-column>
            <el-table-column prop="storage" label="库存"></el-table-column>
            <el-table-column label="是否上架">
              <template slot-scope="{row}">
                <el-tag v-if="row.shelf==1" type="success">上架</el-tag>
                <el-tag v-else type="danger">下架</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="推荐指数">
              <template slot-scope="{row}">
                <el-rate disabled v-model="row.recommend"></el-rate>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button type="warning" size="mini" icon="el-icon-edit" @click="showEdit(row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="listQuery.total > 0"
            :total="listQuery.total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="编辑" width="80%" :visible.sync="editFormVisible" @close="handleCancel">
      <el-form ref="form" :model="form" label-width="160px">
        <el-card class="box-card">
          <div class="el-card__body" style="height: 80vh;overflow-y: scroll;border-bottom: 1px #eeeeee solid;margin-bottom: 10px">
            <el-tabs v-model="activeName" >
              <el-tab-pane label="基础设置" name="first">
                <el-row>
                  <el-col :lg=24>
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="form.title" maxlength="255" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="封面视频">
                      <el-input v-model="form.video"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                      <div class="editor-container">
                        <dropzone id="picture" ref="picture" url="//xxroom.xyz/z/qiniu/uploadImg"
                                  :default-img="form.imgList ? form.imgList : []"
                                  @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
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
            <el-button type="primary" @click="handleSubmit('form')">保存更新</el-button>
            <el-button @click="handleCancel()">取消</el-button>
          </div>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {goodsLists,updateGoods} from '@/api/shopping_admin'
  import Pagination from '@/components/Pagination'
  import Dropzone from '@/components/Dropzone'
  import Vue from "vue";

  export default {
    name: 'shopping_goods',
    components:{ Pagination,Dropzone },
    data() {
      return {
        options:{
          category:['电器','衣服','玩具'],
        },
        activeName:'first',
        editFormVisible:false,
        form:{
          id:'',
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
        },
        goods:null,
        listQuery:{
          total:0,
          page:1,
          pageSize:10,
          category:'',
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }]
        }
      }
    },
    computed: {
      ...mapGetters({
        device: 'settings/device',
      }),
    },
    mounted() {
      this.getList();
    },
    beforeDestroy() {},
    methods: {
      async getList(){
        const {data} = await goodsLists(this.listQuery)
        this.goods = data.data
        this.listQuery.total = data.total
      },
      showEdit(r) {
        this.form = JSON.parse(JSON.stringify(r))
        this.editFormVisible = true
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateGoods(this.form).then(res => {
                Vue.prototype.$baseNotify(`更新成功`)
                this.getList()
                this.editFormVisible = false
            })

          } else {
            console.log('error submit!!')
            return false
          }
        })
        document.querySelector('.dz-preview').forEach(el=>el.remove())
        // $('.dz-preview').remove()
        this.$refs['picture'].initOnceStatus()
      },
      handleCancel() { // 取消
        this.editFormVisible = false
        // $('.dz-preview').remove()
        document.querySelectorAll('.dz-preview').forEach(el=>el.remove())
        this.$refs['picture'].initOnceStatus()
      },
      changePic(){
        let pictures = []
        let imgNode = document.querySelectorAll('#picture img')
        for(let i=0;i<imgNode.length;i++){
          pictures.push(imgNode[i].src)
        }
        this.form.imgList = pictures
      },
      /* 图片上传*/
      dropzoneS(file, response) {
        file.previewElement.getElementsByTagName('img')[0].src = JSON.parse(response)['data'][0] // data替换成七牛URL
        this.changePic()
        this.$message({ message: '上传成功', type: 'success' })
      },
      dropzoneR(file, dom) {
        this.changePic()
        this.$message({ message: '删除成功', type: 'success' })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
