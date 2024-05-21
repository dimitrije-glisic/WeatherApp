import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet,
    NgClass,
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css'
})
export class UnitsComponent {

  _currentUnit: 'metric' | 'imperial' = 'metric';
  @Input() set currentUnit(value: 'metric' | 'imperial') {
    console.log('currentUnit', value);
    this._currentUnit = value;
  }

  @Output() unitChanged: EventEmitter<'metric' | 'imperial'> = new EventEmitter<'metric' | 'imperial'>();

  onUnitChange(metric: 'metric' | 'imperial') {
    this.currentUnit = metric;
    this.unitChanged.emit(metric);
  }
}
