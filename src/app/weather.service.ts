import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherData} from "./model/weather-data";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl = 'https://api.openweathermap.org/data/3.0/onecall';
  appId = 'f8747e9866f43ffc9d8bf5d9694ada40';

  constructor(private httpClient: HttpClient) {
  }

  getWeather(lat: number, lon: number, units: 'metric' | 'imperial') {
    const url = this.baseUrl + '?lat=' + lat + '&lon=' + lon + '&units=' + units + '&appid=' + this.appId;
    return this.httpClient.get<WeatherData>(url);
  }

}
