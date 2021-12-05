import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/homepage/homepage.component';
import { HomePageService } from './services/homepage.service';
import {HeaderNavComponent} from "./shared/header-nav/header-nav.component";
import {AboutComponent} from "./about/about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderNavComponent,
    HomePageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HomePageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
