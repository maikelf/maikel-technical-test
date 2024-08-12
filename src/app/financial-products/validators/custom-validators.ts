import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function beforeTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value).setHours(24, 0, 0, 0);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      if (selectedDate < currentDate) {
        return { 'beforeToday': true };
      }
      return null;
    };
}