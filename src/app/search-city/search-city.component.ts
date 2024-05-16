import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {SearchCityService} from "../search-city.service";
import {MatList, MatListItem} from "@angular/material/list";
import {DecimalPipe, LowerCasePipe, NgIf} from "@angular/common";
import {MatLine} from "@angular/material/core";
import {Location} from "../model/location";

@Component({
  selector: 'app-search-city',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatListItem,
    MatList,
    NgIf,
    MatLine,
    LowerCasePipe,
    DecimalPipe
  ],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css'
})
export class SearchCityComponent {
  cityName: string;
  @Output() citySelected = new EventEmitter<Location>();
  locations: Location[];

  @ViewChild('cityList') cityList!: ElementRef;

  constructor(private searchService: SearchCityService) {
    this.cityName = '';
    this.locations = [];
  }

  onSubmit() {
    this.searchService.getLocations(this.cityName).subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  onLocationSelected(location: Location) {
    this.citySelected.emit(location);
    this.locations = [];
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.cityList && !this.cityList.nativeElement.contains(event.target)) {
      this.locations = [];
    }
  }

}
