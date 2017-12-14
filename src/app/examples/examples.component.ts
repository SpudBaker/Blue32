import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-examples',
  templateUrl: 'examples.component.html'
})



export class ExamplesComponent {
  displayedColumns = ['icao', 'name', 'city', 'elevation'];
  inputAltitude = 1000;
  baseUrl = 'http://blue32.herokuapp.com';
  ELEMENT_DATA: [Element];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyIcaoFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private http: HttpClient) {
    this.callCountriesService('MX', 0);

  }

  callCountriesService(countryCode: string, minElevation: number) {
    const t = this;
    return this.http
        // http://<baseurl>/samples/airports/?countryCode=MX&elevation=1000
        .get(this.baseUrl + '/samples/airports/' + '?' + 'countryCode=' + countryCode + '&' + 'elevation=' + minElevation)
        .catch(e => {
          return Observable.throw(e);
        })
        .subscribe(c => {
          t.ELEMENT_DATA = c;
          t.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        });
}

  getCountries() {
    return countries;
  }

}

export interface Element {
  countryCode: string;
  icao: string;
  name: string;
  city: string;
  elevation: number;
}

const countries = [
  {code: 'MX', name: 'Mexico'},
  {code: 'US', name: 'USA'},
  {code: 'UK', name: 'United Kingdown'}
];
