import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForecastService } from '../forecast.service';

import { Router } from '@angular/router'; 

export interface LoginUser {
  email : string,
  password : string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private forecast: ForecastService, private router : Router) { }

  email = "Ashwin@root.com";
  password = "root";
  
  loginValidator = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, Validators.required)
  })

  user : LoginUser = {
    email : "",
    password : ""
  }

  login() {
    if(this.loginValidator.valid){
      const email = this.loginValidator.get(["email"])?.value;
      const password = this.loginValidator.get(["password"])?.value 
      if(email !== ""  && password !== "") {
        this.user.email = email;
        this.user.password = password;
        this.forecast.getUser(this.user).subscribe(data => {
          console.log(data);
          if(data.status.message === 'success'){
            console.log("Logged In");
            localStorage.setItem("userDetails", JSON.stringify(data.data[0]));
            this.router.navigate(['/file-upload']);
          }
        });
      }
    }
  }

  ngOnInit(): void {
  }

}
