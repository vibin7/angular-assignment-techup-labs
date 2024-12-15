import {  NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    LayoutComponent,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSelectModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot() // Import ModalModule and configure it
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
