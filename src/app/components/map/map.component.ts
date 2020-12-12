import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as jsVectorMap from 'jsvectormap/dist/js/jsvectormap.js';
import 'jsvectormap/dist/maps/world.js';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryMap } from '../../models/countryMap.model';
// import 'jsvectormap/dist/maps/world'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  selectedCountries: CountryMap[] = [];
  map;

  constructor(
    private translateService: TranslateService,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {

    this.map = new jsVectorMap({
      // tipología y configuración del mapa
      map: 'world',
      selector: '#map',

      regionsSelectable: true,
      markersSelectable: true,
      zoomStep: 1.2,

      // eventos del mapa
      onRegionSelected: (code, isSelected, selectedRegions) => {
        // comprobamos si se esta seleccionando o des-seleccionando
        if (isSelected) {
          // si se esta seleccionando lo añadimos al array
          // obtenemos los datos completos del pais seleccionado
          const countryMap = new CountryMap();
          this.countriesService.getCountryFlagByCode(code).then(res => {
            // countryMap.code = code;
            // countryMap.name = code;
            countryMap.flag = res.flag;
            // countryMap.president = res.name;
            // countryMap.languages = res.languages.map(language => language.nativeName).join(', ');
            // countryMap.currencies = res.currencies.map(currency => currency.name).join(', ');

            this.countriesService.getCountriesDataByCode([code]).then(data => {
              countryMap.code = code;
              countryMap.name = data[0].official_name;
              countryMap.leader1Title = data[0].title_leader_1;
              countryMap.leader1Name = data[0].name_leader_1;
              countryMap.goverment = data[0].goverment;
              countryMap.languages = data[0].languages;
              countryMap.currencies = data[0].currencies;

              // countryMap.languages = res.languages.map(language => language.nativeName).join(', ');
              // countryMap.currencies = res.currencies.map(currency => currency.name).join(', ');
            })

            console.log(countryMap);


            this.selectedCountries.push(countryMap);
          });

        } else {
          // si se esta des-seleccionando lo eliminamos del array
          const countryIndex = this.selectedCountries.map(country => country.code).indexOf(code);
          this.selectedCountries.splice(countryIndex, 1);
        }

      },

      onRegionTooltipShow: (tooltip, code) => {
        tooltip.css({ backgroundColor: '#000000' });

        tooltip.selector.innerHTML =
          `<div style='color:white'>
            ${this.translateService.instant('COUNTRIES.' + code)}
          </div>`;
      },

      // estilos del mapa
      regionStyle: {
        initial: {
          fill: '#4d0707'
        },
        hover: {
          fillOpacity: 1,
          fill: '#901b22'
        },
        selected: {
          fill: '#ff5566'
        }
      },

      regionLabelStyle: {
        initial: {
          fontFamily: 'Verdana',
          fontSize: '12',
          fontWeight: 'bold',
          cursor: 'default',
          fill: '#ff5566'
        },
        hover: {
          cursor: 'pointer'
        }
      }
    });

  }

  clearSelectedCountries(): void {
    this.selectedCountries = [];
    this.map.clearSelectedRegions();

  }

}
