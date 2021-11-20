import {
  AbstractControl
} from '@angular/forms';

export function strengthPassword() {
  return (control: AbstractControl) => {
    const pass = control.value;
    const hasUpperCase = /[A-Z]+/.test(pass);
    const hasLowerCase = /[a-z]+/.test(pass);
    const hasNumeric = /[0-9]+/.test(pass);
    const passwordStrength = hasLowerCase && hasUpperCase && hasNumeric;
    return passwordStrength ? null  : { strength: true };
  }
};
