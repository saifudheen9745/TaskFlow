import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, take } from 'rxjs';
import { userAuthResponse } from 'src/app/config/config.types';
import { environment } from 'src/app/environment/environment';
import { addUserDetails } from 'src/app/shared/ngrx/ngrx.actions';
import { selectUserDetails } from 'src/app/shared/ngrx/ngrx.selectors';
import { FormServiceService } from 'src/app/shared/services/formService/form-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private http: HttpClient, private form: FormServiceService, private store:Store, private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.form.registerForm();
  }

  formSubmit(form: FormGroup) {
    this.http
      .post<userAuthResponse>(`${environment.baseUrl}/register`, {
        name: form.controls['name'].value,
        email: form.controls['email'].value,
        password: form.controls['password'].value,
      })
      .pipe(
        take(1),
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe((data: userAuthResponse) => {
        console.log(data);
        this.store.dispatch(addUserDetails({newData:data}))
         this.router.navigate(['/home']);
      });
  }
}
