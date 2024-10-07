import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { messageReducer } from './store/message/message.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './store/message/message.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ user: userReducer, messages: messageReducer }),
    importProvidersFrom(
      EffectsModule.forRoot([MessageEffects]))
  ]
};
