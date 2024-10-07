import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { Message } from '../../store/message/message.model';
import { selectMessages } from '../../store/message/message.selectors';
import { selectUsername } from '../../store/user/user.selectors';
import { deleteMessage } from '../../store/message/message.actions';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, MatIconModule, MatButtonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages$: Observable<Message[]>;
  username$: Observable<string | null>;

  constructor(
    private store: Store,
    private clipboard: Clipboard,
  ) {
    this.messages$ = this.store.select(selectMessages);
    this.username$ = this.store.select(selectUsername);
  }

  isMyMessage(message: Message): boolean {
    let isMine = false;
    this.username$.subscribe((username) => {
      isMine = message.sender === username;
    });
    return isMine;
  }

  copyMessage(message: Message) {
    if (message.type === 'text') {
      this.clipboard.copy(message.content);
    }
  }

  deleteMessage(messageId: string) {
    this.store.dispatch(deleteMessage({ messageId }));
  }
}
