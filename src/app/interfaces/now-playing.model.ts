import { Dates } from './dates.model';
import { Movie } from './movies.model';

export interface nowPlaying {
    dates: Dates;
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}