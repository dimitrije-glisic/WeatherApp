import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HourlyForecastComponent} from './hourly-forecast.component';
import {WeatherData} from "../model/weather-data";
import {By} from "@angular/platform-browser";

describe('HourlyForecastComponent', () => {
  let component: HourlyForecastComponent;
  let fixture: ComponentFixture<HourlyForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForecastComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HourlyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date correctly', () => {
    component.timezoneOffset = -18000;
    const timestamp = 1715940000;
    const expectedDate = '05:00'; // Adjust based on actual expected result
    expect(component.getFormattedDate(timestamp)).toEqual(expectedDate);
  });

  it('should display only the next 10 hourly forecast items', () => {
    const hourlyData = Array.from({length: 20}, (_, i) => ({
      dt: 1715940000 + i * 3600,
      temp: 293.58 + i,
      feels_like: 293.38,
      pressure: 1012,
      humidity: 65,
      dew_point: 286.79,
      uvi: 5.42,
      clouds: 100,
      visibility: 10000,
      wind_speed: 5.3,
      wind_deg: 140,
      wind_gust: 5.57,
      weather: [{id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d'}],
      pop: 0.1 * i
    })) as WeatherData['hourly'];

    component.hourlyWeatherData = hourlyData;
    fixture.detectChanges();

    const forecastItems = fixture.debugElement.queryAll(By.css('.forecast-item'));
    expect(forecastItems.length).toBe(10);
  });


});
