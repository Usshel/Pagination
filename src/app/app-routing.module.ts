import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteSortSingleProductsBackendComponent } from './components/route-sort-single-products-backend/route-sort-single-products-backend.component';
import { RouteSortSingleProductsBackendComponentModule } from './components/route-sort-single-products-backend/route-sort-single-products-backend.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'route-sort-single-products-be/:sort', component: RouteSortSingleProductsBackendComponent }]), RouteSortSingleProductsBackendComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
