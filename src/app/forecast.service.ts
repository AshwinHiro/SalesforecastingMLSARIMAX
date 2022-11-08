import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders } from '@angular/common/http';

import { User } from "./register/register.component";
import { LoginUser } from './login/login.component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http : HttpClient) { }

  createUser(user: User) {
    return this.http.post("http://127.0.0.1:5000/api/register_user", user, httpOptions);
  }

  getUser(user: LoginUser) : Observable<any>{
    return this.http.get<LoginUser>(`http://127.0.0.1:5000/api/login_user/?email=${user.email}&password=${user.password}`)
  }

  uploadcsv(file : File, offsetYears : any) : Observable<any>{
    
    const formData = new FormData();

    formData.append("file",file, file.name);

    formData.append("offsetYears",offsetYears)
    
    console.log(formData);  
    return this.http.post("http://127.0.0.1:5000/api/csvupload", formData);
  }
}
