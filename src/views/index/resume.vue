<template>
  <div class="home">
    <div class="intro">
      <svg class="intro__logo" x="0px" y="0px" viewBox="0 0 90.2 106.9">
        <polygon fill="#FFFFFF" points="88.4,26.5 45.1,53 1.9,26.5 45.1,0 "></polygon>
        <polygon fill="#FFFFFF" points="0,38.6 38.7,62.8 38.7,106.9 0,82.8 "></polygon>
        <polygon fill="#FFFFFF" points="50,106.9 50,62.8 90.2,38.6 90.2,82.8 "></polygon>
      </svg>
      <el-row :gutter="10" class="part1">

        <el-col :lg="24" style="text-align: center">
          <a-avatar :size="180" src="//head.xxroom.xyz/FqzFUt7BPKcmeeiRG-881b8ydgXE" />

          <h1 class="title">张 晓 明</h1>
          <h2 class="subtitle">IT工程师、软件设计师（证书）、全栈开发工程师</h2>
          <p>
            <a-button type="dashed"><router-link :to="{ name: 'resume'}">中文</router-link></a-button>&emsp;
            <a-button type="dashed"><router-link :to="{ name: 'resume_en'}">english</router-link></a-button>
          </p>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: -150px;display:flex;flex-direction: column;">
      <el-row>
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-card v-if="device !=='mobile'" class="md-card">
            <div id="skill" style= "width: auto;height: 400px"></div>
            <div>
              <b>后端：</b>熟悉php、python、apache、nginx；了解java、c语言、docker<br>
              <b>数据：</b>熟悉mysql、sqlserver、redis；了解mangodb、oracle<br>
              <b>前端：</b>熟悉vue及相应框架常用组件应用、HTML、css、js、scss、bootstrap<br>
              <b>其他：</b>熟悉git、svn代码管理项、windows、linux(centos,ubuntu)、photoshop；了解算法、3d技术、blender模型制作、npl神经网络等<br>
            </div>
<!--          </el-card>-->
<!--          <el-card v-else>-->
<!--            <div id="skill" style="width: auto;height: 400px"></div>-->
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 0px;display:flex;flex-direction: column;">
      <el-row>
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-card class="md-card">
            <el-descriptions :column="device !== 'mobile'? 3 : 1" title="个人基础信息" border>
              <el-descriptions-item label="姓名">张晓明</el-descriptions-item>
              <el-descriptions-item label="生日">1991-07-10</el-descriptions-item>
              <el-descriptions-item label="年龄">30</el-descriptions-item>
              <el-descriptions-item label="毕业院校">南京航空航天大学</el-descriptions-item>
              <el-descriptions-item label="学历">本科</el-descriptions-item>
              <el-descriptions-item label="工作年龄">7年</el-descriptions-item>
              <el-descriptions-item label="籍贯">常州</el-descriptions-item>
              <el-descriptions-item label="民族">汉</el-descriptions-item>
              <el-descriptions-item label="婚育状况">已婚已育</el-descriptions-item>
              <el-descriptions-item :span="3" label="个人最新站点">
                <el-link href="http://xxroom.xyz">http://xxroom.xyz</el-link> 注：暂时关闭ssl，避免静态资源费用
              </el-descriptions-item>
              <el-descriptions-item :span="3" label="求职意向">
                <el-tag style="margin: 3px">全职</el-tag>
                <el-tag style="margin: 3px"><i class="el-icon-location"></i>无锡、常州</el-tag>
                <el-tag style="margin: 3px">薪资面议</el-tag>
                <el-tag style="margin: 3px">约定时间到岗</el-tag>
              </el-descriptions-item>
              <el-descriptions-item >
                <template slot="label"><i class="el-icon-mobile-phone"></i> 手机号</template>
                15716197390
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-message"></i> 邮箱</template>
                2260891938@qq.com
              </el-descriptions-item>

            </el-descriptions>

          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 0px;display:flex;flex-direction: column;">
      <el-row>
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-card :class="device !=='mobile' ? 'md-card' : 'md-card'">
            <h3 align="center"><b>校园经历</b></h3>
            <el-timeline>
              <el-timeline-item color="green" timestamp="2004.9 - 2007.6" placement="top">
                <h4><b>（初中）常州市武进区前黄实验学校</b></h4>
<!--                <p>成绩并不稳定，除了数学成绩较好且稳定，其余并不突出。2次重要的直升考试和中考出乎意料的成绩优异。</p>-->
<!--                <p>喜欢打篮球、游戏war3、动漫火影忍者（每周半天假期活动大概率在这些之间）</p>-->
              </el-timeline-item>
              <el-timeline-item color="blue" timestamp="2007.9 - 2010.6" placement="top">
                <h4><b>（高中）江苏省前黄高级中学</b></h4>
