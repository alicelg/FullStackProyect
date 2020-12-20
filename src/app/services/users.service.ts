import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  currentUser = new BehaviorSubject(this.isLogged);

  set isLogged(value) {
    this.currentUser.next(value);
    value === null ? localStorage.removeItem('currentUser') : localStorage.setItem('currentUser', JSON.stringify(value));
  }

  get isLogged(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.baseUrl = 'http://localhost:3000/users';
  }

  signup(newUser): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/create`, newUser).toPromise();
  }

  login(formValue): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, formValue).toPromise();
  }

  getUserData(userId): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`, { params: { userId } }).toPromise();
  }

  update(user): Promise<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/update`, user).toPromise();
  }

  getConcepts(): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/concepts`).toPromise();
  }

  getPost(): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/posts`).toPromise();
  }

  logOut(): void {
    this.isLogged = null;
    this.router.navigate(['/']);
  }

  getPostCreated(): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/created/posts`).toPromise();
  }



}
