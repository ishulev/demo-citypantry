import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import * as fromShared from './../../../shared/store/reducers';
import { slideInDownAnimation } from '../../../app.animations';
import { GetOrdersFromServerAction } from '../../store/actions';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [slideInDownAnimation]
})
export class OrderListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  constructor(
    private _router: Router,
    private _store: Store<fromShared.State>,
    private _currentRoute: ActivatedRoute
  ) {}

  private _pageSub: any;
  private _loadingSub: any;
  private _totalPagesSub: any;
  private _isInitialSub: any;
  public currentPage: number;
  public lastPage: number;
  public closestPages: number[];
  public isInitial = true;
  public isLoading: boolean;

  private navigateToPage(nextPage) {
    this._router.navigate(['/orders/page', '' + nextPage]);
    this._store.dispatch(new GetOrdersFromServerAction(nextPage));
  }
  private setClosestPages(currentPage) {
    if (currentPage < 4) {
      this.closestPages = [1, 2, 3, 4, 5];
    } else if (currentPage > this.lastPage - 3) {
      this.closestPages = [
        this.lastPage - 4,
        this.lastPage - 3,
        this.lastPage - 2,
        this.lastPage - 1,
        this.lastPage
      ];
    } else {
      this.closestPages = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      ];
    }
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

  public changeToPage(page) {
    if (page === this.currentPage) {
      return;
    }
    this.navigateToPage(page);
  }

  public changeRouteLastPage() {
    this.navigateToPage(this.lastPage);
  }

  public changeRouteFirstPage() {
    this.navigateToPage(1);
  }

  ngOnInit() {
    this._store.dispatch(
      new GetOrdersFromServerAction(
        this._currentRoute.snapshot.children[0].params['number']
      )
    );
    this._totalPagesSub = this._store
      .pipe(select(fromShared.getTotalPages))
      .subscribe(totalPages => (this.lastPage = totalPages));
    this._pageSub = this._store
      .pipe(select(fromShared.getPage))
      .subscribe(page => {
        this.setClosestPages(page);
        this.currentPage = page;
      });
    this._loadingSub = this._store
      .pipe(select(fromShared.isLoading))
      .subscribe(isLoading => (this.isLoading = isLoading));
    this._isInitialSub = this._store
      .pipe(select(fromShared.isInitial))
      .subscribe(isInitial => (this.isInitial = isInitial));
  }

  ngOnDestroy() {
    this._pageSub.unsubscribe();
    this._loadingSub.unsubscribe();
    this._isInitialSub.unsubscribe();
    this._totalPagesSub.unsubscribe();
  }
}
