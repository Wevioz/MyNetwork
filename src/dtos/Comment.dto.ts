import { uid } from 'uid';
export default class Comment {
  id: string = '';
  content: string = '';
  pseudo: string = '';
  createdAt: number = 0;

  public constructor(
    id: string,
    content: string,
    pseudo: string,
    createdAt: number
  ) {
    this.id = id;
    this.content = content;
    this.pseudo = pseudo;
    this.createdAt = createdAt;
  }
}
