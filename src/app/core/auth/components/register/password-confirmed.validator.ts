import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmedValidator() {
  return (control: AbstractControl) => {
    const parent = control.parent;
    const password = parent?.get('password')?.value;
    const confirmPass = parent?.get('current_password')?.value;
    return password === confirmPass ? null : { notSame: true };
  }
}
