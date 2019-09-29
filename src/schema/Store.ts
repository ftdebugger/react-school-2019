import { Action, Store as ReduxStore } from 'redux';
import { AppState } from 'store';

export type Store = ReduxStore<AppState, Action>;
