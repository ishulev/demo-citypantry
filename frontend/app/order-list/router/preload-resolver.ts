import { Injectable, OnDestroy } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Store, Action } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { OrdersModelLoadAction, OrdersModelLoadedAction } from './../store/actions';
import { OrderState } from './../store/models';
import { take, takeUntil, switchMap } from 'rxjs/operators';

@Injectable()
export class PreloadResolver implements Resolve<Observable<Boolean>>, OnDestroy {
  constructor(
    private _store: Store<OrderState>,
    private _actions: Actions
  ) {
    this._store.dispatch(new OrdersModelLoadAction);
  }

  private _destroyed = new Subject<boolean>();

  resolve(): Observable<Boolean> {
    console.log('render!');
    return this._actions.pipe(
      ofType(OrdersModelLoadedAction.TYPE),
      take(1),
      takeUntil(this._destroyed),
      switchMap(() => Observable.of(true))
    );
  }

  ngOnDestroy() {
    this._destroyed.next(true);
  }
}
