import { ActionReducerMap } from '@ngrx/store';
import { entriesReducer } from './store/reducers/entries.reducer';
import { EntriesState } from './models/entries.state';

export interface AppState {
  readonly entriesState: EntriesState;
}

export const reducers: ActionReducerMap<AppState> = {
  entriesState: entriesReducer
};
