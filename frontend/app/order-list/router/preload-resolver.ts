import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { Order } from '../store/models';
import { GetOrdersFromServerAction, ServerResponseReceivedAction } from '../store/actions';
import { take, takeUntil, switchMap } from 'rxjs/operators';
import { ResponseFromServer } from '../store/models';

@Injectable()
export class PreloadResolver implements Resolve<Observable<ResponseFromServer>>, OnDestroy {
  constructor(
    private _store: Store<ResponseFromServer>,
    private _actions: Actions
  ) {
  }

  private _destroyed = new Subject<boolean>();
  private _routeParam = null;

  resolve(route: ActivatedRouteSnapshot): Observable<ResponseFromServer> {
    console.log('RESOLVER!');
    this._routeParam = route.paramMap.get('number');
    this._store.dispatch(new GetOrdersFromServerAction(this._routeParam));
    return this._actions.pipe(
      ofType(ServerResponseReceivedAction.TYPE),
      take(1),
      takeUntil(this._destroyed),
      switchMap((action: ServerResponseReceivedAction) => Observable.of(action.payload)),
    );
  }

  ngOnDestroy() {
    this._destroyed.next(true);
  }
}
