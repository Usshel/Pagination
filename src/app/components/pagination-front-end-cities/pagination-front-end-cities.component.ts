import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, of, shareReplay, take, tap } from 'rxjs';
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
  

  readonly paginatorData$: Observable<PaginatorData> =
   this._activatedRoute.queryParams.pipe(
    map((params) => {
      return {
      pageNumber: params['pageNumber'] ? Math.max(1 , +params['pageNumber']) : 1,
      pageSize: params['pageSize'] ? Math.max(5, +params['pageSize']) : 5   
    };                 //stores our queryparams
    }) 
  ).pipe(shareReplay(1));
  
  readonly listCities$: Observable<CityModel[]> = 
  this._paginationFrontEndCitiesService.getAllCities().pipe(
    shareReplay(1));


    //combaining two observables to calculate pageNumber
    readonly listPage$: Observable<any> = combineLatest([
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
        return Array.from(                                          //Array.form is used to create an array from given variables/objects...
          Array(Math.ceil(cities.length / params.pageSize)).keys()  //Math.ceil static method always rounds up and returns -           
        ).map((index) => index + 1)                                 //the smaller(nearest) integer greater than or equal to a given number.                                                         
      })                                                            // .keys() -> returns a indexes of array with undefined variables length 15 
    )                                                               // then we map an array of indexes by adding to every single index number +1

  readonly CitiesPerPage$: Observable<CityModel[]> = combineLatest([
    this.listCities$,
    this.paginatorData$
  ]).pipe(
    map(([cities, params]) => 
    cities.slice(     
      (params.pageNumber - 1) * params.pageSize, params.pageSize * params.pageNumber      //example: (3-1) * 5, 3*5 so cities will be cutted in index 10 to 15
    )))                                                                                   // ( so there will be 5 cities on page)

  constructor(private _paginationFrontEndCitiesService: PaginationFrontEndCitiesService, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }
  // "..." allows us to work with variables inside object so we dont have iritate through every item

  choosePage(event: MatSelectionListChange): void {
    this.paginatorData$.pipe(
      take(1),
      tap((params) => {
      this._router.navigate([], {
        queryParams: { 
          pageNumber: event.options[0].value,
          pageSize: params['pageSize']
        }
      });
    })
    ).subscribe()
  }


  choosePageSize(event: MatSelectionListChange): void {
    combineLatest([
      this.paginatorData$.pipe(take(1)),
      this.listCities$
    ]).pipe(
      tap(([params, cities]) => {
        this._router.navigate([], {
          queryParams: {
            pageNumber: Math.min(                                 // Math.min takes the smallest value from Math.ceil or params['pageNumber'] and 
              Math.ceil(cities.length / event.options[0].value),  // set a PageNumber as the smallest number
            params['pageNumber']
            ),
            pageSize: event.options[0].value
          }
        });
      })
    ).subscribe()
  }



}
