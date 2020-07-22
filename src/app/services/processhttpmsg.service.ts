import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcesshttpmsgService {

  constructor() { }

  public handleError(error : HttpErrorResponse | any){
    let erMsg:string;
    if(error.error instanceof ErrorEvent){
      erMsg=error.error.message;
    }
    else{
      erMsg=`${error.status}- ${error.statusText || ' '}`;
    }
    return throwError(erMsg);
  }
}
