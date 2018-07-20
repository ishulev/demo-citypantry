import { Actions } from '@ngrx/effects';
import { Component } from '@angular/core';

import { SystemErrorAction } from './shared/store/actions/shared.actions';
import { ServerResponseFailedAction } from './order-list/store/actions/orders.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public errorOccured: boolean;
  public errorContent: string;
  constructor(private _actions: Actions) {
    // Listen for errors and display error modal
    // Currently, the error modal is not really doing anything
    // just for display purposes
    this._actions.ofType(SystemErrorAction.TYPE).subscribe(() => {
      this.errorOccured = true;
      this.errorContent = 'System Error!';
    });
    this._actions.ofType(ServerResponseFailedAction.TYPE).subscribe(() => {
      this.errorOccured = true;
      this.errorContent = 'Network Error!';
    });
  }
}
