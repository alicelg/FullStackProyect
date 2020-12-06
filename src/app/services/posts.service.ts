import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id: number,
  title: string,
  main_image: string,
  category: string,
  keywords: string,
  date: string,
  text: string,
  user_id: number
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) { this.baseUrl = 'http://localhost:3000/posts' }


  getAllPosts(type): Promise<Post[]> {
/*     return this.httpClient.get<Post[]>(this.baseUrl + '?type='+ type).toPromise();
 */    return this.httpClient.get<Post[]>(this.baseUrl, { params: { type: type } }).toPromise();
  }

  /*   getAllPosts2(type): Observable<Post[]> {
      return this.httpClient.get<Post[]>(this.baseUrl, { params: { type: type } });
    } */
}


