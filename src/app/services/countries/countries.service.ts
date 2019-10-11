import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  // Propiedades
  apiURL: string = 'https://restcountries.eu/rest/v2/all';

  // Metodos
  constructor(private http: HttpClient) { }

  public getCountries(){
    return this.http.get(`${this.apiURL}`);
  }
}
