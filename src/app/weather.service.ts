import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherData} from "./model/weather-data";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = environment.weatherApiUrl;
  apiKey = environment.apiKey;

  constructor(private httpClient: HttpClient) {
  }

  getWeather(lat: number, lon: number, units: 'metric' | 'imperial') {
    const url = this.url + '?lat=' + lat + '&lon=' + lon + '&units=' + units + '&appid=' + this.apiKey;
    return this.httpClient.get<WeatherData>(url);
  }

}
