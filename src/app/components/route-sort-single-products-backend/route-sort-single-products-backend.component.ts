import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-route-sort-single-products-backend',
  styleUrls: ['./route-sort-single-products-backend.component.scss'],
  templateUrl: './route-sort-single-products-backend.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteSortSingleProductsBackendComponent {
  readonly directions$: Observable<string[]> = of(['asc', 'desc'])
  readonly productList$: Observable<ProductModel[]> = this._activatedRoute.params.pipe(
    switchMap((sortDirection) => this._productService.getAllSort(sortDirection['sort']))
  );
 
    //Is it just faster way of using a method which will change the router and would send a string to subject piped with productList?
 

  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _router: Router) {
  }
  onSortSelected(direction: string): void{
    this._router.navigateByUrl('route-sort-single-products-be/' + direction);
  }
}
