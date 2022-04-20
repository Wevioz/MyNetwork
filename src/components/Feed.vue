<script lang="ts">
import Article from '../dtos/Article.dto';
import ArticleComponent from './Article.vue';
import { ElMessage } from 'element-plus';
import { uid } from 'uid';
import { useUserStore } from '../stores/UserStore';
import db from '../storage/LocalForage';
export default {
  name: 'Feed',
  components: { ArticleComponent },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      articles: [],
      articleContent: '',
      articleUrl: '',
    };
  },
  methods: {

    async like(id: string) {
      if (!this.userStore.isUserConnected) return;
      let articles = (this.articles as Article[]).find((article) => article.id === id);
      articles.like++;

      articles = JSON.parse(JSON.stringify(this.articles));
      await db.setItem('Articles', articles);
    },

    async save() {
      const articles = JSON.parse(JSON.stringify(this.articles));
      await db.setItem('Articles', articles);
    },

    async onSubmit() {
      if (this.articleContent !== '' && this.articleUrl !== '') {
        const newArticle = new Article(uid(),this.articleContent,this.articleUrl, 0, this.userStore.getUser.pseudo,(new Date() as any).getTime(), []);
        this.articles.unshift(newArticle);

        let articles = JSON.parse(JSON.stringify(this.articles));
        await db.setItem('Articles', articles);
        
      } else {
        ElMessage.error(
            'Veuillez remplir tous les champs'
          );
      }
    },
  },

  async mounted() {
    this.articles = await db.getItem('Articles');
  },

};
</script>

<template>
<div v-if="this.userStore.isUserConnected" style="width: 100%; margin-top: 5%">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Quoi de neuf ? <mdicon name="home" /></span>
        </div>
      </template>

      <el-input
        style="margin-bottom: 10px"
        v-model="articleContent"
        type="textarea"
        placeholder="laisser un nouveau post"
      />

      <el-input
        style="margin-bottom: 10px"
        v-model="articleUrl"
        placeholder="url de votre image taille conseillé 1000x200px"
      />

      <el-button type="success" style="width: 100%" @click="onSubmit"
        >Laisser un nouveau post</el-button
      >
    </el-card>
  </div>
  <div>
    <div style="width: 100vh">
      <ArticleForm />
      <ArticleComponent
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @article-like="like"
        @add-comment="save"
      />
    </div>
  </div>
</template>
