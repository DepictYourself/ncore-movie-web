import { Component, Input, OnInit } from '@angular/core';
import iNcoreTorrent from '../incoretorrent';

@Component({
  selector: 'app-torrent-item',
  templateUrl: './torrent-item.component.html',
  styleUrls: ['./torrent-item.component.css']
})
export class TorrentItemComponent implements OnInit{
    @Input()
    torrent!: iNcoreTorrent;

    ngOnInit(): void{
        
    }
    
}
