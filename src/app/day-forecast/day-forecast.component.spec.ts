import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DayForecastComponent} from './day-forecast.component';
import {WeatherData} from "../model/weather-data";
import {By} from "@angular/platform-browser";

describe('DayForecastComponent', () => {
  let component: DayForecastComponent;
  let fixture: ComponentFixture<DayForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayForecastComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update weather data', () => {
    const weatherData = {
      timezone_offset: -18000,
      current: {
        dt: 1715939345,
        temp: 20,
        weather: [{description: 'clear sky', icon: '01d'}]
      },
      daily: [
        {
          dt: 1715939345,
          temp: {max: 25, min: 15},
          weather: [{description: 'clear sky', icon: '01d'}]
        }
      ]
    } as WeatherData;

    component.weatherData = weatherData;
    expect(component._weatherData).toEqual(weatherData);
  });

  it('should render the forecast', () => {
    component.weatherData = {
      timezone_offset: -18000,
      current: {
        dt: 1715939345,
        temp: 20,
        weather: [{description: 'clear sky', icon: '01d'}]
      },
      daily: [
        {
          dt: 1715939345,
          temp: {max: 25, min: 15},
          weather: [{description: 'clear sky', icon: '01d'}]
        }
      ]
    } as WeatherData;
    fixture.detectChanges();

    const forecastItems = fixture.debugElement.queryAll(By.css('.forecast-item'));
    expect(forecastItems.length).toBe(1);

    const dateSpan = forecastItems[0].query(By.css('span')).nativeElement;
    const iconImg = forecastItems[0].query(By.css('img')).nativeElement;
    const tempSpan = forecastItems[0].query(By.css('.temp')).nativeElement;
    const descriptionSpan = forecastItems[0].query(By.css('.description')).nativeElement;

    expect(dateSpan.textContent).toContain('May 17');
    expect(iconImg.src).toContain('01d.png');
    expect(tempSpan.textContent).toContain('25/15 °C');
    expect(descriptionSpan.textContent).toContain('clear sky');
  });


});
