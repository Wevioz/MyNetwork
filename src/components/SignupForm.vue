<script lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import User from '../dtos/User.dto';
import { uid } from 'uid';
import db from '../storage/LocalForage';
import { useUserStore } from '../stores/UserStore';
export default {
  name: 'SignupForm',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      form: reactive({
        pseudo: '',
        email: '',
        password: '',
        passwordVerif: '',
        url: '',
      }),
    };
  },
  methods: {
    async onSubmit() {

      if (this.form.pseudo !== '' && this.form.email !== '' && this.form.password !== '' && this.form.password === this.form.passwordVerif) {
        if(this.form.pseudo.length >= 3 && this.form.password.length >= 6) {
          let newUser = new User(uid(),this.form.pseudo,this.form.email,this.form.password,this.form.url);

          const fetchUsers = await db.getItem<User[]>('Users');
          
          fetchUsers.push(newUser);
          await db.setItem('Users', fetchUsers);

          this.userStore.setUser(newUser);
        
          this.$emit('connection');
        } else {
          ElMessage.error(
            'Votre pseudo doit contenir 3 caractères et votre mot de passe 6 caractères au minimum'
          );
        }
      } else {
        ElMessage.error(
          'Veuillez remplir tous les champs'
        );
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
          <span>Créer un nouveau profil <mdicon name="account" /></span>
        </div>
      </template>
      <el-form :model="form" label-width="120px">
          <el-input v-model="form.pseudo" placeholder="Pseudo"/>
          <br><br>
          <el-input type="email" v-model="form.email" placeholder="Votre@email.fr"/>
          <br><br>
          <el-input type="password" v-model="form.password" placeholder="Mot de passe"/>
          <br><br>
          <el-input type="password" v-model="form.passwordVerif" placeholder="Confirmation"/>
          <br><br>
          <el-input v-model="form.url" placeholder="Url de votre image - taille conseillée 1000x200px"/>
          <br><br>
          <el-button type="success" @click="onSubmit">Créer un nouveau profil</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
