import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/country.model';


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


  selectedCountry = new BehaviorSubject(this.isSelected);

  set isSelected(value) {
    this.selectedCountry.next(value);
    value === null ? localStorage.removeItem('selectedCountry') : localStorage.setItem('selectedCountry', JSON.stringify(value));
  }

  get isSelected(): Country {
    return JSON.parse(localStorage.getItem('selectedCountry'));
  }

  getCountryFlagByCode(code): Promise<any> {
    return this.httpClient.get<any>('https://restcountries.eu/rest/v2/alpha/' + code).toPromise();
  }

  getCountriesDataByCode(code): Promise<Country[]> {
    return this.httpClient.get<Country[]>(this.baseUrl, { params: { code } }).toPromise();
  }
}


