import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const authorId = environment.authorId;
  const reqWithAuthorHeader = req.clone({
    setHeaders: { authorId }
  });
  return next(reqWithAuthorHeader);
};
