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
export class OrderListComponent implements OnInit {
  constructor(private _activeRoute: ActivatedRoute, private _router: Router) {
  }

  private _paramsSubs= new Observable<ParamMap>();
  public currentPage: number = null;

  private navigateToPage() {
    this._router.navigate(['/orders/page', '' + this.currentPage]);
  }

  public changeRouteMinus() {
    this.currentPage--;
    this.navigateToPage();
  }

  public changeRoutePlus() {
    this.currentPage++;
    this.navigateToPage();
  }

  ngOnInit() {
    this.currentPage = this._activeRoute.children[0].snapshot.params.number;
    this._paramsSubs = this._activeRoute.children[0].paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.currentPage = +params.get('number');
        console.log(this.currentPage);
        return Observable.of(params);
      })
    )
  }

}
