import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {  provideHttpClient } from '@angular/common/http';

import { LucideAngularModule,CircleCheckBig,ClipboardList, BookmarkCheck,Heart, LogOut} from 'lucide-angular';






@NgModule({
    declarations: [AppComponent],
imports: [
BrowserModule,
IonicModule.forRoot(),
AppRoutingModule,
LucideAngularModule.pick({ CircleCheckBig,ClipboardList, BookmarkCheck,Heart,LogOut })

],
providers: [
    provideHttpClient(), // Agregamos el módulo HTTP
],
bootstrap: [AppComponent]
})
export class AppModule { }




