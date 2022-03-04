<template>
  <div class="index-container">
    <parentActivate :dialogVisible="visible.parentActivate" @close="visible.parentActivate = false" @success="getParentLists" />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card>
          <div slot="header">
            周岁照
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card>
          <div slot="header">
            勤劳的家长
            <a-button type="dashed" shape="circle" icon="plus" @click="visible.parentActivate = true" />
          </div>
          <el-col :lg="4" :md="6" :sm="8" :xs="24" v-for="item in zyf.parentLists">
            <el-card class="parentCard">
              <p>事情：<span><b>{{item.title}}</b></span></p>
              <p>日期：<span>{{item.date}}</span></p>
              <p>描述：<span>{{item.content}}</span></p>
            </el-card>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import parentActivate from './components/parentActivate'
  import { parentLists } from '@/api/baby'

  export default {
    name: 'Baby',
    components: { parentActivate },
    data() {
      const birth= new Date(2021,10,15); //月份0开始
      return {
        visible:{
          parentActivate:false,
        },
        zyf:{
          parentLists:[],
          age:{
            day: Math.round((Date.now() - birth.getTime()) / 86400000),
          },
          photo:{
            thirty:[
              "2021_12_11_14_03_IMG_4285.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_03_IMG_4285.JPG",
              "2021_12_11_14_03_IMG_4289.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_03_IMG_4289.JPG",
              "2021_12_11_14_01_IMG_4281.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4281.JPG",
              "2021_12_11_14_05_IMG_4298.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_05_IMG_4298.JPG",
              "2021_12_11_14_01_IMG_4277.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4277.JPG",
              "2021_12_11_14_01_IMG_4275.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4275.JPG",
              "2021_12_11_13_54_IMG_4261.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4261.JPG",
              "2021_12_11_14_03_IMG_4290.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_03_IMG_4290.JPG",
              "2021_12_11_14_00_IMG_4273.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_00_IMG_4273.JPG",
              "2021_12_11_14_01_IMG_4278.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4278.JPG",
              "2021_12_11_13_59_IMG_4266.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_59_IMG_4266.JPG",
              "2021_12_11_13_59_IMG_4269.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_59_IMG_4269.JPG",
              "2021_12_11_14_00_IMG_4274.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_00_IMG_4274.JPG",
              "2021_12_11_14_04_IMG_4295.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_04_IMG_4295.JPG",
              "2021_12_11_14_05_IMG_4299.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_05_IMG_4299.JPG",
              "2021_12_11_14_04_IMG_4296.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_04_IMG_4296.JPG",
              "2021_12_11_14_39_IMG_4322.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_39_IMG_4322.JPG",
              "2021_12_11_13_51_IMG_4247.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_51_IMG_4247.JPG",
              "2021_12_11_13_52_IMG_4250.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_52_IMG_4250.JPG",
              "2021_12_11_14_27_IMG_4306.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4306.JPG",
              "2021_12_11_14_35_IMG_4314.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_35_IMG_4314.JPG",
              "2021_12_11_14_04_IMG_4293.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_04_IMG_4293.JPG",
              "2021_12_11_13_59_IMG_4267.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_59_IMG_4267.JPG",
              "2021_12_11_14_36_IMG_4318.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_36_IMG_4318.JPG",
              "2021_12_11_14_40_IMG_4326.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4326.JPG",
              "2021_12_11_14_05_IMG_4297.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_05_IMG_4297.JPG",
              "2021_12_11_14_26_IMG_4302.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_26_IMG_4302.JPG",
              "2021_12_11_14_27_IMG_4305.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4305.JPG",
              "2021_12_11_14_27_IMG_4308.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4308.JPG",
              "2021_12_11_14_00_IMG_4271.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_00_IMG_4271.JPG",
              "2021_12_11_13_54_IMG_4255.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4255.JPG",
              "2021_12_11_14_03_IMG_4286.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_03_IMG_4286.JPG",
              "2021_12_11_13_56_IMG_4265.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_56_IMG_4265.JPG",
              "2021_12_11_14_27_IMG_4309.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4309.JPG",
              "2021_12_11_13_52_IMG_4252.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_52_IMG_4252.JPG",
              "2021_12_11_13_49_IMG_4243.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_49_IMG_4243.JPG",
              "2021_12_11_13_50_IMG_4245.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_50_IMG_4245.JPG",
              "2021_12_11_13_51_IMG_4249.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_51_IMG_4249.JPG",
              "2021_12_11_13_54_IMG_4254.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4254.JPG",
              "2021_12_11_13_59_IMG_4268.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_59_IMG_4268.JPG",
              "2021_12_11_14_04_IMG_4292.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_04_IMG_4292.JPG",
              "2021_12_11_14_26_IMG_4301.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_26_IMG_4301.JPG",
              "2021_12_11_14_04_IMG_4294.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_04_IMG_4294.JPG",
              "2021_12_11_13_51_IMG_4246.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_51_IMG_4246.JPG",
              "2021_12_11_14_03_IMG_4287.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_03_IMG_4287.JPG",
              "2021_12_11_14_01_IMG_4279.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4279.JPG",
              "2021_12_11_14_01_IMG_4282.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4282.JPG",
              "2021_12_11_14_04_IMG_4291.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_04_IMG_4291.JPG",
              "2021_12_11_14_02_IMG_4283.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_02_IMG_4283.JPG",
              "2021_12_11_13_59_IMG_4270.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_59_IMG_4270.JPG",
              "2021_12_11_14_00_IMG_4272.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_00_IMG_4272.JPG",
              "2021_12_11_14_39_IMG_4323.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_39_IMG_4323.JPG",
              "2021_12_11_14_39_IMG_4320.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_39_IMG_4320.JPG",
              "2021_12_11_14_01_IMG_4280.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4280.JPG",
              "2021_12_11_14_36_IMG_4316.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_36_IMG_4316.JPG",
              "2021_12_11_13_54_IMG_4259.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4259.JPG",
              "2021_12_11_13_56_IMG_4263.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_56_IMG_4263.JPG",
              "2021_12_11_13_54_IMG_4257.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4257.JPG",
              "2021_12_11_14_03_IMG_4288.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_03_IMG_4288.JPG",
              "2021_12_11_13_54_IMG_4260.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4260.JPG",
              "2021_12_11_14_02_IMG_4284.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_02_IMG_4284.JPG",
              "2021_12_11_14_27_IMG_4310.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4310.JPG",
              "2021_12_11_13_56_IMG_4262.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_56_IMG_4262.JPG",
              "2021_12_11_14_01_IMG_4276.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_01_IMG_4276.JPG",
              "2021_12_11_13_56_IMG_4264.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_56_IMG_4264.JPG",
              "2021_12_11_13_52_IMG_4251.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_52_IMG_4251.JPG",
              "2021_12_11_13_54_IMG_4258.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4258.JPG",
              "2021_12_11_14_05_IMG_4300.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_05_IMG_4300.JPG",
              "2021_12_11_14_40_IMG_4327.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4327.JPG",
              "2021_12_11_14_36_IMG_4319.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_36_IMG_4319.JPG",
              "2021_12_11_14_27_IMG_4307.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4307.JPG",
              "2021_12_11_14_40_IMG_4330.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4330.JPG",
              "2021_12_11_14_26_IMG_4303.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_26_IMG_4303.JPG",
              "2021_12_11_14_40_IMG_4329.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4329.JPG",
              "2021_12_11_13_54_IMG_4256.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_54_IMG_4256.JPG",
              "2021_12_11_14_29_IMG_4312.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_29_IMG_4312.JPG",
              "2021_12_11_14_26_IMG_4304.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_26_IMG_4304.JPG",
              "2021_12_11_13_52_IMG_4253.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_52_IMG_4253.JPG",
              "2021_12_11_14_40_IMG_4331.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4331.JPG",
              "2021_12_11_14_40_IMG_4325.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4325.JPG",
              "2021_12_11_14_39_IMG_4324.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_39_IMG_4324.JPG",
              "2021_12_11_14_40_IMG_4328.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_40_IMG_4328.JPG",
              "2021_12_11_14_27_IMG_4311.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_27_IMG_4311.JPG",
              "2021_12_11_14_35_IMG_4315.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_35_IMG_4315.JPG",
              "2021_12_11_14_35_IMG_4313.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_35_IMG_4313.JPG",
              "2021_12_11_13_51_IMG_4248.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_51_IMG_4248.JPG",
              "2021_12_11_14_39_IMG_4321.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_39_IMG_4321.JPG",
              "2021_12_11_13_49_IMG_4244.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_49_IMG_4244.JPG",
              "2021_12_11_14_36_IMG_4317.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_14_36_IMG_4317.JPG",
              "2021_12_11_13_49_IMG_4242.JPG","http://r4ia1p4jy.hd-bkt.clouddn.com/2021_12_11_13_49_IMG_4242.JPG"
            ]
          }
        }
      }
    },
    created() {
      this.getParentLists() //事件列表
    },
    methods: {
      async getParentLists(){
        const { data } = await parentLists()
        this.zyf.parentLists = data
      }
    },
  }
</script>
<style lang="scss">
  .el-card>.el-card__header{
    padding: 10px !important;
    border-bottom:0 !important;
  }
  .parentCard{
    border-radius: 20px;
    background: #ffffff;
    box-shadow:  -12px 12px 24px #616161,
    12px -12px 24px #ffffff!important;
    p{
      margin-bottom: 3px!important;
      color: #00000069;
    }
    span{
      color:#282c34ed
    }
  }
</style>
