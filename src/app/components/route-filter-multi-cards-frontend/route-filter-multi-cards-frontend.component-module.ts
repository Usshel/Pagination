import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouteFilterMultiCardsFrontendComponent } from './route-filter-multi-cards-frontend.component';

@NgModule({
  imports: [MatCardModule, MatCheckboxModule, CommonModule, MatListModule, MatTableModule],
  declarations: [RouteFilterMultiCardsFrontendComponent],
  providers: [],
  exports: [RouteFilterMultiCardsFrontendComponent]
})
export class RouteFilterMultiCardsFrontendComponentModule {
}
