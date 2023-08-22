import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  constructor(private fb: FormBuilder) {}

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  nameRegex = /^[a-zA-Z]+$/;

  spaceValidation(control: AbstractControl) {
    if (control.value && control.value.trim().length === 0) {
      return { noSpaces: true };
    } else {
      return null;
    }
  }

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !value.match(this.emailRegex)) {
      return { invalidEmail: true };
    }
    return null;
  };

  nameValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !value.match(this.nameRegex)) {
      return { invalidName: true };
    }
    return null;
  };

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value
    const confirmPassword = control.value;
    
    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  registerForm = (): FormGroup => {
    return this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordMatchValidator,
        ],
      ],
    });
  };

  loginForm = (): FormGroup => {
    return this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  };
}
