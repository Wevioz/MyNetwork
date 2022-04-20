import { uid } from 'uid';

export default class User {
  id: string = '';
  pseudo: string = '';
  email: string = '';
  password: string = '';
  urlProfilPic: string = '';
  constructor(
    id: string,
    pseudo: string,
    email: string,
    password: string,
    urlProfilPic: string
  ) {
    this.id = id;
    this.email = email;
    this.pseudo = pseudo;
    this.password = password;
    this.urlProfilPic = urlProfilPic;
  }
}
