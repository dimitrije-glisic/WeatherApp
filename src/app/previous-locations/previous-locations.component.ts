import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Location} from "../model/location";
import {DecimalPipe, LowerCasePipe} from "@angular/common";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-previous-locations',
  standalone: true,
  imports: [
    DecimalPipe,
    LowerCasePipe,
    MatLine,
    MatList,
    MatListItem,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './previous-locations.component.html',
  styleUrl: './previous-locations.component.css'
})
export class PreviousLocationsComponent {
  _locations: Location[] | undefined;
  @Input() set locations(value: Location[] | undefined) {
    this._locations = value;
  }

  @Output() locationSelected = new EventEmitter<Location>();
  @Output() locationRemoved = new EventEmitter<Location>();

  constructor() {
  }

  onLocationSelected(location: Location) {
    this.locationSelected.emit(location);
  }

  removeLocation(location: Location) {
    this.locationRemoved.emit(location);
  }

}
