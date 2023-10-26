import './SearchForm.css'
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox'

export function SearchForm() {
    return (
        <section className="searchform" name="searchform">
            <form className="searchform__form">
                <input
                className="searchform__bar"
                name="searchform-bar"
                type="text"
                placeholder="Фильм"
                required
                />
                <button className="searchform__button" type="submit">
                </button>
            </form>
            <FilterCheckbox />
        </section>
    )
}