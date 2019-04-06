import { createFeatureSelector } from '@ngrx/store';
import { EntriesState } from '../../models/entries.state';

export const getEntriesState = createFeatureSelector<EntriesState>('entriesState');
