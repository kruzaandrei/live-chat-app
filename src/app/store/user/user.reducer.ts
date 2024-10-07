import { createReducer, on } from '@ngrx/store';
import { setUsername } from './user.actions';

export interface UserState {
  username: string | null;
}

export const initialState: UserState = {
  username: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, username }))
);
