import { ResponseFromServer } from '../models';
import { ServerResponseReceivedAction, GetOrdersFromServerAction, ServerActionsUnion } from '../actions';

export interface ResponseFromServerState extends ResponseFromServer {
  loading: boolean;
}

const initialState: ResponseFromServerState = {
  count: 0,
  items: [],
  page: 1,
  pageSize: 0,
  total: 0,
  loading: true
};



export function reducer(state = initialState, action: ServerActionsUnion): ResponseFromServerState {
  switch (action.type) {
    case ServerResponseReceivedAction.TYPE: {
      const payload = action.payload;
      return Object.assign({}, {...state, loading: false}, payload);
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
export const getTotalPages = (state: ResponseFromServerState) => Math.ceil(state.total / state.count);
