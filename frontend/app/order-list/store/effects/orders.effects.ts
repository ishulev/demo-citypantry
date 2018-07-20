import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ServerResponseFailedAction } from './../actions/orders.actions';
import { ResponseFromServer } from '../models/orders';
import {
  GetOrdersFromServerAction,
  ServerResponseReceivedAction
} from '../actions/orders.actions';

@Injectable()
export class OrdersEffects {
  @Effect()
  getData: Observable<Action> = this._actions.pipe(
    ofType(GetOrdersFromServerAction.TYPE),
    mergeMap((action: GetOrdersFromServerAction) =>
      this._http
        .get(`http://localhost:4300/orders?page=${action.payload}`)
        .pipe(
          // If successful, dispatch success action with result
          map(
            data => new ServerResponseReceivedAction(data as ResponseFromServer)
          ),
          // If request fails, dispatch failed action
          catchError(() => Observable.of(new ServerResponseFailedAction()))
        )
    )
  );

  constructor(private _http: HttpClient, private _actions: Actions) {}
}
