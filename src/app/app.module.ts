import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage.component';
import { HomePageService } from './services/homepage.service';
import {HeaderNavComponent} from "./shared/header-nav/header-nav.component";
import {AboutComponent} from "./about/about/about.component";
import {ApiServiceService} from "./api/api-service.service";
import { StringFormComponent } from './homepage/forms/string-form/string-form.component';
import { WholenumFormComponent } from './homepage/forms/wholenum-form/wholenum-form.component';
import { DecimalFormComponent } from './homepage/forms/decimal-form/decimal-form.component';
import { DatetimeFormComponent } from './homepage/forms/datetime-form/datetime-form.component';
import { BooleanFormComponent } from './homepage/forms/boolean-form/boolean-form.component';
import { FieldListComponent } from './homepage/field-list/field-list.component';
import { FieldListItemComponent } from './homepage/field-list-item/field-list-item.component';
import { RecordInfoComponent } from './homepage/record-info/record-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderNavComponent,
    HomePageComponent,
    StringFormComponent,
    WholenumFormComponent,
    DecimalFormComponent,
    DatetimeFormComponent,
    BooleanFormComponent,
    FieldListComponent,
    FieldListItemComponent,
    RecordInfoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HomePageService,ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
