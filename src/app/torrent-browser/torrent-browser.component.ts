import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-browser',
  templateUrl: './torrent-browser.component.html',
  styleUrls: ['./torrent-browser.component.css']
})
export class TorrentBrowserComponent implements OnInit {
    torrents = [];

    ngOnInit() :void {
        fetch("http://localhost:5000/torrents")
        .then(res => res.json())
        .then(data => {
            this.torrents = data;
        })
    }
}
