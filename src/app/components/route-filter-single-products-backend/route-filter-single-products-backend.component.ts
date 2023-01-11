import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-route-filter-single-products-backend',
  templateUrl: './route-filter-single-products-backend.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteFilterSingleProductsBackendComponent {

  readonly listCategories$: Observable<string[]> = this._productService.getAllCategories();
  readonly listProducts$: Observable<ProductModel[]> = this._activatedRoute.params.pipe(
    switchMap((data) => this._productService.getAllProductsByCategory(data['category']))
  )

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }
  onSubmittedCategory(category:string): void{
    this._router.navigateByUrl(`product/`+ category)
  }
}
