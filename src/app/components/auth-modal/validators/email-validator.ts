import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (email: AbstractControl): { [key: string]: boolean } | null => {
    let emailRegExp: RegExp =
      /^([a-zA-Z0-9._%\+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
    let valid = !email.value || emailRegExp.test(email.value);
    return valid ? null : { account: true };
  };
}
