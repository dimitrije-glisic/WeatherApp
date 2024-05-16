import {TestBed} from '@angular/core/testing';

import {SearchCityService} from './search-city.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Location} from "./model/location";

describe('SearchCityService', () => {
  let service: SearchCityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchCityService]
    });
    service = TestBed.inject(SearchCityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch locations correctly', () => {
    const mockLocations: Location[] = [
      {name: 'Belgrade', local_names: [{ascii: '', feature_name: ''}], country: 'RS', lat: 44.8, lon: 20.47},
      {name: 'Belgrade', local_names: [{ascii: '', feature_name: ''}], country: 'US', lat: 42.43, lon: 19.27}
    ];

    const cityName = 'Belgrade';

    service.getLocations(cityName).subscribe(locations => {
      expect(locations.length).toBe(2);
      expect(locations).toEqual(mockLocations);
    })

    const req = httpMock.expectOne(`${service.url}${cityName}&limit=${service.limit}&appid=${service.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLocations);

  });

  it('should handle no locations found', () => {

    const cityName = 'InvalidCityName';

    service.getLocations(cityName).subscribe(locations => {
      expect(locations.length).toBe(0);
    });

    const req = httpMock.expectOne(`${service.url}${cityName}&limit=${service.limit}&appid=${service.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);

  });

  it('should handle HTTP error', () => {
    const cityName = 'InvalidCityName';

    service.getLocations(cityName).subscribe(
      () => fail('should have failed with the 404 error'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${service.url}${cityName}&limit=${service.limit}&appid=${service.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush('Invalid request', {status: 404, statusText: 'Not Found'});

  });

});
