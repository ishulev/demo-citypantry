import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { OrdersEffects } from './store/effects/orders.effects';
import { OrderListRoutingModule } from './router/order-list-routing.module';
import { OrderListComponent } from './components/list/order-list.component';
import { PageComponent } from './components/list/page/page.component';
import { LoaderComponent } from './components/list/page/loader/loader.component';

@NgModule({
  declarations: [
    OrderListComponent,
    PageComponent,
    HrefPreventDefaultDirective,
    LoaderComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    OrderListRoutingModule,
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class OrderListModule {}
