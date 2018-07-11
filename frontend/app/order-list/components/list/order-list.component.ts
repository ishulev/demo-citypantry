import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  constructor(private _activeRoute: ActivatedRoute, private _router: Router) {
  }

  public currentPage: String = '0';

  public changeRouteMinus() {
    this._router.navigate(['/page', { number: '5'}]);
  }

  ngOnInit() {
    this._activeRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params.get('number'));
        return this.currentPage = params.get('number');
      }),
    );
  }

}
