import GTK from '../models/gtk.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class GTKService {

  api_url = 'https://goodtoknowapp.herokuapp.com';
  GTKUrl = `${this.api_url}/api/gtk`;

  constructor(
    private http: HttpClient
  ) { }


  createGTK(gtk: GTK): Observable<any>{
    return this.http.post(`${this.GTKUrl}`, gtk);
  }

  getGTKs(): Observable<GTK[]>{
    return this.http.get(this.GTKUrl)
      .map(res  => {
        return res["data"].docs as GTK[];
      })
  }

  editGTK(gtk: GTK){
    let editUrl = `${this.GTKUrl}`
    return this.http.put(editUrl, gtk);
  }

  deleteGTK(id:string):any{
    let deleteUrl = `${this.GTKUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res  => {
        return res;
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
