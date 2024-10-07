import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import { Message } from '../store/message/message.model';
import {
  addMessage,
  deleteMessage,
  messagesLoaded,
} from '../store/message/message.actions';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor(private store: Store) {
    console.log('WebsocketService initialized');
    this.socket = io('http://localhost:3000');

    this.socket.on('messages', (messages: Message[]) => {
      this.store.dispatch(messagesLoaded({ messages }));
    });

    this.socket.on('message', (message: Message) => {
      this.store.dispatch(addMessage({ message }));
    });

    this.socket.on('deleteMessage', (messageId: string) => {
      this.store.dispatch(deleteMessage({ messageId }));
    });
  }

  sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  deleteMessage(messageId: string) {
    this.socket.emit('deleteMessage', messageId);
  }
}
