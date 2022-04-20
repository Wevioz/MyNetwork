import { defineStore } from 'pinia';
import User from '../dtos/User.dto';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: new User('', '', '', '', ''),
  }),
  getters: {
    getUser: (state) => state.user,
    isUserConnected: (state) => {
      if (state.user.id === '') {
        return false;
      } else {
        return true;
      }
    },
  },
  actions: {
    setUser(newUser: User) {
      this.user = newUser;
    },
  },
});
