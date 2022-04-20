import type Comment from './Comment.dto';

export default class Article {
  id: string = '';
  content: string = '';
  urlImgArticle: string = '';
  like: number = 0;
  pseudo: string = '';
  createdAt: number = (new Date() as any).getTime();
  comments: Comment[] = [];

  constructor(
    id: string,
    content: string,
    urlImgArticle: string,
    like: number,
    pseudo: string,
    createdAt: number,
    comments: Comment[]
  ) {
    (this.id = id),
      (this.content = content),
      (this.urlImgArticle = urlImgArticle),
      (this.like = like),
      (this.pseudo = pseudo),
      (this.createdAt = createdAt),
      (this.comments = comments);
  }
}
