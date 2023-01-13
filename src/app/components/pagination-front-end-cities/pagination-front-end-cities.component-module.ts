import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PaginationFrontEndCitiesComponent } from './pagination-front-end-cities.component';

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule],
  declarations: [PaginationFrontEndCitiesComponent],
  providers: [],
  exports: [PaginationFrontEndCitiesComponent]
})
export class PaginationFrontEndCitiesComponentModule {
}
