import { Component, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

import iNcoreTorrent from '../incoretorrent';
import ncoreMovieTags from '../../assets/ncoremovietags.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-torrent-browser',
  templateUrl: './torrent-browser.component.html',
  styleUrls: ['./torrent-browser.component.css']
})

export class TorrentBrowserComponent implements OnInit {
    filterTags: string[];
    modal: Modal = new Modal();
    torrents: iNcoreTorrent[] = [];

    constructor(private route: ActivatedRoute){
        this.filterTags = ncoreMovieTags;
    }

    ngOnInit() :void {
        this.initFilterModal();

        this.fetchTorrents();
    }



    fetchTorrents(){
        fetch("http://localhost:5000/torrents")
        .then(res => res.json())
        .then(data => {
            const fetchedTorrents = <iNcoreTorrent[]> [];
            data.forEach((element: any) => fetchedTorrents.push(this.getTorrent(element)));
            this.torrents = fetchedTorrents;
        });
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
            tags: data.tags,
            downloadUrl: data.downloadUrl,
            torrentId: data.torrentId
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

        this.fetchTorrents();

        this.modal.toggle();
    }



    requestSearchedMovies($event: Event): void {
        $event.preventDefault();
        const form = $event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const searchString = formData.get("search") as string;
        if(searchString === ""){
            this.fetchTorrents();
        }

        if(searchString){
            this.fetchSearchedTorrents(searchString as string)
            .then(searchedTorrents => {
                console.log(searchedTorrents);
                
                const transformedTorrentsArr = <iNcoreTorrent[]> [];
                searchedTorrents.forEach((element: any) => {
                    transformedTorrentsArr.push(this.getTorrent(element));
                });
                this.torrents = transformedTorrentsArr;
            })
        }
        
    }

    fetchSearchedTorrents(searchText: string){
        const url = new URL("http://localhost:5000/torrents");
        url.searchParams.append("q", searchText)
        console.log(url.toString());

        return fetch(url.toString())
                .then(res => res.json());
    }



}
