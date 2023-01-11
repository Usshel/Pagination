import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private _httpClient: HttpClient) {
  }

  getAllSort(sort: string): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>(`https://fakestoreapi.com/products?sort=${sort}`);
  }
}
