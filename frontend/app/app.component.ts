import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromShared from './shared/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _store: Store<fromShared.State>) {
  }
  private _dataSub: any;
  public routePath: string = '';

  ngOnInit() {
    this._dataSub = this._store.pipe(select(fromShared.getRouterPath)).subscribe(newPath => {
      if(newPath) {
        this.routePath = newPath;
      }
    });
  }

  ngOnDestroy() {
    this._dataSub.unsubscribe();
  }
}
