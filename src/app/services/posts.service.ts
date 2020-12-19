import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';

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

  insertFavorite(postId): Promise<any> {
    const favoritePost = { "postId": postId }
    return this.httpClient.post<any>(`${this.baseUrl}/favorite`, favoritePost).toPromise();
  }

  deleteFavorite(postId): Promise<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/nofav`, { params: { postId } }).toPromise();
  }

  createComment(newComment): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/comment`, newComment).toPromise();
  }

  deletePost(postId): Promise<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${postId}`).toPromise();
  }

  editPost(post): Promise<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/edit`, post).toPromise();
  }
}
