import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousLocationsComponent } from './previous-locations.component';

describe('PreviousLocationsComponent', () => {
  let component: PreviousLocationsComponent;
  let fixture: ComponentFixture<PreviousLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousLocationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
