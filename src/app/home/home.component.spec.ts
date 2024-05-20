import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {WeatherService} from '../weather.service';
import {of} from 'rxjs';
import {WeatherData} from '../model/weather-data';
import {Location} from '../model/location';
import {SearchCityComponent} from '../search-city/search-city.component';
import {CurrentWeatherComponent} from '../current-weather/current-weather.component';
import {UnitsComponent} from '../units/units.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {DatePipe, DecimalPipe} from '@angular/common';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WeatherService', ['getWeather']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatChipsModule,
        DatePipe,
        DecimalPipe,
        SearchCityComponent,
        CurrentWeatherComponent,
        UnitsComponent,
        HomeComponent
      ],
      providers: [
        {provide: WeatherService, useValue: spy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update location and get weather data when location is selected', () => {
    const mockLocation = {
      name: 'New York',
      lat: 40.7128,
      lon: -74.0060,
      country: 'USA'
    } as Location;

    weatherService.getWeather.and.returnValue(of({} as WeatherData));
    component.onLocationSelect(mockLocation);

    expect(component.location).toEqual(mockLocation);
    expect(weatherService.getWeather).toHaveBeenCalledWith(40.7128, -74.0060, 'metric');
  });

  it('should update units and get weather data when units are selected', () => {
    weatherService.getWeather.and.returnValue(of({} as WeatherData));
    component.onUnitSelect('imperial');

    expect(component.units).toBe('imperial');
    expect(weatherService.getWeather).toHaveBeenCalledWith(44.8125, 20.4612, 'imperial');
  });

});
