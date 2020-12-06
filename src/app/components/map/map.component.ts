import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { count } from 'console';
import * as jsVectorMap from 'jsvectormap/dist/js/jsvectormap.js';
import 'jsvectormap/dist/maps/world.js';
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
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {

    this.map = new jsVectorMap({
      // tipología y configuración del mapa
      map: 'world',
      selector: '#map',

      regionsSelectable: true,
      markersSelectable: true,

      // eventos del mapa
      onRegionSelected: (index, isSelected, selectedRegions) => {
        console.log(index, isSelected, selectedRegions);
        // Obtenemos los datos completos del pais seleccionado
        const countryMap = this.getCountryData(index);

        // comprobamos si se esta seleccionando o des-seleccionando
        if (isSelected) {
          // si se esta seleccionando lo añadimos al array
          this.selectedCountries.push(countryMap);

        } else {
          // si se esta des-seleccionando lo añadimos al array lo eliminamos
          const countryIndex = this.selectedCountries.map(country => country.index).indexOf(index);
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

  getCountryData(index): CountryMap {
    const countryMap = new CountryMap();

    countryMap.index = index;
    countryMap.name = index;
    countryMap.flag = '';
    countryMap.president = '';
    countryMap.language = '';
    countryMap.money = '';

    return countryMap;

  }

}
