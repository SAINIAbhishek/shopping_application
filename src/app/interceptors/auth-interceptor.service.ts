import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import {take, exhaustMap, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../models/state';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this._store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }

}
