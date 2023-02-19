import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadManagerComponent } from './download-manager/download-manager.component';
import { MovieComponent } from './movie/movie.component';
import { TorrentBrowserComponent } from './torrent-browser/torrent-browser.component';

const routes: Routes = [
    {path: "", component: TorrentBrowserComponent},
    {path: "torrents", component: TorrentBrowserComponent},
    {path: "movie/:imdbId", component: MovieComponent},
    {path: "downloads", component: DownloadManagerComponent},
    {path: "downloads/:torrentId", component: DownloadManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
