import { ResponseFromServer, Order } from '../models/orders';
import {
  ServerResponseReceivedAction,
  GetOrdersFromServerAction,
  ServerActionsUnion
} from '../actions/orders.actions';

export interface ResponseFromServerState extends ResponseFromServer {
  loading: boolean;
  initialLoad: boolean;
}

const initialState: ResponseFromServerState = {
  count: 0,
  items: [],
  page: 1,
  pageSize: 0,
  total: 0,
  loading: true,
  initialLoad: true
};

const demoOrder = new Order();

export function ordersReducer(
  state = initialState,
  action: ServerActionsUnion
): ResponseFromServerState {
  switch (action.type) {
    case ServerResponseReceivedAction.TYPE: {
      const rawPayload = action.payload;
      const filteredPayload = {
        ...rawPayload,
        items: rawPayload.items.map(item => {
          const newItem = {};
          Object.keys(demoOrder).forEach(key => (newItem[key] = item[key]));
          return newItem;
        })
      };
      return Object.assign(
        {},
        { ...state, loading: false, initialLoad: false },
        filteredPayload
      );
    }

    case GetOrdersFromServerAction.TYPE: {
      return {
        ...state,
        loading: true
      };
    }

    default: {
      return state;
    }
  }
}

export const getOrders = (state: ResponseFromServerState) => state.items;
export const getLoading = (state: ResponseFromServerState) => state.loading;
export const getCurrentPage = (state: ResponseFromServerState) => state.page;
export const getIsInitial = (state: ResponseFromServerState) =>
  state.initialLoad;
export const getTotalPages = (state: ResponseFromServerState) =>
  Math.ceil(state.total / state.pageSize);
