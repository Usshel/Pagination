import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { PaginationFrontEndCitiesService } from '../../services/pagination-front-end-cities.service';

@Component({
  selector: 'app-pagination-front-end-cities',
  templateUrl: './pagination-front-end-cities.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationFrontEndCitiesComponent {

  readonly pageSize: Observable<number[]> = of([5, 10, 15])
  readonly listCities$: Observable<CityModel[]> = this._paginationFrontEndCitiesService.getAllCities();


  constructor(private _paginationFrontEndCitiesService: PaginationFrontEndCitiesService) {
  }
}
