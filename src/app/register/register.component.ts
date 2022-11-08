import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormGroup , FormControl , Validators } from '@angular/forms';
import { ForecastService } from '../forecast.service';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http : HttpClient , private forecastService : ForecastService) { }
  name = "Ashwin"
  email = "Ashwin@root.com";
  password = "root";
  
  registerValidator = new FormGroup({
    name : new FormControl(null, [Validators.required]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, Validators.required),
    cpassword : new FormControl(null, Validators.required)
  })

  user : User = {
    name : "",
    email : "",
    password : ""
  }
  register() {
    if(this.registerValidator.valid){
      const name = this.registerValidator.get(["name"])?.value
      const email = this.registerValidator.get(["email"])?.value;
      const password = this.registerValidator.get(["password"])?.value;
      const cpassword = this.registerValidator.get(["cpassword"])?.value
      if(this.name !== "" && email !== "" && cpassword === password) {
        this.user.name = name;
        this.user.email = email;
        this.user.password = password;
        this.forecastService.createUser(this.user).subscribe(success => console.log(success));
      }
    }
  }

  ngOnInit(): void {
  }

}
