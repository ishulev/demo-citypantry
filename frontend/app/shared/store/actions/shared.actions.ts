import { Action } from '@ngrx/store';

export class SystemErrorAction implements Action {
  public static readonly TYPE = 'SYSTEM_ERROR';
  public readonly type = SystemErrorAction.TYPE;
}
