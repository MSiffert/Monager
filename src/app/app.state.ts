import { ActionReducerMap } from '@ngrx/store';
import { entriesReducer } from './store/reducers/entries.reducer';
import { EntriesState } from './store/entries.state';

export interface AppState {
  readonly entriesState: EntriesState;
}

export const reducers: ActionReducerMap<AppState> = {
  entriesState: entriesReducer
};
