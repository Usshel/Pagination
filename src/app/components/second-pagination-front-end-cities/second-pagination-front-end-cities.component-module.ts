import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SecondPaginationFrontEndCitiesComponent } from './second-pagination-front-end-cities.component';

@NgModule({
  imports: [MatCardModule, MatListModule, CommonModule],
  declarations: [SecondPaginationFrontEndCitiesComponent],
  providers: [],
  exports: [SecondPaginationFrontEndCitiesComponent]
})
export class SecondPaginationFrontEndCitiesComponentModule {
}
