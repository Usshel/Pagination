import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouteSortSingleProductsBackendComponent } from './route-sort-single-products-backend.component';

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule],
  declarations: [RouteSortSingleProductsBackendComponent],
  providers: [],
  exports: [RouteSortSingleProductsBackendComponent]
})
export class RouteSortSingleProductsBackendComponentModule {
}
