import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }


  post(body:any): Observable<any> {

    return this.http.post('https://calidad.neeru.com.ve:5009/api/v1/login', body);
    // return this.http.post('http://localhost:3000/api/v1/login', body);


  }

}
