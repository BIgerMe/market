<template>
  <div class="store-home">
    <el-row :gutter="20" class="part1">
      <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
        <div style="height:100px"></div>
      </el-col>
      <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
        <el-col :lg="9" id="goods-img">

          <imgZoom  :width="width"  :height="height" :minIMGsrc="coverImg" :scale="3" />

          <div class="thumb-list">
            <div id="thumb-list">
              <ul class="thumb">
                <li v-for="item in form.imgList" class="thumb-li"
                    @mouseover="selectStyle(item)"
                    :class="{'active':item===coverImg}"
                >
                  <img style="width: 50px;height: 50px" :src="item">
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :lg="15">
          <el-card class="md-light-card">
            <h2>{{form.title}}</h2>
            <div>
              <span aria-hidden="true">
                <span class="price-symbol">¥</span>
                <span class="price-whole">{{form.price_int}}<span class="price-decimal">.</span></span>
                <span class="price-fraction">{{form.price_decimal}}</span>
                <em class="sale"><strong>18</strong>%<span class="icon">OFF</span></em>
              </span>
            </div>

            <div >
              <el-input-number v-model="order.num" controls-position="right" :min="1" :max="10"></el-input-number> 件
              &emsp;
            </div>
            <div style="margin-top: 20px">
              <el-button type="danger" size="large" round><b>现在购买</b></el-button>
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import imgZoom from './components/imgZoom'
  import {goodsDetail} from '@/api/shopping'
  import {mapGetters} from "vuex";
  export default {
    name: 'shopping_detail',
    data() {
      return {
        order:{
          num:1
        },
        coverImg:'',
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
        width:420,
        height:420,
      }
    },
    computed: {
      ...mapGetters({
        device: 'settings/device',
      }),
    },
    components:{ imgZoom },
    created() {
      this.fetchData()
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
      async fetchData() {
        const { data } = await goodsDetail({ id: this.$route.params.id })
        this.form = data
        this.coverImg = data.cover
      },
      selectStyle(item) {
        this.coverImg = item
      },
    },
  }
</script>

<style scoped>
  .price-symbol,.price-decimal,.price-fraction{
    position: relative;
    top: -.75em;
    font-size: 13px;
  }
  .price-whole{
    font-size: 28px;
  }

</style>
<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";
  .thumb-list{
    width:420px;
    margin-top: 10px;
    #thumb-list{
      overflow: hidden;
      .thumb{
        width: 500px;
        padding: 0;
        .thumb-li{
          display:inline;
          margin: 0 3px;
        }
        .thumb-li.active>img{
          border: 2px solid #e53e41;
        }
      }
    }
  }
  .image{
    width: 100%;
    opacity:0.1;
    display: block;
  }
  .button{
    float:right
  }
  .sale{
    margin-left: 20px;
    color: #ff3100;
    font-family: Tahoma;
    font-size: 18px;
    .icon{
      overflow: hidden;
      display: inline-block;
      margin-left: 3px;
      width: 13px;
      height: 13px;
      background: url(//pics.gmarket.co.kr/pc/gc/main/gc_main.png) no-repeat -400px 0;
      color: #fff;
      font-size: 0;
      text-indent: -999em;
    }
  }
</style>

