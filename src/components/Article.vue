<script lang="ts">
  import {PropType} from '@vue/runtime-core';
  import Article from '../dtos/Article.dto';
  import {useUserStore} from '../stores/UserStore';
  import Comments from '../components/Comments.vue';
  import Comment from '../dtos/Comment.dto';
  import {uid} from 'uid';
  export default {
    name: 'ArticleComponent',
    emits: ['article-like', 'add-comment'],
    setup() {
      const userStore = useUserStore();
      return {
        userStore
      };
    },
    components: {
      Comments,
    },
    data() {
      return {
        likeUsed: false,
        commentContent: '',
      };
    },
    props: {
      article: {
        type: Object as PropType < Article > ,
        required: true,
      },
    },
    methods: {
      like() {
        if (this.likeUsed) return;
        this.likeUsed = true;
        this.$emit('article-like', this.article.id);
      },
      async onSubmit() {
        if (this.commentContent.length === 0) return;
        const newComment = new Comment(uid(), this.commentContent, this.userStore.getUser.pseudo, (new Date() as any)
          .getTime());
        this.article.comments.push(newComment);
        this.$emit('add-comment');
        this.commentContent = '';
      },
      created() {},
    },
  };
</script>

<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <template #header>
      <div class="card-header">
        <span>{{ this.article.pseudo }}</span>
        <span>posté le {{ new Date(this.article.createdAt).toLocaleString() }}</span>
      </div>
    </template>
    <img class="image" v-if="this.article.urlImgArticle" :src="this.article.urlImgArticle" />
    <el-empty v-else />
    <div style="padding: 14px">
      <span>{{ this.article.content }}</span>
    </div>
    <div class="rateDiv">

      <mdicon name="comment" />
      <el-badge :value="this.article.comments.length" type="success">
      </el-badge>
      &nbsp;&nbsp;
      <mdicon @click="like()" name="thumb-up" />
      <el-badge :value="this.article.like" type="primary">
      </el-badge>
      
    </div>
    <div style="padding: 14px">
      <h3>Commentaires :</h3>
      <Comments v-for="comment in this.article.comments" :key="comment.id" :comment="comment" />
      <br>
      <hr style="opacity: 0.2"><br>
      <div v-if="this.userStore.isUserConnected">
        <h3>Ajouter un commentaire :</h3>
        <br>
        <el-input v-model="commentContent" type="textarea" />
        <br><br>
        <el-button type="success" style="width: 100%" @click="onSubmit">Laisser un commentaire</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rateDiv {
    padding: 14px;
    background-color: rgb(248, 248, 248);
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-left: 50px;
  }

  .image {
    width: 100%;
    height: 300px;
    display: block;
  }

  .box-card {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
</style>