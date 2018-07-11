import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(private _route: ActivatedRoute) {
    console.log(this._route.snapshot.data);
  }

  ngOnInit() {
  }

}
