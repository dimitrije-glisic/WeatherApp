import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weather} from "./model/weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = 'https://api.openweathermap.org/data/3.0/onecall';
  appId = 'f8747e9866f43ffc9d8bf5d9694ada40';

  constructor(private httpClient: HttpClient) {
  }

  getWeather(lat: number, lon: number) {
    console.log('Getting weather data for lat:', lat, 'lon:', lon);
    return this.httpClient.get<Weather>(this.url + '?lat=' + lat + '&lon=' + lon + '&appid=' + this.appId);
  }

}
