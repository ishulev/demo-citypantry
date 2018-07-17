import { ResponseFromServer } from './index';
export class Order {
  customer: string;
  vendor: string;
  commissionRate: number;
  delayMinutes: number;
  deliveredAt: string;

  constructor() {
    this.customer = '';
    this.vendor = '';
    this.commissionRate = 0;
    this.delayMinutes = 0;
    this.deliveredAt = '';
  }
}

export interface ResponseFromServer {
  count: number;
  items: Order[];
  page: number;
  pageSize: number;
  total: number;
}
