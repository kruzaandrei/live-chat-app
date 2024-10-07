import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WebsocketService } from '../../services/websocket.service';
import { deleteMessage, sendMessage } from './message.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class MessageEffects {
  sendMessage$;
  deleteMessage$;

  constructor(
    private actions$: Actions,
    private websocketService: WebsocketService
  ) {
    this.deleteMessage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(deleteMessage),
        tap((action) => {
          this.websocketService.deleteMessage(action.messageId);
        })
      );
    }, { dispatch: false });

    this.sendMessage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(sendMessage),
        tap((action) => {
          // Send the message to the server
          this.websocketService.sendMessage(action.message);
        })
      );
    }, { dispatch: false });
  }
}
