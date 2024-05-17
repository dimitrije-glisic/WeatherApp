import {Component, Input} from '@angular/core';
import {WeatherData} from "../model/weather-data";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [
    DecimalPipe,
    MatButton,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css'
})
export class HourlyForecastComponent {
  @Input() hourlyWeatherData: WeatherData['hourly'] | undefined;
  @Input() timezoneOffset: number | undefined;
  @Input() units: 'metric' | 'imperial' = 'metric';

  constructor(private datePipe: DatePipe) {}

  getNextTenHours() {
    if (this.hourlyWeatherData) {
      return this.hourlyWeatherData.slice(0, 10);
    }
    return [];
  }

  getFormattedDate(timestamp: number): string {
    if (!this.timezoneOffset) {
      return '';
    }
    const adjustedTimestamp = (timestamp + this.timezoneOffset) * 1000;
    return this.datePipe.transform(new Date(adjustedTimestamp), 'HH:mm', 'UTC') || '';
  }

  getUnitSymbol(): string {
    return this.units === 'metric' ? '°C' : '°F';
  }

}
