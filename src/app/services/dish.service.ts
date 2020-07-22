import { Injectable } from '@angular/core';
import {Dish } from '../shared/dish';
//import {dishes} from '../shared/dishes';
import {of,Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcesshttpmsgService} from './processhttpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
    private processhttpmsgservice:ProcesshttpmsgService) { }

  getDishes(): Observable<Dish[]>{
    //return of(dishes).pipe();
    return this.http.get<Dish[]>(baseURL+'dishes')
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }

  getDish(id:string): Observable<Dish>{
   // return of(dishes.filter(dish=>dish.id===id)[0]).pipe();
    return this.http.get<Dish>(baseURL+'dishes/'+id)
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }

  getFeaturedDish():Observable<Dish>{
    //return of(dishes.filter(dish=>dish.featured)[0]).pipe();
    return this.http.get<Dish>(baseURL+'dishes?featured=true')
    .pipe(map(dishes=>dishes[0]))
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }

  getStringids():Observable<string[] | any>{
    //return of(dishes.map(dish=>dish.id));
    return this.getDishes()
    .pipe(map(dishes=>dishes.map(dish=>dish.id)))
    .pipe(catchError(error=>error));
    
  }

  putDish(dish:Dish):Observable<Dish>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.put<Dish>(baseURL+'dishes/'+dish.id,dish,httpOptions)
    .pipe(catchError(this.processhttpmsgservice.handleError));
  }
}
