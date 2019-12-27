import { AbstractControl } from '@angular/forms';

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
