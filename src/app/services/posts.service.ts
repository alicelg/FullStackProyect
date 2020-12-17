import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  title: string;
  main_image: string;
  category: string;
  keywords: string;
  date: string;
  text: string;
  user_id: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/posts';
  }


  getAllPosts(type): Promise<Post[]> {
    return this.httpClient.get<Post[]>(this.baseUrl, { params: { type } }).toPromise();
  }

  getPostById(postId): Promise<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${postId}`).toPromise();
  }

  getPostByTypeAndCategory(type, category): Promise<any> {
    return this.httpClient.get<Post>(`${this.baseUrl}/category/${type}/${category}`).toPromise();
  }

  createPost(newPost): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/new`, newPost).toPromise();
  }

  insertFavorite(pId): Promise<any> {
    const favoritePost = { "postId": pId }
    return this.httpClient.post<any>(`${this.baseUrl}/favorite`, favoritePost).toPromise();
  }

}
