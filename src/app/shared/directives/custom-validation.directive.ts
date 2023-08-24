import { Directive, Input, OnInit } from '@angular/core';
import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
@Directive({
  selector: '[validatePattern]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PatternValidationDirective,
      multi: true,
    },
  ],
})
export class PatternValidationDirective implements Validator{
  @Input() pattern: RegExp;
  constructor() {}
  
  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value || this.pattern.test(control.value)) {
      return null;
    } else {
      return { patterError: true };
    }
  }
}
