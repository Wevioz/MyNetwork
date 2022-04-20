<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import User from '../dtos/User.dto';
import { useUserStore } from '../stores/UserStore';

export const enum IndexNaviguation {
  Feed = 'Feed',
  Profil = 'Profil',
  Connexion = 'Connexion',
  Disconnect = 'Disconnect',
}

export default defineComponent({
  name: 'SideBar',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(index: IndexNaviguation) {
      console.warn(index);
      if (index !== IndexNaviguation.Disconnect) {
        this.$emit('changed-naviguation', index);
      }
    },
    disconnect() {
      this.userStore.setUser(new User('', '', '', '', ''));
    },
  },
  mounted() {
    console.warn(this.article, '', this.userStore.isUserConnected);
  },
});
</script>

<template>
  <div>
    <h2>MyNetWork <mdicon name="facebook" /></h2>
    <br>
    <el-menu default-active="Feed" class="el-menu-vertical-demo" @select="handleSelect" style="border: 1px solid lightgrey">
      <el-menu-item class="tab" index="Feed">
        <el-icon><mdicon name="home" /></el-icon>
        <span>Fils d'actualités</span>
      </el-menu-item>

      <el-menu-item class="tab" index="Profil" v-if="this.userStore.isUserConnected === false">
        <el-icon><mdicon name="account" /></el-icon>
        <span>Créer un profil</span>
      </el-menu-item>

      <el-menu-item class="tab" index="Connexion" v-if="this.userStore.isUserConnected === false">
        <el-icon><mdicon name="login" /></el-icon>
        <span>Se connecter</span>
      </el-menu-item>
      
      <el-menu-item class="tab" index="Disconnect" v-else @click="disconnect">
        <el-icon><mdicon name="logout" /></el-icon>
        <span>Déconnexion</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
  .el-menu-item {
    border-bottom: 1px solid lightgrey;
  }
</style>
