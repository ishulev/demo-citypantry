import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import * as fromShared from './shared/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _store: Store<fromShared.State>) {}
  private _destroyActions = new Subject<boolean>();
  public routePath = '';

  ngOnInit() {
    this._store
      .pipe(takeUntil(this._destroyActions))
      .pipe(select(fromShared.getRouterPath))
      .subscribe(newPath => {
        if (newPath) {
          this.routePath = newPath;
        }
      });
  }

  ngOnDestroy() {
    this._destroyActions.next(true);
    this._destroyActions.complete();
  }
}
