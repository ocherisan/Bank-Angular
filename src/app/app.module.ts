import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RequestComponent } from './request/request.component';
import { PayComponent } from './pay/pay.component';
import { ActionComponent } from './action/action.component';
import { AnyComponent } from './pay/any/any.component';
import { OwnComponent } from './pay/own/own.component';
import { ChoiceComponent } from './pay/choice/choice.component';
import { CabinetComponent } from './cabinet/cabinet.component';

import { CabinetService } from './services/cabinet.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    FooterComponent,
    GalleryComponent,
    RequestComponent,
    PayComponent,
    ActionComponent,
    AnyComponent,
    OwnComponent,
    ChoiceComponent,
    CabinetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule
  ],
  providers: [CabinetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
