import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
//import {promote} from '../shared/promotions';
import {of,Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcesshttpmsgService} from '../services/processhttpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

  constructor(private http:HttpClient,
    private processhttpmsgservice:ProcesshttpmsgService) { }

  getPromoteDishes():Observable<Promotion[]>{
    //return of(promote).pipe();
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }

  getPromoteDish(id:string):Observable<Promotion>{
    //return of(promote.filter(dish=>dish.id===id)[0]).pipe();
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(this.processhttpmsgservice.handleError);
  }

  getPromoteFeaturedDish():Observable<Promotion>{
    //return of(promote.filter(dish=>dish.featured)[0]).pipe();
    return this.http.get<Promotion>(baseURL+'promotions?featured=true')
    .pipe(map(promotions=>promotions[0]))
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }
}
