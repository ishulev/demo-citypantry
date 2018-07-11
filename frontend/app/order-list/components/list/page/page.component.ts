import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  constructor(private _route: ActivatedRoute) {
  }
  private _dataSub: any; 

  ngOnInit() {
    this._dataSub = this._route.data.subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this._dataSub.unsubscribe();
  }
}
