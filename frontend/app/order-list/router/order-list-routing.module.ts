import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from '../components/list/page/page.component';
import { PreloadResolver } from './preload-resolver';
import { OrderListComponent } from '../components/list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    children: [
      {
        path: 'page/:number',
        // Sadly, can't use the resolver, because the parent component won't be rendered,
        // until the resolver is resolved, regardless that it is for the child component...
        // resolve: {
        //   PreloadResolver
        // },
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
  providers: [PreloadResolver]
})
export class OrderListRoutingModule {}
