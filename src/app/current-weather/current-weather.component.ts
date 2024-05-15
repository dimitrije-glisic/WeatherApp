import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {WeatherData} from "../model/weather-data";

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent
  ],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent {

  @Input() weatherData: WeatherData | undefined;

  getFormattedDate(timestamp: number, offset: number): string {
    const adjustedTimestamp = (timestamp + offset) * 1000;
    return new DatePipe('en-US').transform(adjustedTimestamp, 'MMM dd, HH:mm', 'UTC') || '';
  }

}
