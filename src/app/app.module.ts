import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient,  window.location.pathname + "assets/i18n/", ".json");
  }
  
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
  ],
  declarations: [AppComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    
    provideAnimationsAsync() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }