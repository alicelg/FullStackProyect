import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/users';
  }

  signup(newUser): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/create`, newUser).toPromise();
  }

  login(formValue): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, formValue).toPromise();
  }

}
