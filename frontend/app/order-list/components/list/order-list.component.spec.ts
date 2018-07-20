import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { OrderListComponent } from './order-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PageComponent } from './page/page.component';
import { LoaderComponent } from './page/loader/loader.component';

fdescribe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  const routes: Routes = [
    {
      path: '',
      component: OrderListComponent
      // children: [
      //   {
      //     path: 'page/:number',
      //     // Sadly, can't use the resolver, because the parent component won't be rendered,
      //     // until the resolver is resolved, regardless that it is for the child component...
      //     // resolve: {
      //     //   PreloadResolver
      //     // },
      //     component: PageComponent
      //   },
      //   {
      //     path: '',
      //     redirectTo: 'page/1',
      //     pathMatch: 'prefix'
      //   }
      // ]
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        StoreModule.forRoot(() => {})
      ],
      declarations: [OrderListComponent, PageComponent, LoaderComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an order table', () => {
    const table = fixture.debugElement.query(By.css('table'));

    expect(table).toBeTruthy();
  });
});
