import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { take, takeUntil, switchMap } from 'rxjs/operators';

import { GetOrdersFromServerAction, ServerResponseReceivedAction } from '../store/actions';
import { ResponseFromServer } from '../store/models';

@Injectable()
export class PreloadResolver implements Resolve<Observable<Boolean>>, OnDestroy {
  constructor(
    private _store: Store<ResponseFromServer>,
    private _actions: Actions
  ) {
  }

  private _destroyed = new Subject<boolean>();
  private _routeParam = null;

  resolve(route: ActivatedRouteSnapshot): Observable<Boolean> {
    console.log('RESOLVER!');
    this._routeParam = route.paramMap.get('number');
    this._store.dispatch(new GetOrdersFromServerAction(this._routeParam));
    return this._actions.pipe(
      ofType(ServerResponseReceivedAction.TYPE),
      take(1),
      takeUntil(this._destroyed),
      switchMap(() => Observable.of(true)),
    );
  }

  ngOnDestroy() {
    this._destroyed.next(true);
  }
}
