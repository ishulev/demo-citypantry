import { Action } from '@ngrx/store';

import { ResponseFromServer } from '../models';
import { Order } from '../models';

export class OrdersReceivedAction implements Action {
  public static readonly TYPE = 'ORDERS_LOADED';
  public readonly type = OrdersReceivedAction.TYPE;

  constructor(public readonly payload: Order[]) {}
}

export class GetOrdersFromServerAction implements Action {
  public static readonly TYPE = 'GET_DATA';
  public readonly type = GetOrdersFromServerAction.TYPE;

  constructor(public readonly payload: String) {}
}

export class ServerResponseReceivedAction implements Action {
  public static readonly TYPE = 'LOADED_DATA';
  public readonly type = ServerResponseReceivedAction.TYPE;

  constructor(public readonly payload: ResponseFromServer) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ServerActionsUnion =
  | GetOrdersFromServerAction
  | ServerResponseReceivedAction;
