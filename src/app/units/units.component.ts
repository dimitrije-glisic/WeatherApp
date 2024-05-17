import {Component, EventEmitter, Output} from '@angular/core';
import {MatChip, MatChipSet} from "@angular/material/chips";

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [
    MatChip,
    MatChipSet
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css'
})
export class UnitsComponent {

  @Output() unitChanged: EventEmitter<'metric' | 'imperial'> = new EventEmitter<'metric' | 'imperial'>();

  onUnitChange(metric: 'metric' | 'imperial') {
    this.unitChanged.emit(metric);
  }
}
