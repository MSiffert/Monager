import { Action } from '@ngrx/store';
import { Entry } from '../../models/entry.model';

export const FETCH               = '[Entries] Fetch';
export const FETCH_COMPLETED     = '[Entries] Fetch Completed';
export const FETCH_FAILED        = '[Entries] Fetch Failed';

export const CREATE              = '[Entries] Create';
export const CREATE_COMPLETED    = '[Entries] Create Completed';
export const CREATE_FAILED       = '[Entries] Create Failed';

export const UPDATE              = '[Entries] Update';
export const UPDATE_COMPLETED    = '[Entries] Update Completed';
export const UPDATE_FAILED       = '[Entries] Update Failed';

export const DELETE              = '[Entries] Delete';
export const DELETE_COMPLETED    = '[Entries] Delete Completed';
export const DELETE_FAILED       = '[Entries] Delete Failed';

// FETCH

export class Fetch implements Action {
  public readonly type = FETCH;
  constructor() { }
}

export class FetchCompleted implements Action {
  public readonly type = FETCH_COMPLETED;
  constructor(public payload: Entry[]) {}
}

export class FetchFailed implements Action {
  public readonly type = FETCH_FAILED;
  constructor(public payload: string) {}
}

// CREATE

export class Create implements Action {
  public readonly type = CREATE;
  constructor(public payload: Entry) { }
}

export class CreateCompleted implements Action {
  public readonly type = CREATE_COMPLETED;
  constructor(public payload: Entry) {}
}

export class CreateFailed implements Action {
  public readonly type = CREATE_FAILED;
  constructor(public payload: string) {}
}

// UPDATE

export class Update implements Action {
  public readonly type = UPDATE;
  constructor(public payload: Entry) { }
}

export class UpdateCompleted implements Action {
  public readonly type = UPDATE_COMPLETED;
  constructor(public payload: Entry) { }
}

export class UpdateFailed implements Action {
  public readonly type = UPDATE_FAILED;
  constructor(public payload: string) {}
}

// DELETE

export class Delete implements Action {
  public readonly type = DELETE;
  constructor(public payload: number) { }
}

export class DeleteCompleted implements Action {
  public readonly type = DELETE_COMPLETED;
  constructor(public payload: number) {}
}

export class DeleteFailed implements Action {
  public readonly type = DELETE_FAILED;
  constructor(public payload: string) {}
}

export type Actions = Fetch | FetchCompleted | FetchFailed |
                      Create | CreateCompleted | CreateFailed |
                      Update | UpdateCompleted | UpdateFailed |
                      Delete | DeleteCompleted | DeleteFailed;
