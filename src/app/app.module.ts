import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { localStorageSyncReducer, userDetailsReducer } from './shared/ngrx/ngrx.reducers';
import { InterceptorService } from './shared/services/interceptor/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ErrorPageComponent } from './components/error-page/error-page.component';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        userDetails: userDetailsReducer,
        // Add more state slices here
      },
      {
        // Provide the meta-reducers array
        metaReducers: [localStorageSyncReducer],
      }
    ),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
