import { Action } from '@ngrx/store';

import { OrderState } from './../models/index';

export class OrdersModelLoadAction implements Action {
  public static readonly TYPE = 'LOAD_DATA';
  public readonly type = OrdersModelLoadAction.TYPE;
}

export class OrdersModelLoadedAction implements Action {
  public static readonly TYPE = 'LOADED_DATA';
  public readonly type = OrdersModelLoadedAction.TYPE;

  constructor(public readonly payload: OrderState) {}
}
