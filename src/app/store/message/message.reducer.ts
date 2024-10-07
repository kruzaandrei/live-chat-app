import { createReducer, on } from '@ngrx/store';
import { addMessage, deleteMessage, messagesLoaded } from './message.actions';
import { Message } from './message.model';

export interface MessageState {
  messages: Message[];
}

export const initialState: MessageState = {
  messages: [],
};

export const messageReducer = createReducer(
  initialState,
  on(addMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(deleteMessage, (state, { messageId }) => ({
    ...state,
    messages: state.messages.filter((msg) => msg.id !== messageId),
  })),
  on(messagesLoaded, (state, { messages }) => ({
    ...state,
    messages: [...messages],
  }))
);
