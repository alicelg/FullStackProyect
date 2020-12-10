import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/search';
  }

  search(searchTerm, blogs, concepts): Promise<any> {
    return this.httpClient.get<any>(this.baseUrl, { params: { searchTerm, blogs, concepts } }).toPromise();
  }
}
