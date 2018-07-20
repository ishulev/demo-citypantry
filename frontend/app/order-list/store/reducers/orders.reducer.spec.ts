import { ordersReducer, ResponseFromServerState } from './orders.reducers';

import {
  ServerResponseReceivedAction,
  GetOrdersFromServerAction
} from './../actions/orders.actions';
import { ResponseFromServer } from '../models/orders';

describe('orders.reducers', () => {
  let serverResponseActionPayload: ResponseFromServer;

  let initialState: ResponseFromServerState;
  let newState: ResponseFromServerState;

  beforeEach(() => {
    serverResponseActionPayload = {
      count: 2,
      items: [
        {
          customer: 'Fixxie Tech',
          vendor: 'Stus Stews',
          commissionRate: 0.2,
          deliveredAt: '2018-02-07T11:26:44.000Z',
          delayMinutes: 7
        },
        {
          customer: 'Pixxie Tech',
          vendor: 'Pixxie Stews',
          commissionRate: 0.3,
          deliveredAt: '2018-02-07T11:26:44.000Z',
          delayMinutes: 5
        }
      ],
      page: 1,
      pageSize: 2,
      total: 10
    };

    initialState = {
      count: 0,
      items: [],
      page: 1,
      pageSize: 0,
      total: 0,
      loading: true,
      initialLoad: true
    };
  });

  afterEach(() => {});

  it('should return the new state when ServerResponseReceivedAction is used', () => {
    const action = new ServerResponseReceivedAction(
      serverResponseActionPayload
    );

    newState = Object.assign(
      { loading: false, initialLoad: false },
      serverResponseActionPayload
    );

    const result = ordersReducer(initialState, action);
    expect(result).toEqual(
      newState,
      'when the initial state is the default one'
    );
  });

  it('should return the new state when GetOrdersFromServerAction is used', () => {
    const action = new GetOrdersFromServerAction('3');

    const result = ordersReducer(initialState, action);
    newState = {
      ...initialState,
      loading: true
    };
    expect(result).toEqual(
      newState,
      'when the initial state already has some values'
    );
  });
});
