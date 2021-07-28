import { Session } from './store';
import TYPES from './types';

export const setSession = (value: Session) => ({ type: TYPES.SET_SESSION, value });

export const setInGame = (value: boolean) => ({ type: TYPES.SET_INGAME, value });