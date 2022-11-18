import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data ='';
  loginForm : FormGroup;
  constructor( private loginService: LoginService ) {

    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
   }

  ngOnInit(): void {
  }


  login(){
    console.log('Se dispara el login')
    console.log(this.loginForm.value)
    this.loginService.post(this.loginForm.value).subscribe((data:any) => {
      console.log(data);
      this.data =  JSON.stringify(data);
    })

  }
}
