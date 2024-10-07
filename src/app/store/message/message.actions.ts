import { createAction, props } from '@ngrx/store';
import { Message } from './message.model';

export const loadMessages = createAction('[Message] Load Messages');

export const addMessage = createAction(
  '[Message] Add Message',
  props<{ message: Message }>()
);

export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{ messageId: string }>()
);

export const messagesLoaded = createAction(
  '[Message] Messages Loaded',
  props<{ messages: Message[] }>()
);

export const sendMessage = createAction(
  '[Message] Send Message',
  props<{ message: Message }>()
);
