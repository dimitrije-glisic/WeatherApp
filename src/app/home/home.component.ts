import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardMdImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {SearchCityComponent} from "../search-city/search-city.component";
import {WeatherData} from "../model/weather-data";
import {WeatherService} from "../weather.service";
import {Location} from "../model/location";
import {CurrentWeatherComponent} from "../current-weather/current-weather.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardMdImage,
    MatIcon,
    DatePipe,
    SearchCityComponent,
    CurrentWeatherComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  defaultLatitude = 44.8125;
  defaultLongitude = 20.4612;
  weatherData: WeatherData | undefined;

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
    this.weatherService.getWeather(latitude, longitude).subscribe((data: WeatherData) => {
      this.weatherData = data;
    });
  }

}
