import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country: Country;
  constructor(
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.countriesService.selectedCountry.subscribe(res => {
      this.country = res;
    });
  }

}
