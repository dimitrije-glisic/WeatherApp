import { TestBed } from '@angular/core/testing';

import { SearchCityService } from './search-city.service';

describe('SearchService', () => {
  let service: SearchCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
