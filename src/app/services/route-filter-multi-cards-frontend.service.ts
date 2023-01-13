import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarsModel } from '../models/cars.model';
import { ComfortFeaturesModel } from '../models/comfort-features.model';
import { BrandsModel } from '../models/brands.model';

@Injectable({ providedIn: 'root' })
export class RouteFilterMultiCardsFrontendService {
  constructor(private _httpClient: HttpClient) {
  }

  getAllCars(): Observable<CarsModel[]> {
    return this._httpClient.get<CarsModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/cars');
  }

  getAllComfortFeatures(): Observable<ComfortFeaturesModel[]> {
    return this._httpClient.get<ComfortFeaturesModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/car-comfort-features');
  }

  getAllBrands(): Observable<BrandsModel[]> {
    return this._httpClient.get<BrandsModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/car-brands');
  }
}
