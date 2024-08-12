import { FormControl} from '@angular/forms';
import { beforeTodayValidator } from './custom-validators';

describe('beforeTodayValidator', () => {
    it('should return beforeDate true if date is before today', () => {
      const control = new FormControl('2023-01-01');
      const result = beforeTodayValidator()(control);
      const resultStr = JSON.stringify(result);
      expect(resultStr).toBe(JSON.stringify({"beforeToday": true}));
    });
  
    it('should return null if date is today or future', () => {
      const today = new Date().toISOString().split('T')[0];
      const control = new FormControl(today);
      const result = beforeTodayValidator()(control);
      expect(result).toBeNull();
    });
});