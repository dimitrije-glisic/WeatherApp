import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardMdImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {SearchCityComponent} from "../search-city/search-city.component";
import {WeatherData} from "../model/weather-data";
import {WeatherService} from "../weather.service";
import {Location} from "../model/location";
import {CurrentWeatherComponent} from "../current-weather/current-weather.component";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {UnitsComponent} from "../units/units.component";

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
    CurrentWeatherComponent,
    MatChipSet,
    MatChip,
    UnitsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // belgrade,rs latitude and longitude

  defaultLatitude = 44.8125;
  defaultLongitude = 20.4612;
  defaultUnits: 'metric' | 'imperial' = 'metric';

  defaultCity: string = 'Belgrade';
  defaultCountry: string = 'RS';
  units: 'metric' | 'imperial' = this.defaultUnits;

  location: Location;

  weatherData: WeatherData | undefined;

  constructor(private weatherService: WeatherService) {
    this.location = {
      name: this.defaultCity,
      local_names: [{
        ascii: this.defaultCity,
        feature_name: this.defaultCity
      }],
      lat: this.defaultLatitude,
      lon: this.defaultLongitude,
      country: this.defaultCountry
    }
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

  onLocationSelect($event: Location) {
    this.location = $event;
    this.getWeatherData();
  }

  onUnitSelect($event: 'metric' | 'imperial') {
    this.units = $event;
    this.getWeatherData();
  }

  getWeatherData() {
    console.log('Getting weather data for and city: ', this.location.lat, this.location.lon, this.units, this.location?.name);
    const latitude = this.location.lat;
    const longitude = this.location.lon;
    const units = this.units;
    this.weatherService.getWeather(latitude, longitude, units).subscribe((data: WeatherData) => {
      this.weatherData = data;
    });
  }

}
