import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './components/list/order-list.component';

@NgModule({
  declarations: [OrderListComponent],
  imports: [CommonModule, OrderListRoutingModule]
})
export class OrderListModule { }
