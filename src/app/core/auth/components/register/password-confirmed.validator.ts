import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const confirmedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pass = control?.get('password')?.value;
  const confirmPass = control?.get('current_password')?.value;
  return pass === confirmPass ? null : { notSame: true };
};
