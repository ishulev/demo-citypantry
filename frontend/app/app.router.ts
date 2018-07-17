import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'orders',
    loadChildren: 'app/order-list/order-list.module#OrderListModule'
  },
  {
    path: '',
    loadChildren: 'app/homepage/homepage.module#HomepageModule'
  },
  {
    path: '**',
    loadChildren: 'app/homepage/homepage.module#HomepageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
