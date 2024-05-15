import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Location {
  name: string;
  local_names: [{
    ascii: string;
    feature_name: string;
  }];
  lat: number;
  lon: number;
  country: string;
}


@Injectable({
  providedIn: 'root'
})
export class SearchCityService {

  limit = 5;
  url = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  apiKey = 'f8747e9866f43ffc9d8bf5d9694ada40'

  mockData = [
    'Belgrade1',
    'Belgrade2',
    'Belgrade3',
    'Belgrade4',
  ]

  constructor(private http: HttpClient) {
  }

  getLocations(cityName: string) {
    return this.http.get<Location[]>(this.url + cityName + '&limit=' + this.limit + '&appid=' + this.apiKey);
  }

}
