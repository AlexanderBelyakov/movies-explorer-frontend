import './Promo.css'
import { NavTab } from '../NavTab/NavTab'

export function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab />
        </section>
    )
}