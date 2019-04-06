import { ActionReducerMap } from '@ngrx/store';
import { Entry } from './models/entry.model';
import { entriesReducer } from './store/reducers/entries.reducer';

export interface AppState {
  readonly entries: Entry[];
}

export const reducers: ActionReducerMap<AppState> = {
  entries: entriesReducer
};
