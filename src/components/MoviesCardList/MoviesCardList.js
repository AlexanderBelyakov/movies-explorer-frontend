import './MoviesCardList.css'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';

export function MoviesCardList() {
    const location = useLocation();
    return (
        <section className="moviescardlist">
            <div className={`moviescardlist__container ${location.pathname==='/saved-movies' && 'moviescardlist__container_saved'}`}>
                <MoviesCard name="33 слова о дизайне" isAdded={true}/>
                <MoviesCard name="Киноальманах «100 лет дизайна»"/>
                <MoviesCard name="В погоне за Бенкси"/>
                <MoviesCard name="Баския: Взрыв реальности" isAdded={true}/>
                <MoviesCard name="Бег это свобода"/>
                <MoviesCard name="Книготорговцы"/>
                <MoviesCard name="Когда я думаю о Германии ночью"/>
                <MoviesCard name="Gimme Danger: История Игги и The Stooges"/>
                <MoviesCard name="Дженис: Маленькая девочка грустит"/>
                <MoviesCard name="Соберись перед прыжком"/>
                <MoviesCard name="Пи Джей Харви: A dog called money"/>
                <MoviesCard name="По волнам: Искусство звука в кино"/>
            </div>
            <button type="button" className={`moviescardlist__more ${location.pathname==='/saved-movies' && 'moviescardlist__more_saved'}`}>Ещё</button>
        </section>
    )
}