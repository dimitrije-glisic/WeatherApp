import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardMdImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {SearchCityComponent} from "../search-city/search-city.component";
import {Weather} from "../model/weather";
import {WeatherService} from "../weather.service";
import {Location} from "../model/location";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardMdImage,
    MatIcon,
    DatePipe,
    SearchCityComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // default coordinates
  // 44.8125° N, 20.4612° E
  defaultLatitude = 44.8125;
  defaultLongitude = 20.4612;
  weatherData: Weather | undefined;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    console.log('Home Component Initialized, calling initial weather data.');
    this.getWeatherData(this.defaultLatitude, this.defaultLongitude);
  }

  onCitySelected($event: Location) {
    console.log('City Name:', $event);
    this.getWeatherData($event.lat, $event.lon);
  }

  getWeatherData(latitude: number, longitude: number) {
    this.weatherService.getWeather(latitude, longitude).subscribe((data: Weather) => {
      this.weatherData = data;
      console.log(this.weatherData.timezone);
      console.log(this.weatherData.current.dt)
      console.log(this.weatherData.current.temp)
    });
  }

  getFormattedDate(timestamp: number, offset: number): string {
    const adjustedTimestamp = (timestamp + offset) * 1000;
    return new DatePipe('en-US').transform(adjustedTimestamp, 'MMM dd, HH:mm', 'UTC') || '';
  }

}
