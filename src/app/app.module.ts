// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-transfer-http';

// libs
import { PrebootModule } from 'preboot';

// components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    HttpClientModule,
    RouterModule,
    AppRoutes,
    BrowserAnimationsModule,
    TransferHttpModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [TransferHttpService]
})
export class AppModule {
}
