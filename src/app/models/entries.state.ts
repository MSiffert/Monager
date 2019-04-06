import { Entry } from './entry.model';

export class EntriesState {
    public entries: Entry[];
    public isLoading: boolean;
    public isLoaded: boolean;
}

export const initialEntriesState: EntriesState = {
    entries: [],
    isLoading: false,
    isLoaded: false
};
