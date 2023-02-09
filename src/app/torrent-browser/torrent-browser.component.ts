import { Component, OnInit } from '@angular/core';
import iNcoreTorrent from '../incoretorrents';

@Component({
  selector: 'app-torrent-browser',
  templateUrl: './torrent-browser.component.html',
  styleUrls: ['./torrent-browser.component.css']
})
export class TorrentBrowserComponent implements OnInit {
    torrents: iNcoreTorrent[] = [];

    ngOnInit() :void {
        fetch("http://localhost:5000/torrents")
        .then(res => res.json())
        .then(data => {
            data.forEach((element: any) => {
                this.torrents.push({
                    valid: element.valid,
                    title: element.title,
                    huTitle: element["hu-title"],
                    category: element.category,
                    imdbRating: element["imdb-rating"],
                    pubDate: element.pubDate,
                    size: element.size,
                    seed: element.seed,
                    coverImgUrl: element.coverImgUrl,
                    imdbUrl: element.imdbUrl,
                    imdbId: element.imdbId
                } as iNcoreTorrent)
            });
        });
    }
}
