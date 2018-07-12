import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromShared from './../../../shared/store/reducers';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _store: Store<fromShared.State>) {
  }

  private _paramsSub: any;
  private _loadingSub: any;
  public currentPage: number = null;

  private navigateToPage(nextPage) {
    this._router.navigate(['/orders/page', '' + nextPage]);
  }

  public changeRouteMinus() {
    this.navigateToPage(this.currentPage - 1);
  }

  public changeRoutePlus() {
    this.navigateToPage(this.currentPage + 1);
  }

  ngOnInit() {
    this._paramsSub = this._activeRoute.children[0].paramMap.subscribe(params => this.currentPage = +params.get('number'));
    this._loadingSub = this._store.pipe(select(fromShared.isLoading)).subscribe(isLoading => console.log(isLoading));
  }

  ngOnDestroy() {
    this._paramsSub.unsubscribe();
    this._loadingSub.unsubscribe();
  }
}
