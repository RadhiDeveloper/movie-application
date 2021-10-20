import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  header: any;
  baseURL: any = "https://skyit-coding-challenge.herokuapp.com/";
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getMoviesList(): Observable<any> {
    return this.http.get(`${this.baseURL}movies/`, {
      headers: this.header
    });
  }
}
