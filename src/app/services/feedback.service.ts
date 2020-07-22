import { Injectable } from '@angular/core';
import {of,Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcesshttpmsgService} from './processhttpmsg.service';
import {Feedback} from '../shared/feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
    private processhttpmsgservice:ProcesshttpmsgService) { }


    submitFeedback(feed:Feedback):Observable<Feedback>{
      const httpOptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      };
      return this.http.post<Feedback>(baseURL+'feedback',feed,httpOptions)
      .pipe(catchError(this.processhttpmsgservice.handleError));
    }
}

