import { Component, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

import iNcoreTorrent from '../incoretorrents';

@Component({
  selector: 'app-torrent-browser',
  templateUrl: './torrent-browser.component.html',
  styleUrls: ['./torrent-browser.component.css']
})
export class TorrentBrowserComponent implements OnInit {
    torrents: iNcoreTorrent[] = [];
    modal: Modal = new Modal();

    ngOnInit() :void {
        this.initFilterModal();

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
                    imdbId: element.imdbId,
                    tags: element.tags
                } as iNcoreTorrent)
            });
        });
    }



    initFilterModal(): void {
        const modalEl: HTMLElement | null = document.querySelector("#filterModal");

        const modalOptins: ModalOptions = {
            placement: "center",
            backdrop: "dynamic",
            backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
            closable: true,
            onHide: () => {
                console.log("hiding modal");
            },
            onShow: () => {
                console.log("showing modal");
            },
            onToggle: () => {
                console.log("modal toggled");
            }
        }

        this.modal = new Modal(modalEl, modalOptins);
    }

    toggleModal(): void{
        this.modal.toggle();
    }

}
