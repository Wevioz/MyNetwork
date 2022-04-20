<script lang="ts">
import { reactive } from 'vue';
import db from '../storage/LocalForage';
import User from '../dtos/User.dto';
import { useUserStore } from '../stores/UserStore';
import { ElMessage } from 'element-plus';
export default {
  name: 'ConnexionForm',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      form: reactive({
        email: '',
        password: '',
      }),
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.email === '' || this.form.password === '') {
        ElMessage.error('Veuillez remplir tous les champs');
        return;
      }
      const usersFromDb = await db.getItem<User[]>('Users');
      const userToConnect = usersFromDb.find(
        (user) =>
          user.email === this.form.email && user.password === this.form.password
      );
      if (userToConnect) {
        this.userStore.setUser(userToConnect);
        this.$emit('connection');
      } else {
        ElMessage.error("Identifiants invalides");
      }
    },
  },
};
</script>

<template>
  <div style="width: 100vh; height: 100vh; padding-top: 25vh">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Se connecter <mdicon name="login" /></span>
        </div>
      </template>
      <el-form :model="form" label-width="120px">
          <el-input v-model="form.email" placeholder="Votre@email.fr" />
          <br><br>
          <el-input v-model="form.password" placeholder="Mot de passe" />
          <br><br>
          <el-button type="success" @click="onSubmit">Se connecter</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
