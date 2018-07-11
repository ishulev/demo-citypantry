import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { OrdersModelLoadAction, OrdersModelLoadedAction } from './../store/actions';
import { OrderState } from './../store/models';
import { take, takeUntil, switchMap } from 'rxjs/operators';

@Injectable()
export class PreloadResolver implements Resolve<Observable<OrderState>>, OnDestroy {
  constructor(
    private _store: Store<OrderState>,
    private _actions: Actions
  ) {
  }

  private _destroyed = new Subject<boolean>();
  private _routeParam = null;

  resolve(route: ActivatedRouteSnapshot): Observable<OrderState> {
    console.log('RESOLVER!');
    this._routeParam = route.paramMap.get('number');
    this._store.dispatch(new OrdersModelLoadAction(this._routeParam));
    return this._actions.pipe(
      ofType(OrdersModelLoadedAction.TYPE),
      take(1),
      takeUntil(this._destroyed),
      switchMap((action: OrdersModelLoadedAction) => Observable.of(action.payload))
    );
  }

  ngOnDestroy() {
    this._destroyed.next(true);
  }
}
