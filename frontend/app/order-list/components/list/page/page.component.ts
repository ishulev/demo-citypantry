import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { Order } from '../../../store/models/orders';
import * as fromShared from '../../../../shared/store/reducers/shared.reducer';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  constructor(private _store: Store<fromShared.State>) {}
  private _destroyActions = new Subject<boolean>();
  public orders: Order[];
  public indexes: string[];
  public isLoading: boolean;

  ngOnInit() {
    this._store
      .pipe(
        takeUntil(this._destroyActions),
        select(fromShared.getOrders)
      )
      .subscribe(orders => {
        this.orders = orders;
        if (orders[0]) {
          this.indexes = Object.keys(orders[0]);
        }
      });
    this._store
      .pipe(
        takeUntil(this._destroyActions),
        select(fromShared.isLoading)
      )
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
    this._destroyActions.next(true);
    this._destroyActions.complete();
  }
}
