import {Component, Input} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {WeatherData} from "../model/weather-data";
import {Location} from "../model/location";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    DecimalPipe,
    MatIcon
  ],
  providers: [DatePipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent {
  _weatherData: WeatherData | undefined;
  @Input() set weatherData(value: WeatherData | undefined) {
    this._weatherData = value;
  }

  _units: 'metric' | 'imperial' = 'metric';
  @Input() set units(value: 'metric' | 'imperial') {
    this._units = value;
  }

  _location: Location | undefined;
  @Input() set location(value: Location | undefined) {
    this._location = value;
  }

  constructor(private datePipe: DatePipe) {}

  getFormattedDate(timestamp: number, offset: number) {
    const adjustedTimestamp = (timestamp + offset) * 1000;
    return this.datePipe.transform(new Date(adjustedTimestamp), 'MMM dd, HH:mm', 'UTC') || '';
  }

  getUnitSymbol(): string {
    return this._units === 'metric' ? '°C' : '°F';
  }

}
