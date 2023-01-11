import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteSortSingleProductsBackendComponent } from './components/route-sort-single-products-backend/route-sort-single-products-backend.component';
import { SearchRouteMultiJobsComponent } from './components/search-route-multi-jobs/search-route-multi-jobs.component';
import { RouteSortSingleProductsBackendComponentModule } from './components/route-sort-single-products-backend/route-sort-single-products-backend.component-module';
import { SearchRouteMultiJobsComponentModule } from './components/search-route-multi-jobs/search-route-multi-jobs.component-module';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'route-sort-single-products-be/:sort', component: RouteSortSingleProductsBackendComponent },
    { path: 'search-route-multi-jobs', component: SearchRouteMultiJobsComponent }
  ]),
    RouteSortSingleProductsBackendComponentModule, SearchRouteMultiJobsComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