<!--                <p>高一直升的教改班成绩很糟糕，压力很大屡次垫底；高二选的物理生物，成绩起色不大且不稳定；高三逐渐稳定，数学稳定前三，其余普通；高考成绩出乎意料，全班第一。</p>-->
<!--                <p>喜欢打篮球（受牛人影响兴趣浓厚）、游戏war3、魔兽世界、杂志周刊等（每周半天假期活动大概率在这些之间）</p>-->
              </el-timeline-item>
              <el-timeline-item color="red" timestamp="2010.9 - 2014.6" placement="top">
                <h4><b>（大学）南京航空航天大学 （专业）自动化学院-测控技术与仪器</b></h4>
<!--                <p>不够努力，回想起来有点杂陈，挂科较多，很多科目勉强通过。即便如此，大学过的很愉快，宿舍、班级、专业、学院的朋友们真的很暖。</p>-->
<!--                <p>喜欢打篮球（院队）、电竞（电竞社副社长）（活动时间多，业余很强，职业入门）</p>-->
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 0px;display:flex;flex-direction: column;">
      <el-row>
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-card :class="device !=='mobile' ? 'md-card' : 'md-card'">
            <h3 align="center"><b>工作经历</b></h3>
            <el-timeline>
              <el-timeline-item color="red" timestamp="2014.7 - 2015.6" placement="top">
                <h4><b>江苏常发农业装备股份有限公司 - 技术销售</b></h4>
              </el-timeline-item>
              <el-timeline-item color="green" timestamp="2015.7 - 2017.4" placement="top">
                <h4><b>南京途牛旅游网 - 软件工程师</b></h4>
                <p>负责软件测试及环境搭建，期间部门调整后学习PHP开发，开始入手开发工作，熟悉了会员系统、预订系统、CRM等。</p>
              </el-timeline-item>
              <el-timeline-item color="green" timestamp="2017.5 - 2018.8" placement="top">
                <h4><b>江苏鼎昊信息技术有限公司 - PHP开发工程师</b></h4>
                <p>负责 WEB 端搭建、微信公众号、APP 接口开发,与第三方IM对接开发、大数据、数据迁移、新框架easyswoole搭建</p>
                <p>负责业务属于校园管理类SAAS平台，稳定提供多校园服务，与融资方协同开发业务合并，平台前后端分离改版升级。</p>
              </el-timeline-item>
              <el-timeline-item color="green" timestamp="2018.8 - 2019.6" placement="top">
                <h4><b>江苏微盛网络科技有限公司 - 软件开发工程师</b></h4>
                <p>负责小程序、公众号开发，房产、医疗项目负责人。独立负责多个外包公众号小程序开发上线、版本升级。</p>
              </el-timeline-item>
              <el-timeline-item color="green" timestamp="2019.6 - 2020.4" placement="top">
                <h4><b>江苏无锡新意科技有限公司 - 软件工程师</b></h4>
                <p>金融项目（多平台多渠道PHP+JAVA），负责与第三方银行渠道对接、与下游业务对接支付渠道，独立负责PHP平台搭建、稳定运行、维护和安全监控，协同JAVA业务接口开发，前端VUE开发，部署自动化程序。</p>
              </el-timeline-item>
              <el-timeline-item color="green" timestamp="2020.4至今" placement="top">
                <h4><b>常州科腾纺织品有限公司 - IT工程师</b></h4>
                <p>全栈php+vue开发包括oa、o2o、sap、CRM、SRM、物流、成本分析、头寸统计等包含全平台的内容，全面升级旧平台的开发流程，项目架构和技术栈应用，设置定时文件备份及安全防护部署；python脚本部署定时自动抓取行业数据；提供行业分析数据；
                为业务、金融、中台、物流、财务多部门运行提供稳定可靠高性能的支持。</p>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 0px;display:flex;flex-direction: column;">
      <el-row>
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-card :class="device !=='mobile' ? 'md-card' : 'md-card'">
            <h3 align="center"><b>项目经历</b></h3>
            <el-timeline>
              <el-timeline-item color="green"  placement="top">
                <h4><b>项目一</b></h4>
                <div>项目名称：校园SAAS平台</div>
                <div>项目介绍：提供多校的校园系统支持</div>
                <div>项目模块：学生、教师、考试、作业、家庭等</div>
                <div>项目职责：负责 WEB 端搭建、微信公众号、APP 接口开发,与第三方IM对接开发、大数据、数据迁移、新框架easyswoole搭建，与融资方协同开发业务合并，平台前后端分离改版升级。</div>
              </el-timeline-item>
              <el-timeline-item color="green"  placement="top">
                <h4><b>项目二</b></h4>
                <div>项目名称：医疗项目</div>
                <div>项目介绍：腾讯旗下医疗项目小程序</div>
                <div>项目模块：医院详情、科室、医生、挂号、检查检验、病例、电子报告等</div>
                <div>项目职责：项目推进负责人，日常对标难点、进度与第三方进行远程项目需求交流，项目需求规划；功能逻辑梳理，PHP MVC自写框架开发所有api接口,与前端小程序端接口对接，整体测试上线。</div>
              </el-timeline-item>
              <el-timeline-item color="green"  placement="top">
                <h4><b>项目三</b></h4>
                <div>项目名称：金融项目</div>
                <div>项目介绍：拼多多自动下单、对接银行渠道付款，自动发货</div>
                <div>项目模块：通道管理、三方系统渠道、下单支付模块、自动发货工具</div>
                <div>项目职责：负责php系统的搭建和整体开发和接口对接、前段vue-admin项目的搭建和后台管理开发，自动发货工具自动化调通和部署</div>
              </el-timeline-item>
              <el-timeline-item color="green"  placement="top">
                <h4><b>项目四</b></h4>
                <div>项目名称：O2O</div>
                <div>项目介绍：棉花线上交易平台，online to offline，包括h5、前台、后台管理端</div>
                <div>项目模块：资源、需求、挂盘、合同、客户管理、期价维护、市场信息、信息推送管理等</div>
                <div>项目职责：基本独自负责项目的全栈开发、服务器部署、需求对标、后期优化工作。整体项目完成正常运行，包括资源导入git，需求资源匹配，挂盘成交撤销实时广播推送期价挂\改\撤盘处理，多种合同模板开立等等，还包括短信消息推送。</div>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 0px;display:flex;flex-direction: column;">
      <el-row>
        <el-col :lg="16" :offset="device === 'mobile' ? 0 : 4">
          <el-card :class="device !=='mobile' ? 'md-card' : 'md-card'">
            <h3 align="center"><b>日常兴趣</b></h3>
            <ul>
              <li>写博客，技术文章积累，逛github，力扣刷算法题(php+python)，日常学习英语，系统性学习技术课程</li>
              <li>爱好锻炼、篮球、游戏、金融等</li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'resume',
    data() {
      return {
        skillOption:{
          dataset: {
            source: [
              ['score', 'skill'],
              [21, 'nlp'],
              [41, '3d（blender、three.js）'],
              [42, 'java（springboot）、c、算法'],
              [65, 'redis'],
              [66, 'photoshop'],
              [67, 'apache、nginx'],
              [70, 'linux、windows'],
              [70, 'html、css、scss、js、bootstrap'],
              [70, 'python'],
              [72, 'git、svn'],
              [75, 'vue（element、antd、vant...）'],
              [75, 'project management'],
              [79, 'mysql、sql server'],
              [85, 'php（yii2、tp、ci、自写框架）'],

            ]
          },
          title: [
            {
              left: 'center',
              text: '技能'
            },
          ],
          grid: { containLabel: true },
          xAxis: { name: '评分' },
          yAxis: { type: 'category' },
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['高', '低'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#d9ec6a', '#71ef8d', '#0236f6']
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'score',
                // Map the "product" column to Y axis
                y: 'skill'
              }
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        device: 'settings/device',
      }),
    },
    components:{ },
    mounted() {
      this.showSkill()
    },
    created() {
    },
    beforeDestroy() {},
    methods: {
      showSkill(){
        let skillDom = document.getElementById('skill')

        skillDom.style.width = skillDom.offsetWidth < 500 ? window.innerWidth*0.9+'px' : skillDom.offsetWidth;

        console.log(skillDom.offsetWidth)
        let skillChart = echarts.init(skillDom)
        skillChart.setOption(this.skillOption)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    font-family: serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .title{
      font-size: 50px;
      font-weight: 300;
      color: var(--skfb-white, #fff);
      margin-bottom: 10px;
    }
    .subtitle{
      margin-bottom: 35px;
      font-size: 18px;
      line-height: 27px;
      color: hsla(0,0%,100%,.9098);
      color: var(--skfb-white-transparent,hsla(0,0%,100%,.9098));
      font-weight: 400;
    }
    .intro{
      position: relative;
      min-height: 740px;
      max-height: 850px;
      padding-top: 160px;
      display: flex;
      flex-direction: column;
      background-color: rgba(0,0,0);
      //background: linear-gradient(45deg,#3e081c,#ff4489);
      //background-image: linear-gradient(45deg, rgb(62, 8, 28), rgb(255, 68, 137));
      //background-image: linear-gradient(45deg, #ffffff, #1d88eb);
      //background-image: url("http://head.xxroom.xyz/FoZf6-oQVzGJwT1-bVKwc-YnWxUZ");
      //background-size: 100% 100%;

      /*background-position-x: initial;*/
      /*background-position-y: initial;*/
      /*background-size: initial;*/
      /*background-repeat-x: initial;*/
      /*background-repeat-y: initial;*/
      /*background-attachment: initial;*/
      /*background-origin: initial;*/
      /*background-clip: initial;*/
      /*background-color: initial;*/
      .part1{
        max-width: 1130px;
        margin: 0 auto!important;
        width: calc(100% - 60px);
        position: relative;
        flex: 1
      }
    }

    .intro__logo {
      position: absolute;
      z-index: 0;
      opacity: .05;
      top: 0;
      left: 76.1%;
      transform: translate(calc(-50% - 500px), -20%);
      height: 250%;
      pointer-events: none;
    }
  }
</style>
