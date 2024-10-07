import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { debounceTime, delay, Observable, of, Subject, tap, withLatestFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../store/message/message.model';
import { addMessage, sendMessage } from '../../store/message/message.actions';
import { selectUsername } from '../../store/user/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  newMessage: string = '';
  isLoading = false;
  private sendSubject = new Subject<void>();
  username$: Observable<string | null>;

  constructor(private store: Store) {
    this.username$ = this.store.select(selectUsername);

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
}
