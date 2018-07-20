import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../store/reducers/shared.reducer';
import { SystemErrorAction } from '../store/actions/shared.actions';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private _store: Store<State>) {}
  handleError(error) {
    console.log(error);
    this._store.dispatch(new SystemErrorAction());
  }
}
