import { Component, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

import iNcoreTorrent from '../incoretorrents';
import ncoreMovieTags from '../../assets/ncoremovietags.json';

@Component({
  selector: 'app-torrent-browser',
  templateUrl: './torrent-browser.component.html',
  styleUrls: ['./torrent-browser.component.css']
})
export class TorrentBrowserComponent implements OnInit {
    filterTags: string[];
    modal: Modal = new Modal();
    torrents: iNcoreTorrent[] = [];

    constructor(){
        this.filterTags = ncoreMovieTags;
    }

    ngOnInit() :void {
        this.initFilterModal();

        this.fetchTorrents()
        .then(data => {
            data.forEach((element: any) => this.torrents.push(this.getTorrent(element)));
        });
        
    }



    fetchTorrents(){
        return fetch("http://localhost:5000/torrents").then(res => res.json())
    }

    getTorrent(data: any){
        return ({
            valid: data.valid,
            title: data.title,
            huTitle: data["hu-title"],
            category: data.category,
            imdbRating: data["imdb-rating"],
            pubDate: data.pubDate,
            size: data.size,
            seed: data.seed,
            coverImgUrl: data.coverImgUrl,
            imdbUrl: data.imdbUrl,
            imdbId: data.imdbId,
            tags: data.tags
        } as iNcoreTorrent)
    }



    initFilterModal(): void {
        const modalEl: HTMLElement | null = document.querySelector("#filterModal");

        const modalOptins: ModalOptions = {
            placement: "center",
            backdrop: "dynamic",
            backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
            closable: true,
            onHide: () => {
                // console.log("hiding modal");
            },
            onShow: () => {
                // console.log("showing modal");
            },
            onToggle: () => {
                // console.log("modal toggled");
            }
        }

        this.modal = new Modal(modalEl, modalOptins);
    }

    toggleModal(): void{
        this.modal.toggle();
    }



    requestFilteredMovies($event: Event) {
        $event.preventDefault();
        const form = $event.target;
        const formData = new FormData(form as HTMLFormElement);
        const queryObj = new URLSearchParams(formData as any);
        
        this.fetchFilterTorrents(queryObj)
        .then(filteredTorrents => {
            this.torrents = filteredTorrents;
        })
        
        this.modal.toggle();
    }

    fetchFilterTorrents(categories: URLSearchParams){
        const url = new URL("http://localhost:5000/torrents");
        categories.forEach((value, key) => {
            url.searchParams.append(key, value)
        });
        
        return fetch(url.toString()).then(response => response.json());
    }


    resetFilter(): void{

        const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        checkboxes.forEach(el  => {
            (el as HTMLInputElement).checked = false;
        });

        this.fetchTorrents()
        .then(torrentsJson => this.torrents = torrentsJson);

        this.modal.toggle();
    }


}
