import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { TorrentBrowserComponent } from './torrent-browser/torrent-browser.component';
import { TorrentItemComponent } from './torrent-item/torrent-item.component';
import { MovieComponent } from './movie/movie.component';
import { DownloadManagerComponent } from './download-manager/download-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavItemComponent,
    TorrentBrowserComponent,
    TorrentItemComponent,
    MovieComponent,
    DownloadManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
