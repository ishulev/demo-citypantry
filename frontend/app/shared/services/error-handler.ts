import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../store/reducers/shared.reducer';
import { SystemErrorAction } from '../store/actions/shared.actions';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private _store: Store<State>) {}
  handleError(error) {
    // here we can send errors to an error monitor service,
    // or send them to our erros table in the DB
    console.log(error);
    this._store.dispatch(new SystemErrorAction());
  }
}
