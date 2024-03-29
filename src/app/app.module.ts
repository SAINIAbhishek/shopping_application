import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { LoadingSpinnerModule } from './modules/loading-spinner/loading-spinner.module';
import { AuthModule } from './modules/auth/auth.module';
import { HeaderModule } from './modules/header/header.module';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {AuthEffects} from './modules/auth/store/auth.effects';
import {EffectsModule} from '@ngrx/effects';
import {AlertComponent} from './modules/alert/alert.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ToastrModule} from 'ngx-toastr';
import {RecipeEffects} from './modules/recipes/store/recipe.effects';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingSpinnerModule,
    AuthModule,
    HeaderModule,
    ToastrModule.forRoot({
      progressAnimation: 'increasing',
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    AlertComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
