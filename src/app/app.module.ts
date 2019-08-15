import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ServicesModule} from './services/services.module';
import {MaterialModule} from './material.module';
import {ExhibitionsModule} from './components/exhibitions/exhibitions.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ExhibitFormComponent } from './components/collections/exhibit-form/exhibit-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExhibitFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    MaterialModule,
    ExhibitionsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
