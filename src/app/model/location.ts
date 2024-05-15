export interface Location {
  name: string;
  local_names: [{
    ascii: string;
    feature_name: string;
  }];
  lat: number;
  lon: number;
  country: string;
}
