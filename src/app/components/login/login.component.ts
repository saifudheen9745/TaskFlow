import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, take } from 'rxjs';
import { userAuthResponse } from 'src/app/config/config.types';
import { environment } from 'src/app/environment/environment';
import { addUserDetails } from 'src/app/shared/ngrx/ngrx.actions';
import { FormServiceService } from 'src/app/shared/services/formService/form-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private form: FormServiceService,
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.form.loginForm();
  }

  formSubmit(form: FormGroup) {
    if (form.valid) {
      this.http
        .post<userAuthResponse>(`${environment.baseUrl}/login`, form.value)
        .pipe(
          take(1),
          catchError((err: any) => {
            throw err;
          })
        )
        .subscribe((data: userAuthResponse) => {
          this.store.dispatch(addUserDetails({ newData: data }));
          this.router.navigate(['/home'])
        });
    }
  }
}
