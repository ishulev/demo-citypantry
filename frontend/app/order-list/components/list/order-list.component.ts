import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  constructor(private _activeRoute: ActivatedRoute, private _router: Router) {
  }

  private _paramsSub: any;
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
  }

  ngOnDestroy() {
    this._paramsSub.unsubscribe();
  }
}
