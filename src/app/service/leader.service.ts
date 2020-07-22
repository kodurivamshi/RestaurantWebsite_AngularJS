import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
//import {Leaders} from '../shared/leaders';
import {of,Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcesshttpmsgService} from '../services/processhttpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processhttpmsgservice:ProcesshttpmsgService) { }

  getLeaders(): Observable<Leader[]>{
    //return of(Leaders).pipe();
    return this.http.get<Leader[]>(baseURL+'leadership')
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }

  getFeaturedLeader(): Observable<Leader>{
   // return of(Leaders.filter(leader=>leader.featured)[0]).pipe();
   return this.http.get<Leader>(baseURL + 'leadership?featured=true')
   .pipe(map(leaders=>leaders[0]))
   .pipe(catchError(this.processhttpmsgservice.handleError));
  }

}
