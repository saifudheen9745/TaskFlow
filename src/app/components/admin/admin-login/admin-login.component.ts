import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(private router:Router){}
  email:string = 'admin@gmail.com';
  password:string =  'admin';
  formEmail:string = '';
  formPassword:string = '';
  formError = ''
  formSubmit(){
    if(this.formEmail === this.email && this.formPassword === this.password){
      this.formError = ''
      localStorage.setItem('isAdminLogged','true')
      this.router.navigate(['/admin/users'])
    }else{
      this.formError = "Invalid credentials"
    }
  }
}
