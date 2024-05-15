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

  getLocations(cityName: string) {
    return this.http.get<Location[]>(this.url + cityName + '&limit=' + this.limit + '&appid=' + this.apiKey);
  }

}
