import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConcertService } from './services/concert.service';
import { ConcertListComponent } from './components/concert-list/concert-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ConcertListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ConcertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
