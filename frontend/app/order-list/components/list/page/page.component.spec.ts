import { StoreModule, Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromShared from '../../../../shared/store/reducers/shared.reducer';
import {
  reducer,
  ResponseFromServerState
} from '../../../store/reducers/orders.reducers';
import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let store: Store<fromShared.State>;
  let stateMock: ResponseFromServerState = {
    count: 0,
    items: [],
    page: 1,
    pageSize: 0,
    total: 0,
    loading: true,
    initialLoad: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('server', reducer)
      ],
      declarations: [PageComponent, LoaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
