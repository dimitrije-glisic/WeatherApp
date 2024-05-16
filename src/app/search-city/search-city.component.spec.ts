import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchCityComponent} from './search-city.component';
import {SearchCityService} from "../search-city.service";
import {Location} from "../model/location";
import {of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const mockLocation: Location = {
  name: 'London',
  local_names: [{ascii: 'London', feature_name: 'London'}],
  lat: 51.5074,
  lon: 0.1278,
  country: 'UK'
};

describe('SearchCityComponent', () => {
  let component: SearchCityComponent;
  let fixture: ComponentFixture<SearchCityComponent>;
  let searchService: jasmine.SpyObj<SearchCityService>;

  beforeEach(async () => {
    const searchServiceSpy = jasmine.createSpyObj('SearchCityService', ['getLocations']);
    await TestBed.configureTestingModule({
      imports: [SearchCityComponent, BrowserAnimationsModule],
      providers: [{provide: SearchCityService, useValue: searchServiceSpy}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchCityComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchCityService) as jasmine.SpyObj<SearchCityService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(searchService).toBeTruthy();
  });

  it('should call getLocations and update locations when onSubmit is called', () => {
    const mockLocations: Location[] = [mockLocation];
    searchService.getLocations.and.returnValue(of(mockLocations));

    component.cityName = 'London';
    component.onSubmit();

    expect(searchService.getLocations).toHaveBeenCalledWith('London');
    expect(component.locations).toEqual(mockLocations);
  });

  it('should emit citySelected when onCitySelected is called', () => {
    const emitSpy = spyOn(component.citySelected, 'emit');

    component.onLocationSelected(mockLocation);

    expect(emitSpy).toHaveBeenCalledWith(mockLocation);
    expect(component.locations).toEqual([]);
  });

});
