<template>
  <div>
    <a-modal
      title="回复"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <el-input type="textarea" v-model="secondComment.content" />
    </a-modal>
    <a-comment>
      <a-avatar slot="avatar" v-if="avatar !== ''" :src="avatar"></a-avatar>
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            确认回复
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length}条用户回复`"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.nickname"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.created_at">
          <span slot="actions" key="comment-nested-reply-to" @click="showModal(item)">回复</span>
          <a-comment v-for="item_c in item.comments"
            :author="item_c.to_nickname === '' ? item_c.nickname : item_c.nickname+' 回复 '+ item_c.to_nickname"
            :avatar="item_c.avatar"
            :content="item_c.content"
            :datetime="item_c.created_at"
          >
            <span slot="actions" key="comment-nested-reply-to" @click="showModal(item_c)">回复</span>
          </a-comment>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-list
      v-if="guestComments.length"
      :data-source="guestComments"
      :header="`${guestComments.length}条游客回复`"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :content="item.content"
          :datetime="item.created_at">
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import { createComment, commentsList } from "@/api/blog";
  import { mapGetters} from 'vuex'
  export default {
    name: "comments",
    props:{
      blogID:{
        type: String,
        default: '',
      },
    },
    data() {
      return {
        comments: [],
        guestComments:[],
        submitting: false,
        value: '',
        secondComment:{
          blog_id:this.blogID,
          content:'',
        },
        visible: false,
        confirmLoading: false,
      };
    },
    created() {
      this.getCommentsList()
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        nickname: 'user/nickname',
      }),
    },
    methods: {
      async getCommentsList(){
        const { data } = await commentsList({id:this.blogID});
        this.comments = data.userComment
        this.guestComments = data.guestComment
      },
      async handleSubmit() {

        if (!this.value) {
          return;
        }
        this.submitting = true;
        let data = {blog_id:this.blogID,content:this.value}
        await createComment(data)
        setTimeout(() => {
          this.submitting = false;
          if(this.nickname){
            this.comments = [
              {
                author: this.nickname,
                avatar: this.avatar,
                content: this.value,
                created_at: '刚刚提交',
              },
              ...this.comments,
            ];
          }else{
            this.guestComments = [
              {
                content: this.value,
                created_at: '刚刚提交',
              },
              ...this.guestComments,
            ];
          }
          this.value = '';
        }, 1000);
      },
      handleChange(e) {
        this.value = e.target.value;
      },
      showModal(item) {
        this.secondComment.to_user_id = item.user_id
        this.secondComment.base_id =  item.base_id == 0 ? item.id : item.base_id

        this.visible = true;
      },
      async handleOk() {
        this.confirmLoading = true;
        await createComment(this.secondComment)
        setTimeout(() => {
          this.getCommentsList()
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel(e) {
        this.visible = false;
      },
    },
  }
</script>

<style scoped>
  .ant-list-item{
    flex-direction: column !important;
    align-items: normal !important;
  }
</style>
