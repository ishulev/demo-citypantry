import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Order } from './../../../store/models';
import * as fromShared from './../../../../shared/store/reducers';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  constructor(private _store: Store<fromShared.State>) {
  }
  private _dataSub: any;
  private _loadingSub: any;
  public orders: Order[];
  public indexes: string[];
  public isLoading: boolean;

  ngOnInit() {
    this._dataSub = this._store.pipe(select(fromShared.getOrders)).subscribe(orders => {
      this.orders = orders;
      if(orders[0]) {
        this.indexes = Object.keys(orders[0]);
      }
    });
    this._loadingSub = this._store.pipe(select(fromShared.isLoading)).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this._dataSub.unsubscribe();
    this._loadingSub.unsubscribe();
  }
}
