import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromShared from './../../../shared/store/reducers';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  constructor(private _router: Router, private _store: Store<fromShared.State>) {
  }

  private _pageSub: any;
  private _loadingSub: any;
  private _totalPagesSub: any;
  public currentPage: number;
  public lastPage: number;

  private navigateToPage(nextPage) {
    this._router.navigate(['/orders/page', '' + nextPage]);
  }

  public changeRouteMinus() {
    if (this.currentPage === 1) {
      return;
    }
    this.navigateToPage(this.currentPage - 1);
  }

  public changeRoutePlus() {
    if (this.currentPage === this.lastPage) {
      return;
    }
    this.navigateToPage(this.currentPage + 1);
  }

  public changeRouteLastPage() {
    this.navigateToPage(this.lastPage);
  }

  public changeRouteFirstPage() {
    this.navigateToPage(1);
  }

  ngOnInit() {
    this._pageSub = this._store.pipe(select(fromShared.getPage)).subscribe(page => this.currentPage = page);
    this._loadingSub = this._store.pipe(select(fromShared.isLoading)).subscribe(isLoading => console.log(isLoading));
    this._totalPagesSub = this._store.pipe(select(fromShared.getTotalPages)).subscribe(totalPages => this.lastPage = totalPages);
  }

  ngOnDestroy() {
    this._pageSub.unsubscribe();
    this._loadingSub.unsubscribe();
    this._totalPagesSub.unsubscribe();
  }
}
