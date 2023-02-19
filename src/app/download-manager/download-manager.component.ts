import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download-manager',
  templateUrl: './download-manager.component.html',
  styleUrls: ['./download-manager.component.css']
})
export class DownloadManagerComponent implements OnInit{

    constructor(private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            if(params.torrentId){
                console.log("Letoltes keres kuldese....", params.torrentId);
            }
        })
        
    }
}
