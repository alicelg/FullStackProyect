import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/users';
  }

  signup(newUser): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/create`, newUser).toPromise();
  }

  login(formValue): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, formValue).toPromise();
  }

  update(formValue): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/update`, formValue).toPromise();
  }

}
