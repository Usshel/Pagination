import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, of, shareReplay, tap } from 'rxjs';
import { CityModel } from '../../models/city.model';
import { PaginationFrontEndCitiesService } from '../../services/pagination-front-end-cities.service';


interface PageData{
  pageNumber: number;
  pageSize: number;
}

@Component({
  selector: 'app-second-pagination-front-end-cities',
  templateUrl: './second-pagination-front-end-cities.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondPaginationFrontEndCitiesComponent {

  readonly pageSizes: Observable<number[]> = of([5, 10, 15]);
  readonly listCities$: Observable<CityModel[]> = this._paginationFrontEndCitiesService.getAllCities()
  .pipe(shareReplay(1));

  readonly pageData$: Observable<PageData> = 
  this._activatedRoute.queryParams.pipe(
    map((params) => {
      return {
        pageNumber: params['pageNumber'] ? +params['pageNumber'] : 1,
        pageSize: params['pageSize'] ? +params['pageSize'] : 5
      };
    })
  ).pipe(shareReplay(1))

  readonly pages$: Observable<number[]> = combineLatest([
    this.listCities$,
    this.pageData$
  ]).pipe(
    map(([cities, params]) => {
      return Array.from(Array(Math.ceil(cities.length/params.pageSize)).keys()).map((index) => index + 1)
    })
  )

  readonly CitiesOnPage$: Observable<CityModel[]> = combineLatest([
  this.listCities$,
  this.pageData$
  ]).pipe(
    map(([cities, params]) => 
    cities.slice((params.pageNumber - 1)* params.pageSize, params.pageNumber * params.pageSize ))
    );

  constructor(private _paginationFrontEndCitiesService: PaginationFrontEndCitiesService, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

  onPageChanged(event: MatSelectionListChange): void {
    this.pageData$.pipe(
      tap((params) => {
        this._router.navigate([], {
          queryParams:{
            pageNumber: event.options[0].value,
            pageSize: params['pageSize']
          }
        })
      })
    ).subscribe()
  }

  onPageSizeChanged(event:MatSelectionListChange): void {
    combineLatest([
      this.pageData$,
      this.listCities$
    ]).pipe(
      tap(([params, cities]) => {
        this._router.navigate([],{
          queryParams: {
            pageNumber: Math.min(
              Math.ceil(cities.length / event.options[0].value),
              params['pageNumber']
            ),
            pageSize: event.options[0].value
          }
        }
          )
      })
    ).subscribe()
  }

}
