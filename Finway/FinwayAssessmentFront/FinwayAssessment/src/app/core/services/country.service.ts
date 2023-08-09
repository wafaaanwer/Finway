import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryModel } from '../models/country/country.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiUrl + 'Countries/';
  constructor(private httpClient: HttpClient
    //, private routerHelper: RouterHelper
    ) { }
  getAll(): Observable<CountryModel[]> {
    return this.httpClient.get<CountryModel[]>(`${this.baseUrl}GetCountries`);
  }
}
