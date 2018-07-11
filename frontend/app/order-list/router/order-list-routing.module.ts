import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './../components/page/page.component';
import { PreloadResolver } from './preload-resolver';
import { OrderListComponent } from '../components/list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    children: [
      {
        path: 'page/:number',
        resolve: {
          data: PreloadResolver
        },
        component: PageComponent
      },
      {
        path: '',
        redirectTo: 'page/1',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PreloadResolver
  ]
})
export class OrderListRoutingModule { }
