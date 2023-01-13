import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, of, shareReplay } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { PaginationFrontEndCitiesService } from '../../services/pagination-front-end-cities.service';

interface PaginatorData{
  pageNumber: number;
  pageSize: number;
}



@Component({
  selector: 'app-pagination-front-end-cities',
  templateUrl: './pagination-front-end-cities.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationFrontEndCitiesComponent {

  
  readonly pageSize$: Observable<number[]> = of([5, 10, 15])
  

  readonly paginatorData$: Observable<PaginatorData> = this._activatedRoute.params.pipe(
    map((params) => ({
      pageNumber: params['pageNumber'] ? Math.max(1 , +params['pageNumber']) : 1,
      pageSize: params['pageSize'] ? Math.max(+params['pageSize']) : 5                    //stores our queryparams
    }) )
  ).pipe(shareReplay(1));
  readonly listCities$: Observable<CityModel[]> = this._paginationFrontEndCitiesService.getAllCities().pipe(shareReplay(1));

    readonly pageNumber$: Observable<any> = combineLatest([
      this.listCities$,
      this.paginatorData$
    ]).pipe(
      map(([cities, params]) => {
        /* {
          let result: number[] = [];
          for (let i = 1; i <= Math.ceil(cities.length / params.pageSize); i++){
            result.push(i);
          }
          return result
        } */
        return Array.from(
          Array(Math.ceil(cities.length / params.pageSize)).keys()
        ).map((number) => number + 1)
      })
    )

  readonly CitiesPerPage$: Observable<CityModel[]> = combineLatest([
    this.listCities$,
    this.paginatorData$
  ]).pipe(
    map(([cities, params]) => 
    cities.slice(     
      (params.pageNumber - 1) * params.pageSize, params.pageSize * params.pageNumber
    )))

  constructor(private _paginationFrontEndCitiesService: PaginationFrontEndCitiesService, private _activatedRoute: ActivatedRoute) {
  }
  // "..." allows us to work with variables inside object so we dont have iritate through every item

}
