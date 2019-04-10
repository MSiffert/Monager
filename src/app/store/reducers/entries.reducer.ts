import * as Action from '../actions/entries.actions';
import { initialEntriesState, EntriesState, ViewState } from 'src/app/store/entries.state';

export function entriesReducer(state: EntriesState = initialEntriesState, action: Action.Actions) {
  switch (action.type) {

    // GET
    case Action.FETCH:
      throwIfAnotherProcessIsInProgress(state);
      return { ...state, viewState: ViewState.IsFetching };

    case Action.FETCH_COMPLETED:
      return { ...state, entries: action.payload, viewState: ViewState.IsSilent };

    case Action.FETCH_FAILED:
      return { ...state, viewState: ViewState.IsFaulted };

    // CREATE
    case Action.CREATE:
      throwIfAnotherProcessIsInProgress(state);
      return { ...state, viewState: ViewState.IsCreating };

    case Action.CREATE_COMPLETED:
      return { ...state, viewState: ViewState.IsSilent, entries: [...state.entries, action.payload] };

    case Action.CREATE_FAILED:
      return { ...state, viewState: ViewState.IsFaulted };

    // UPDATE
    case Action.UPDATE:
      throwIfAnotherProcessIsInProgress(state);
      return { ...state, viewState: ViewState.IsUpdating };

    case Action.UPDATE_COMPLETED:
      return { ...state, viewState: ViewState.IsSilent };

    case Action.UPDATE_FAILED:
      return { ...state, viewState: ViewState.IsFaulted };

    // DELETE
    case Action.DELETE:
      throwIfAnotherProcessIsInProgress(state);
      return { ...state, viewState: ViewState.IsDeleting };

    case Action.DELETE_COMPLETED:
      return { ...state, viewState: ViewState.IsSilent };

    case Action.DELETE_FAILED:
      return { ...state, viewState: ViewState.IsFaulted };

    default:
      return state;
    }
}

export function throwIfAnotherProcessIsInProgress(state: EntriesState) {
  if (state.viewState !== ViewState.IsFaulted && state.viewState !== ViewState.IsSilent) {
    throw new Error('Cannot dispatch action while another process is in running.');
  }
}
