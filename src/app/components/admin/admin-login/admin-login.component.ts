import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email:string = 'admin@gmail.com';
  password:string =  'admin';
  formEmail:string = '';
  formPassword:string = '';
  formError = ''
  formSubmit(){
    if(this.formEmail === this.email && this.formPassword === this.password){
      this.formError = ''
      console.log(this.formEmail,this.formPassword);
      
    }else{
      this.formError = "Invalid credentials"
    }
  }
}
