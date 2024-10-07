import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectMessages } from '../../store/message/message.selectors';
import { selectUsername } from '../../store/user/user.selectors';
import { debounceTime, delay, Observable, of, Subject, tap, withLatestFrom } from 'rxjs';
import { Message } from '../../store/message/message.model';
import { v4 as uuidv4 } from 'uuid';
import { addMessage, deleteMessage, sendMessage } from '../../store/message/message.actions';
import { Clipboard } from '@angular/cdk/clipboard';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages$: Observable<Message[]>;
  newMessage: string = '';
  messages: Array<string> = [];
  private sendSubject = new Subject<void>();

  username$: Observable<string | null>;

  isLoading = false;
  shouldSendOnEnter = false;

  constructor(
    private store: Store,
    private clipboard: Clipboard,
  ) {
    this.messages$ = this.store.select(selectMessages);
    this.username$ = this.store.select(selectUsername);
  }

  ngOnInit(): void {
    this.sendSubject.pipe(debounceTime(300)).subscribe(() => {
      this.processSendMessage();
    });
  }

  private processSendMessage() {
    if (this.newMessage.trim()) {
      this.isLoading = true;

      of(null)
        .pipe(
          delay(1000),
          withLatestFrom(this.username$),
          tap(([_, username]) => {
            if (username) {
              const message: Message = {
                id: uuidv4(),
                sender: username,
                content: this.newMessage.trim(),
                timestamp: new Date(),
                type: 'text',
              };
              this.store.dispatch(sendMessage({ message }));
              this.newMessage = '';
            }
          })
        )
        .subscribe(() => {
          this.isLoading = false;
        });
    }
  }

  sendMessage() {
    this.sendSubject.next();
  }

  sendImage() {
    this.username$.subscribe((username) => {
      if (username) {
        const imageBase64 =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC';
        const message: Message = {
          id: uuidv4(),
          sender: username,
          content: imageBase64,
          timestamp: new Date(),
          type: 'image',
        };
        this.store.dispatch(addMessage({ message }));
      }
    });
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
