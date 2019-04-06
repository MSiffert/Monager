import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as Action from '../actions/entries.actions';
import { EntriesSerivce } from './../../services/entries.service';
import { from, of } from 'rxjs';

@Injectable()
export class FetchEffect {
    constructor(private entriesService: EntriesSerivce, private actions$: Actions) { }

    @Effect()
    load = this.actions$.pipe(ofType(Action.FETCH),
        switchMap(state => {
            return from(this.entriesService.getEntries().pipe(
                map(apiResult => new Action.FetchCompleted(apiResult)),
                catchError(error => of(new Action.FetchFailed(error)))
            ));
        })
    );
}
