import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public orders: Order[];
  public indexes: string[];

  ngOnInit() {
    this._dataSub = this._store.pipe(select(fromShared.getOrders)).subscribe(orders => {
      console.log(orders);
      this.orders = orders;
    });
    this.indexes = Object.keys(this.orders[0]);
  }

  ngOnDestroy() {
    this._dataSub.unsubscribe();
  }
}
