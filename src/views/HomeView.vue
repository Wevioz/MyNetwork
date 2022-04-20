<script lang="ts">
import Feed from '@/components/Feed.vue';
import SideBar from '@/components/SideBar.vue';
import SignupForm from '@/components/SignupForm.vue';
import ConnexionForm from '@/components/ConnexionForm.vue';
import { defineComponent } from '@vue/runtime-core';
import db from '../storage/LocalForage';

import User from '../dtos/User.dto';
import Article from '../dtos/Article.dto';
import Comment from '../dtos/Comment.dto';
import { IndexNaviguation } from '../components/SideBar.vue';
export default defineComponent({
  components: {
    SideBar,
    Feed,
    SignupForm,
    ConnexionForm,
  },
  data() {
    return {
      naviguationIndex: IndexNaviguation.Feed,
    };
  },
  methods: {
    changeComponent(newIndex: IndexNaviguation) {
      this.naviguationIndex = newIndex;
    },
    redirectToFeed() {
      this.naviguationIndex = IndexNaviguation.Feed;
    },
  },
  async created() {
    const users = await db.getItem('Users');
    if (users === null) {
      const seedUsers = [
        new User(
          '1',
          'Alain',
          'alain@yahoo.fr',
          '123456',
          'https://thispersondoesnotexist.com/image'
        ),
        new User(
          '2',
          'Béatrice',
          'bea@yahoo.fr',
          '123456',
          'https://thispersondoesnotexist.com/image'
        ),
      ];
      await db.setItem('Users', seedUsers);

      const seedComments: Comment[] = [
        new Comment('1', 'lorem ipsum', 'Béatrice', 1649277945051),
        new Comment('2', 'lorem ipsum', 'Béatrice', 1649277945051),
      ];

      const seedArticles = [
        new Article(
          '1',
          'lorem ipsum',
          'https://source.unsplash.com/random/1000x300',
          2,
          'Alain',
          1649277945051,
          seedComments
        ),
      ];
      
      await db.setItem('Articles', seedArticles);
    }
  },
});
</script>

<template>
  <main>
    <el-row>
      <el-col :span="4">
        <SideBar
          @changed-naviguation="changeComponent"
          style="position: sticky; top: 20px"
        />
      </el-col>
      <el-col :span="19" :offset="1">
        <Feed v-if="naviguationIndex === 'Feed'" />
        <SignupForm
          v-else-if="naviguationIndex === 'Profil'"
          @connection="redirectToFeed"
        />
        <ConnexionForm
          v-else-if="naviguationIndex === 'Connexion'"
          @connection="redirectToFeed"
        />
      </el-col>
    </el-row>
  </main>
</template>
