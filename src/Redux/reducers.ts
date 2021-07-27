import { Session } from './store';
import TYPES from './types';

export type Store = {
  sessionReducer: ReduxAction<Session>
}


export type ReduxAction<T> = {
  type: string;
  value: T;
}

export function example(state = '', action: any) {
    if (action.type === TYPES.SET_EXAMPLE) return action.value;
    return state;
}

export function sessionReducer(state= null, action: ReduxAction<Session>): Session | null {
  if(action.type === TYPES.SET_SESSION) return action.value;
  return state;
}