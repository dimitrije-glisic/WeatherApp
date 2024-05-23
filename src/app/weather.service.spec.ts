import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { WeatherData } from './model/weather-data';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data correctly', () => {
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
      }
    } as WeatherData;

    const lat = 40.7128;
    const lon = -74.0060;
    const units = 'metric';

    service.getWeather(lat, lon, units).subscribe(data => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpMock.expectOne(`${service.url}?lat=${lat}&lon=${lon}&units=${units}&appid=${service.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should handle HTTP errors', () => {
    const lat = 40.7128;
    const lon = -74.0060;
    const units = 'metric';

    service.getWeather(lat, lon, units).subscribe(
      () => fail('should have failed with the 404 error'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${service.url}?lat=${lat}&lon=${lon}&units=${units}&appid=${service.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush('Invalid request parameters', { status: 404, statusText: 'Not Found' });
  });

});
