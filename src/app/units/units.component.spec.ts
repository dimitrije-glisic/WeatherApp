import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UnitsComponent} from './units.component';

describe('UnitsComponent', () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit metric', () => {
    spyOn(component.unitChanged, 'emit');
    component.onUnitChange('metric');
    expect(component.unitChanged.emit).toHaveBeenCalledWith('metric');
  });

});
