import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import languageCodes from '../../assets/languagecodes.json';
import tmdbGenres from '../../assets/tmdbgenre.json';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{
    tmdbApiUrl = "https://node-api-key-proxy-production.up.railway.app/tmdb";
    tmdbImgBaseUrl = "https://image.tmdb.org/t/p/";
    isDataAvailable = false;
    movie: any = {};

    constructor(private route: ActivatedRoute){
    }
    
    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            fetch(`${this.tmdbApiUrl}?external_id=${params.imdbId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.movie_results[0]);
                this.movie = data.movie_results[0];
                this.isDataAvailable = true;
            });
        })
    }

    
    getMovieOriginLanguageInHungarian(movieObjCountryCode: string) {
        const language = languageCodes.find(languageObj => languageObj['ISO 639-1'] === movieObjCountryCode)?.magyar;
        return this.capitalizeFirstLetter(language as string);
    }

    capitalizeFirstLetter(str: string){
        return str[0].toUpperCase() + str.slice(1);
    }


    getMovieGenreList(genreIdArr: number[]) {
        const outputGenreNameArr: string[] = [];
        genreIdArr.forEach(id => {
            const matchGenreObj = tmdbGenres["genres"].find(obj => obj.id === id);
            if(matchGenreObj){
                outputGenreNameArr.push(matchGenreObj?.name);
            }
        })
        return outputGenreNameArr;
    }

}
