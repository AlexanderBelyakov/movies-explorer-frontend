import './FilterCheckbox.css'

export function FilterCheckbox({ shortMovies, handleShortMoviesCheck }) {
    return (
        <div className="filtercheckbox">
            <label className="filtercheckbox__label">
                <input 
                className="filtercheckbox__input" 
                type="checkbox"
                onChange={handleShortMoviesCheck}
                defaultChecked={shortMovies ? true : false}
                />
                <span className="filtercheckbox__slider"></span>
            </label>
            <p className="filtercheckbox__text">Короткометражки</p>
        </div>
    )
}