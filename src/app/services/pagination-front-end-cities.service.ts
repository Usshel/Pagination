import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';

@Injectable({ providedIn: 'root' })
export class PaginationFrontEndCitiesService {
  constructor(private _httpClient: HttpClient) {
  }

  getAllCities(): Observable<CityModel[]> {
    return this._httpClient.get<CityModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/cities');
  }
}
