import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) { }

  getCountryDataByCode(code): Promise<any> {
    return this.httpClient.get<any>('https://restcountries.eu/rest/v2/alpha/' + code).toPromise();
  }

  getCountryDataByCode2(code): Observable<any> {
    return this.httpClient.get<any>('https://restcountries.eu/rest/v2/alpha/' + code);
  }

}


