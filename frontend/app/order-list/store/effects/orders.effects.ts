import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OrdersModelLoadAction, OrdersModelLoadedAction } from '../actions';
import { OrderState } from '../models';

@Injectable()
export class OrdersEffects {
  @Effect()
  getData: Observable<Action> = this._actions.pipe(
    ofType(OrdersModelLoadAction.TYPE),
    mergeMap(action =>
      this._http.get('http://localhost:4300/orders').pipe(
        // If successful, dispatch success action with result
        map(data => (new OrdersModelLoadedAction(data as OrderState))),
        // If request fails, dispatch failed action
        catchError(() => Observable.of({ type: 'ORDERS_LOAD_FAIL' }))
      )
    )
  );

  constructor(private _http: HttpClient, private _actions: Actions) {}
}
