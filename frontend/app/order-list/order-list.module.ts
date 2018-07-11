import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { OrdersEffects } from './store/effects/orders.effects';
import { OrderListRoutingModule } from './router/order-list-routing.module';
import { OrderListComponent } from './components/list/order-list.component';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [OrderListComponent, PageComponent, PageComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    OrderListRoutingModule,
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class OrderListModule { }
