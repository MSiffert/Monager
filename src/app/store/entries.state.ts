import { Entry } from '../models/entry.model';

export enum ViewState {
    IsSilent = 1,
    IsFetching = 2,
    IsCreating = 3,
    IsUpdating = 4,
    IsDeleting = 5,
    IsFaulted = 6
}

export class EntriesState {
    public entries: Entry[];
    public viewState: ViewState;
}

export const initialEntriesState: EntriesState = {
    entries: [],
    viewState: ViewState.IsSilent
};
