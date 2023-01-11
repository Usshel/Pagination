import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPostsModel } from '../models/job-posts.model';

@Injectable({ providedIn: 'root' })
export class JobPostsService {
  constructor(private _httpClient: HttpClient) {
  }

  getAllJobs(): Observable<JobPostsModel[]> {
    return this._httpClient.get<JobPostsModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts');
  }
}
