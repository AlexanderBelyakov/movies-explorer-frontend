import './FilterCheckbox.css'

export function FilterCheckbox({ shortMovies, handleShortMoviesCheck }) {
    console.log(shortMovies)
    return (
        <div className="filtercheckbox">
            <label className="filtercheckbox__label">
                <input 
                className={`filtercheckbox__input`}
                type="checkbox"
                onChange={handleShortMoviesCheck}
                checked={shortMovies === true}
                />
                <span className="filtercheckbox__slider"></span>
            </label>
            <p className="filtercheckbox__text">Короткометражки</p>
        </div>
    )
}