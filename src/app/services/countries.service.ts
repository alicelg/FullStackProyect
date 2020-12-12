import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryMap } from '../models/countryMap.model';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/countries';
   }

  getCountryFlagByCode(code): Promise<any> {
    return this.httpClient.get<any>('https://restcountries.eu/rest/v2/alpha/' + code).toPromise();
  }

  getCountriesDataByCode(code): Promise<any> {
    return this.httpClient.get<CountryMap[]>(this.baseUrl, { params: { code } }).toPromise();
  }
}


