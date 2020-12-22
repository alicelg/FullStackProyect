import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country: Country;
  countryCode: string;
  search: string;

  constructor(
    private countriesService: CountriesService,
    private avtivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.search = this.avtivatedRoute.snapshot.queryParamMap.get('searchCountry');

    if (this.search) {
      this.countryCode = this.avtivatedRoute.snapshot.paramMap.get('code');
      this.countriesService.getCountriesDataByCode([this.countryCode]).then(data => {
        this.country = data[0];
        this.country.languages = this.country.languages.split(',').join(', ');
        this.countriesService.getCountryFlagByCode(this.countryCode).then(res => {
          this.country.flag = res.flag;
          this.country.currencies = res.currencies.map(currency => currency.name).join(', ');
        });
      });
    } else {
      this.countriesService.selectedCountry.subscribe(res => {
        this.country = res;
      });
    }
  }
}
