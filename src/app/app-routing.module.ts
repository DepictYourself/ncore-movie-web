import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { TorrentBrowserComponent } from './torrent-browser/torrent-browser.component';

const routes: Routes = [
    {path: "", component: TorrentBrowserComponent},
    {path: "torrents", component: TorrentBrowserComponent},
    {path: "movie", component: MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
