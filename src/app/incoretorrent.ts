export default interface iNcoreTorrent {
    valid: boolean;
    title: string;
    huTitle: string; 
    category: string;
    imdbRating: number;
    pubDate: string;
    size: string;
    seed: number;
    coverImgUrl: string;
    imdbUrl: string;
    imdbId: string;
    tags: string[];
    downloadUrl: string;
    torrentId: number;
};