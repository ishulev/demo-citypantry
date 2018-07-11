import { PreloadResolver } from './preload-resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListComponent } from '../components/list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    resolve: {
      data: PreloadResolver
    }
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
