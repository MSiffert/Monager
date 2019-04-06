import { Entry } from './../../models/entry.model';
import * as Action from '../actions/entries.actions';

export function entriesReducer(state: Entry[] = [], action: Action.Actions) {
  switch (action.type) {

    // GET
    case Action.FETCH:
      return { ...state, isLoading: true };

    case Action.FETCH_COMPLETED:
      return { ...state, isLoading: true };

    case Action.FETCH_FAILED:
      return { ...state, isLoading: true };

    // CREATE
    case Action.CREATE:
      return { ...state, isLoading: true };

    case Action.CREATE_COMPLETED:
      return { ...state, isLoading: true };

    case Action.CREATE_FAILED:
      return { ...state, isLoading: true };

    // UPDATE
    case Action.UPDATE:
      return { ...state, isLoading: true };

    case Action.UPDATE_COMPLETED:
      return { ...state, isLoading: true };

    case Action.UPDATE_FAILED:
      return { ...state, isLoading: true };

    // DELETE
    case Action.DELETE:
      return { ...state, isLoading: true };

    case Action.DELETE_COMPLETED:
      return { ...state, isLoading: true };

    case Action.DELETE_FAILED:
      return { ...state, isLoading: true };

    default:
      return state;
    }
}
