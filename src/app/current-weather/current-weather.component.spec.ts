import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentWeatherComponent} from './current-weather.component';
import {WeatherData} from "../model/weather-data";
import {Location} from "../model/location";
import {MatCard, MatCardContent} from "@angular/material/card";
import {DatePipe, DecimalPipe} from "@angular/common";

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CurrentWeatherComponent,
        DatePipe,
        MatCard,
        MatCardContent,
        DecimalPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct unit symbol', () => {
    component.units = 'metric';
    expect(component.getUnitSymbol()).toBe('°C');

    component.units = 'imperial';
    expect(component.getUnitSymbol()).toBe('°F');
  });

  it('should return the correct formatted date', () => {
    const timestamp = 1614619200;
    const offset = -18000;
    expect(component.getFormattedDate(timestamp, offset)).toBe('Mar 01, 12:20');
  });

  it('should display weather data correctly', () => {
    const mockWeatherData = {
      lat: 40.7128,
      lon: -74.0060,
      timezone: 'America/New_York',
      current: {
        dt: 1624017600,
        temp: 22.5,
        weather: [{
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }]
      },
      daily: [{
        temp: {
          day: 22.5,
          night: 15.5
        }
      }]
    } as WeatherData;

    const mockLocation = {
      name: 'New York',
      country: 'USA',
      lat: 40.7128,
      lon: -74.0060
    } as Location;

    component.weatherData = mockWeatherData;
    component.location = mockLocation;
    component.units = 'metric';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Weather in New York, USA');
    expect(compiled.querySelector('.temperature').textContent).toContain('22.5 °C');
    expect(compiled.querySelector('.description').textContent).toContain('clear sky');
    expect(compiled.querySelector('.temp-range').textContent).toContain('22.5 °C');
    expect(compiled.querySelector('.temp-range').textContent).toContain('15.5 °C');
  });

});
