import {Component, Input} from '@angular/core';
import {WeatherData} from "../model/weather-data";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-day-forecast',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './day-forecast.component.html',
  styleUrl: './day-forecast.component.css'
})
export class DayForecastComponent {
  _weatherData: WeatherData | undefined;
  @Input() set weatherData(value: WeatherData | undefined) {
    this._weatherData = value;
  }

  _units: 'metric' | 'imperial' = 'metric';
  @Input() set units(value: 'metric' | 'imperial') {
    this._units = value;
  }

  getFormattedDate(timestamp: number, offset: number): string {
    const adjustedTimestamp = (timestamp + offset) * 1000;
    const date = new Date(adjustedTimestamp);
    return new DatePipe('en-US').transform(date, 'EEE dd, HH:mm', 'UTC') || '';
  }

  getUnitSymbol(): string {
    return this._units === 'metric' ? '°C' : '°F';
  }

}
