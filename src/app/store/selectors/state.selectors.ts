import { createFeatureSelector } from '@ngrx/store';
import { EntriesState } from '../entries.state';

export const getEntriesState = createFeatureSelector<EntriesState>('entriesState');
