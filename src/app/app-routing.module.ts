import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteSortSingleProductsBackendComponent } from './components/route-sort-single-products-backend/route-sort-single-products-backend.component';
import { SearchRouteMultiJobsComponent } from './components/search-route-multi-jobs/search-route-multi-jobs.component';
import { RouteFilterSingleProductsBackendComponent } from './components/route-filter-single-products-backend/route-filter-single-products-backend.component';
import { RouteFilterMultiCardsFrontendComponent } from './components/route-filter-multi-cards-frontend/route-filter-multi-cards-frontend.component';
import { PaginationFrontEndCitiesComponent } from './components/pagination-front-end-cities/pagination-front-end-cities.component';
import { RouteSortSingleProductsBackendComponentModule } from './components/route-sort-single-products-backend/route-sort-single-products-backend.component-module';
import { SearchRouteMultiJobsComponentModule } from './components/search-route-multi-jobs/search-route-multi-jobs.component-module';
import { RouteFilterSingleProductsBackendComponentModule } from './components/route-filter-single-products-backend/route-filter-single-products-backend.component-module';
import { RouteFilterMultiCardsFrontendComponentModule } from './components/route-filter-multi-cards-frontend/route-filter-multi-cards-frontend.component-module';
import { PaginationFrontEndCitiesComponentModule } from './components/pagination-front-end-cities/pagination-front-end-cities.component-module';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'route-sort-single-products-be/:sort', component: RouteSortSingleProductsBackendComponent },
    { path: 'search-route-multi-jobs', component: SearchRouteMultiJobsComponent },
    { path: 'product/:category', component: RouteFilterSingleProductsBackendComponent },
    { path: 'route-filter-multi-cars-fe', component: RouteFilterMultiCardsFrontendComponent },
    { path: 'route-pagination-frontend-cities', component: PaginationFrontEndCitiesComponent }
  ]), RouteSortSingleProductsBackendComponentModule, SearchRouteMultiJobsComponentModule, RouteFilterSingleProductsBackendComponentModule, RouteFilterMultiCardsFrontendComponentModule, PaginationFrontEndCitiesComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
