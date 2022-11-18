import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data ='';
  loginForm : FormGroup;
  android = false
  constructor( private loginService: LoginService,
    private platform: Platform) {

    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
   }

  ngOnInit(): void {
      if (this.platform.ANDROID) {
        this.android = true;
      }

      window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
        const passwordInput = document.getElementById("password-input")
        passwordInput?.addEventListener("input", this.alphaOnly.bind(this));
        console.log('Consiguio el elemento',passwordInput)
    });
      

      



    
  }


  login(){
    console.log('Se dispara el login')
    console.log(this.loginForm.value)
    this.loginService.post(this.loginForm.value).subscribe((data:any) => {
      console.log(data);
      this.data =  JSON.stringify(data);
    })

  }

  getKeyCode(str: string) {
    return str && str.charCodeAt(0);    
  }
   keyUp(e: any) {
    let string = e.target.value;
    console.log(string);
   let keyCode = this.getKeyCode(string.charAt(string.length - 1)); 
   console.log('Key Code:',keyCode)
   console.log('del string',keyCode)
  }

  alphaOnly(e:any) {
    console.log('entra con el evento',e)
    e.target.value = e.target.value.replace(/[^0-9]/ig, '');
    }
}
