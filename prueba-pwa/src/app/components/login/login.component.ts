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

     /**
   * Método utilizado para parsear los montos
   * @param str monto ingresado en el control amount
   */
  parseAmount(e:any) {


    e.preventDefault();
    let str = e.target.value;

    //Quittamos todo los puntos y comas del string para tenrlo limpio
    str = str.replace(/\,/g, '');
    str = str.replace(/\./g, '')


    if (!isNaN(parseInt(e.key)) && !(str === "000" && e.key === "0") && str.length < 15) {
      str += e.key
      if (str[0] === "0") str = str.substring(1);
    }
    else if (e.key === "Backspace" && str !== "000") {
      str = str.slice(0, -1)
      if (str.length < 3) str = "0" + str
    }
    else return;

    //Creamos un array con cada elemento del string
    let amount = str.split('');

    //Se coloca una punto para marcar los 2 decimales
    amount.splice(-2, 0, '.');

    //Se convierte el array en string con los decimales ya puestos
    let numberWD = amount.toString();
    numberWD = numberWD.replace(/\,/g, '');

    //Separamos parte entera y parte decimal
    let aux = numberWD.split('.');
    let intNumber = aux[0].split('').reverse();
    let dcNumber = aux[1];

    //Iniicalizamos array para guardar el numero con los puntos de separacion
    let dotNumberResult:any[] = []
    let cont = 0;

    //Pusheamos los puntos de separacion cada 3 numeros
    intNumber.forEach((number:any) => {

      if (cont % 3 == 0 && cont != 0) {
        dotNumberResult.push('.')
      }

      cont++;
      dotNumberResult.push(number);

    })

    dotNumberResult.reverse();

    //Convertimos las parte entera con los separadores a string
    let result = dotNumberResult.toString();
    result = result.replace(/\,/g, '');

    //Juntamos parte entera y parte decimal
    result = result + ',' + dcNumber;

    this.loginForm.controls['password'].setValue(result);
  }

   /**
   *
   */
    validateAmount() {

      let amount: string = this.loginForm.value.amount
  
      if (amount == '0,00' || amount.length < 4) {
  
        this.loginForm.controls['amount'].setErrors({ 'novalidate': true })
      }
  
    }
  

}
