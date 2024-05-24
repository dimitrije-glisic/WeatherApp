import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "./model/location";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchCityService {

  limit = 5;
  url = environment.cityApiUrl;
  apiKey = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  searchLocations(cityName: string) {
    return this.http.get<Location[]>(this.url + cityName + '&limit=' + this.limit + '&appid=' + this.apiKey);
  }

  saveCity(city: Location) {
    console.log('City saved: ' + city.name);
    console.log('length: ' + this.getSavedCities().length);
    let locations = JSON.parse(localStorage.getItem('locations') || '[]');

    if (locations.some((location: Location) => location.name === city.name && location.country === city.country)) {
      return;
    }

    if (locations.length >= this.limit) {
      console.log('Removing last city: ' + locations[locations.length - 1].name);
      locations.pop();
    }

    locations.unshift(city);

    localStorage.setItem('locations', JSON.stringify(locations));
  }

  getSavedCities() {
    return JSON.parse(localStorage.getItem('locations') || '[]');
  }

  removeCity(city: Location) {
    let locations = JSON.parse(localStorage.getItem('locations') || '[]');
    locations = locations.filter((location: Location) => location.name !== city.name);
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  makeCityPrimary($event: Location) {
    let locations = JSON.parse(localStorage.getItem('locations') || '[]');
    locations = locations.filter((location: Location) => location.name !== $event.name);
    locations.unshift($event);
    localStorage.setItem('locations', JSON.stringify(locations));
  }
}
