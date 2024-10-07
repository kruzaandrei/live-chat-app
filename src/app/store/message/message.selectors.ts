import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from './message.reducer';

export const selectMessageState = createFeatureSelector<MessageState>('messages');

export const selectMessages = createSelector(
  selectMessageState,
  (state: MessageState) => state.messages
);
