import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { JobPostsModel } from '../../models/job-posts.model';
import { JobPostsService } from '../../services/job-posts.service';

@Component({
  selector: 'app-search-route-multi-jobs',
  styleUrls: ['./search-route-multi-jobs.component.scss'],
  templateUrl: './search-route-multi-jobs.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRouteMultiJobsComponent {
  readonly search: FormGroup = new FormGroup({ word: new FormControl() });


  readonly listJobs$: Observable<JobPostsModel[]> = combineLatest([
    this._activatedRoute.queryParams.pipe(
      map((params) => params['search'])               //there hits out corporate.value.word 
    ),
    this._jobPostsService.getAllJobs()
  ]).pipe(
    map(([included, jobs]) => jobs.filter(jobs =>
      jobs.title.toLowerCase().includes(included?.toLowerCase()!) ||
      jobs.description.toLowerCase().includes(included?.toLowerCase()!)))
  );


  constructor(private _activatedRoute: ActivatedRoute, private _jobPostsService: JobPostsService, private _router: Router) {
  }

  onSearchSubmitted(corporate: FormGroup): void {
    this._router.navigate([], {
      queryParams: {                    
        search: corporate.value.word}}        //there is our variable params which will go listJobs observable 
      );
  }
}
