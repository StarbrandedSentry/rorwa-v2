import { AbstractControl, FormGroup } from '@angular/forms';

export function forbiddenDate(
  control: AbstractControl
): { [key: string]: any } | null {
  const currentDate = Date.now();
  if (control.value <= currentDate) {
    return null;
  } else {
    return { forbiddenDate: { value: control.value } };
  }
}

export function checkPasswords(group: FormGroup) {
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassword').value;

  return pass === confirmPass ? null : { notSame: true };
}

export function checkEmail(email: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value === email
      ? null
      : { checkEmail: { value: control.value } };
  };
}
