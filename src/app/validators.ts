import { AbstractControl } from '@angular/forms';

export function forbiddenEmail(
  control: AbstractControl
): { [key: string]: any } | null {
  const currentDate = Date.now();
  if (control.value <= currentDate) {
    return null;
  } else {
    return { forbiddenEmail: true };
  }
}
