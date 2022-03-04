<template>
  <div class="store-home">
    <div class="store-intro">
      <svg class="store-intro__logo" x="0px" y="0px" viewBox="0 0 90.2 106.9">
        <polygon fill="#FFFFFF" points="88.4,26.5 45.1,53 1.9,26.5 45.1,0 "></polygon>
        <polygon fill="#FFFFFF" points="0,38.6 38.7,62.8 38.7,106.9 0,82.8 "></polygon>
        <polygon fill="#FFFFFF" points="50,106.9 50,62.8 90.2,38.6 90.2,82.8 "></polygon>
      </svg>
      <el-row :gutter="10" class="part1">
        <el-col :lg="24" class="s_category_position">
          <ul class="s_category">
            <li class="s_category_li" v-for="item in category">
<!--              <img width="28" height="28" alt="FBX" src="https://static.sketchfab.com/static/builds/web/dist/static/assets/images/pages/store/filetype/ba08cdb4ad341832ef356da8bdd68264-v2.svg">-->
              <a :title="item.title" href="#">{{item.title}}<span>{{item.subtitle}}</span></a>
            </li>
          </ul>
        </el-col>
        <el-col :lg="24">
          <el-col :lg="8" v-for="(item, index) in top" >
            <el-card class="goods-card">
              <router-link :to="{ name: 'shopping_detail',params: { id: item.id }}">
                <img v-if="item.cover" :src="item.cover" class="image">
              </router-link>
              <div class="content">
                <h3>{{item.title}}</h3>
                <div class="price-info">
                  <em class="sale"><strong>18</strong>%<span class="icon">OFF</span></em>
                  <span class="price" aria-hidden="true">
                    <span class="price-symbol">¥</span>
                    <span class="price-whole">{{item.price_int}}<span class="price-decimal">.</span></span>
                    <span class="price-fraction">{{item.price_decimal}}</span>
                  </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: -70px;">
      <el-row :gutter="20">
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-col :lg="6" v-for="(item, index) in subTop">
              <el-card class="goods-card">
                  <router-link :to="{ name: 'shopping_detail',params: { id: item.id }}">
                      <img v-if="item.cover" :src="item.cover" class="subImage">
                  </router-link>
                  <div class="content">
                      <h3>{{item.title}}</h3>
                      <div class="price-info">
                          <em class="sale"><strong>18</strong>%<span class="icon">OFF</span></em>
                          <span class="price" aria-hidden="true">
                    <span class="price-symbol">¥</span>
                    <span class="price-whole">{{item.price_int}}<span class="price-decimal">.</span></span>
                    <span class="price-fraction">{{item.price_decimal}}</span>
                  </span>
                      </div>
                  </div>
              </el-card>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="s_case" style="padding-top: 160px">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {goodsLists,categoryList} from '@/api/shopping'
  export default {
    name: 'shopping_home',
    data() {
      return {
        top:null,
        subTop:null,
        category:[
          { title:'购 物',subtitle:'Shopping',},
          { title:'拍 卖',subtitle:'Auction',},
          { title:'交 换',subtitle:'exchange',},
          { title:'闲 置',subtitle:'Idle',},
          { title:'赠 送',subtitle:'Present',},
          { title:'导 购',subtitle:'Guide',},
        ]
      }
    },
    computed: {
      ...mapGetters({
        device: 'settings/device',
      }),
    },
    components:{  },
    mounted() {
        this.getTopList()
        this.getSubTopList()
    },
    beforeDestroy() {},
    methods: {
        async getTopList(){
            const {data} = await goodsLists({page:1,pageSize:3})
            this.top = data.data
        },
        async getSubTopList(){
            const {data} = await goodsLists({page:1,pageSize:8,offset:3})
            this.subTop = data.data
        }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";

  .button{
    float:right
  }
  .el-card.goods-card{
    border: 0;
    border-radius: 0;
    img.image{
      width: 100%;height: 300px
    }
    img.subImage{
      width: 100%;height: 200px
    }
    .content {
      /*height: 100px;*/
      h3 {
        padding: 15px 15px 0 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price-info{
        padding-right: 3px;
        .sale{
          overflow: hidden;
          display: inline-block;
          bottom: 10px;
          left: 20px;
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
        .price{
          float:right;
          .price-symbol,.price-decimal,.price-fraction{
            position: relative;
            top: -.75em;
            font-size: 13px;
          }
          .price-whole{
            font-size: 22px;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .goods-card {
    .el-card__body{
      padding: 0!important;
    }
  }
</style>
