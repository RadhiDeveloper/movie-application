import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  moviesList: any = [];
  directorList: any = [];
  certificationList: any = [];
  tableHeaders = [{ headerName: 'Title', type: 'searchBox'}, { headerName: 'Year', type: 'searchBox'},
    { headerName: 'Running Time', type: 'searchBox'}, { headerName: 'Director', type: 'dropdown'},
    { headerName: 'Certification', type: 'dropdown'}, { headerName: 'Rating', type: 'searchBox'}];
  constructor(
    private adminService: ApiService,
  ) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    this.adminService.getMoviesList().subscribe(
      response => this.getMoviesListSuccess(response),
      error => this.handleError(error)
    );
  }

  getMoviesListSuccess(response: any) {
    this.moviesList = response;
    this.moviesList = this.moviesList.map((val: any) => {
      val.rating = (val.rating / 5) * 100;
      return val;
    });

    this.directorList = this.moviesList.map((val: any) => {
      return {
        value: val.director,
        title: val.director
      }
    });

    this.certificationList = this.moviesList.map((val: any) => {
      return {
        value: val.certification,
        title: val.certification
      }
    });
    this.certificationList = [...new Map(this.certificationList.map((item: any) => [item.value, item])).values()];
  }

  handleError(error: any) {
    console.log(error);
  }

}
