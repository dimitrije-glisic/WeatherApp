import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "./model/location";

@Injectable({
  providedIn: 'root'
})
export class SearchCityService {

  limit = 5;
  url = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  apiKey = 'f8747e9866f43ffc9d8bf5d9694ada40'

  constructor(private http: HttpClient) {
  }

  searchLocations(cityName: string) {
    return this.http.get<Location[]>(this.url + cityName + '&limit=' + this.limit + '&appid=' + this.apiKey);
  }

  saveCity(city: Location) {
    let locations = JSON.parse(localStorage.getItem('locations') || '[]');
    if (locations.some((location: Location) => location.name === city.name && location.country === city.country)) {
      return;
    }
    locations.push(city);
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  getSavedCities() {
    return JSON.parse(localStorage.getItem('locations') || '[]');
  }

  removeCity(city: Location) {
    console.log('City removed: ' + city.name);
    let locations = JSON.parse(localStorage.getItem('locations') || '[]');
    locations = locations.filter((location: Location) => location.name !== city.name);
    localStorage.setItem('locations', JSON.stringify(locations));
  }

}
