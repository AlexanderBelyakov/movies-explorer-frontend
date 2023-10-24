import './SavedMovies.css'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'

export function SavedMovies() {
    return (
        <main className="savedmovies">
            <SearchForm />
            <MoviesCardList />
        </main>
    )
}