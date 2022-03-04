<template>
  <el-dialog
    :dialogVisible = dialogVisible
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="close"
    >
    <el-form :model="form" label-width="80px">
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事项简述">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { createParent } from '@/api/baby'
    export default {
      props: {
        dialogVisible: {
          type: Boolean,
          default: false,
        },
      },
      data(){
        return {
          form:{
            title:'',
            content:'',
            date:'',
          }
        }
      },
      methods:{
        close(){
          this.$emit('close')
        },
        async submit(){
          await createParent(this.form)
          this.form = {title:'', content:'', date:'',}
          this.$emit('close')
          this.$emit('success')
        }
      }
    }
</script>

<style scoped>

</style>
