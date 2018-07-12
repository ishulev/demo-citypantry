import { ResponseFromServer } from './index';
export interface Order {
  customer: string;
  vendor: string;
  commissionRate: number;
  total: number;
  delayMinutes: number;
  deliveredAt: string;
}

export interface ResponseFromServer {
  count: number;
  items: Order[];
  page: number;
  pageSize: number;
  total: number;
}
