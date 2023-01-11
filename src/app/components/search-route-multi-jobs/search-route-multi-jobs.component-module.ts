import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SearchRouteMultiJobsComponent } from './search-route-multi-jobs.component';

@NgModule({
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatTableModule],
  declarations: [SearchRouteMultiJobsComponent],
  providers: [],
  exports: [SearchRouteMultiJobsComponent]
})
export class SearchRouteMultiJobsComponentModule {
}
