import { Session } from './store';
import TYPES from './types';

export type Store = {
  sessionReducer: Session;
  inGame: ReduxAction<boolean>;
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
  if(action.type === TYPES.LOGOUT) return action.value;
  return state;
}

export function inGame(state=false, action: ReduxAction<boolean>): boolean | null {
  if(action.type === TYPES.SET_INGAME) return action.value;
  return state;
}