import { type ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from './firebase.config';
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { getPerformance, providePerformance } from '@angular/fire/performance';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() =>
        initializeAuth(getApp(), {
          persistence: browserLocalPersistence,
          popupRedirectResolver:
            typeof document !== 'undefined'
              ? browserPopupRedirectResolver
              : undefined,
        }),
      ),
      providePerformance(() => getPerformance()),
      provideRemoteConfig(() => ({
        ...getRemoteConfig(),
        lastFetchStatus: 'no-fetch-yet',
        fetchTimeMillis: -1,
        settings: {
          minimumFetchIntervalMillis: 0,
          fetchTimeoutMillis: 60_000,
        },
      })),
    ]),
  ],
};
