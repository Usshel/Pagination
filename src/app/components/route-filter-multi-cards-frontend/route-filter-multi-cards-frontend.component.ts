import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, shareReplay, take, tap } from 'rxjs';
import { ComfortFeaturesModel } from '../../models/comfort-features.model';
import { BrandsModel } from '../../models/brands.model';
import { RouteFilterMultiCardsFrontendService } from '../../services/route-filter-multi-cards-frontend.service';
import { CarsModel } from 'src/app/models/cars.model';

@Component({
  selector: 'app-route-filter-multi-cards-frontend',
  templateUrl: './route-filter-multi-cards-frontend.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteFilterMultiCardsFrontendComponent {
  // 
  readonly listComfortFeatures$: Observable<ComfortFeaturesModel[]> = this._routeFilterMultiCardsFrontendService.getAllComfortFeatures();
  readonly listBrands$: Observable<BrandsModel[]> = this._routeFilterMultiCardsFrontendService.getAllBrands();

  //SET is an array which store DIistinct/Unique VALUES (Unique values are the items that appear in a Array only once)
  //EXAMPLE: Set[] Array[] -> push '1' Set['1'], Array['1'] -> push 1 (again) Set['1'], Array['1','1']

  readonly filterValues$: Observable<{                                                           
    brands: Set<string>;                          //typing variables which are type Set<string>
    comfortFeatures: Set<string>;
    }> = this._activatedRoute.queryParams.pipe(  //ActivatedRoute object that make up the current state of the router.
      map((params) => {
        return{
          brands: new Set<string>
          ( //in () define what will be in brands: Set
            params['brands'] === undefined ? [] : params['brands'].split(',')
          ),
          comfortFeatures: new Set<string>
          (
            params['comfort-features'] === undefined ? [] : params['comfort-features'].split(',')
          )
        };
        
      }),
      shareReplay(1)
    ) 

    readonly listCars$: Observable<CarsModel[]> = combineLatest([
      this.filterValues$,
      this._routeFilterMultiCardsFrontendService.getAllCars()
    ]).pipe(
      map(([params, cars]) => 
      cars.filter((car) => params.brands.size === 0 || params.brands.has(car.brandId))
        .filter(
          (car) => params.comfortFeatures.size === 0 ||
          //  car.comfortFeatureIds.filter((cfId) =>                                    //contain each of comfort features
          //  params.comfortFeatures.has(cfId)).length === params.comfortFeatures.size) 
        car.comfortFeatureIds.find((cfId: string) => params.comfortFeatures.has(cfId)  //any of choosen comfort features 
      )))
    );


  constructor(private _routeFilterMultiCardsFrontendService: RouteFilterMultiCardsFrontendService, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //method injected to component brandsList in HTML
  onBrandSelected(brand: BrandsModel, isSelected: boolean): void {
    this.filterValues$.pipe(
      take(1),
      tap((data) => {
        const brandParamSet = data.brands;
        isSelected === true ? brandParamSet.add(brand.id) : brandParamSet.delete(brand.id);

        this._router.navigate([], {
          queryParams: this._mergeQueryParams(data.comfortFeatures, brandParamSet)
        })
      })
    ).subscribe();
  }

  //method injected to component in CFList in HTML
  onComfortFeatureChanged(comfortFeature: ComfortFeaturesModel,isSelected: boolean){
    this.filterValues$.pipe(
      take(1),                  //why take is used there
      tap((data) => {           //tap what means side effects?
        const cfparamSet = data.comfortFeatures;
        isSelected === true ? cfparamSet.add(comfortFeature.id) : cfparamSet.delete(comfortFeature.id);
        
        this._router.navigate([],{
          queryParams: this._mergeQueryParams(cfparamSet, data.brands)        //there is our params
        })
      })
    ).subscribe();
  }


  // what does that function?
  // ---ANSWER---: return two params as one 
  private _mergeQueryParams(
    cfParamSet: Set<string>,
    brandParamSet: Set<string> 
  ): Record<string, string>{
    const queryParams= {} as Record<string, string>;
    if(cfParamSet.size > 0){              //what exactly '...' do?
      queryParams['comfort-features'] = [...cfParamSet].sort().join(',');
    }
    if(brandParamSet.size > 0) {
      queryParams['brands'] = [...brandParamSet].sort().join(',');
    }
    return queryParams;



  }     //what is Record?

}
