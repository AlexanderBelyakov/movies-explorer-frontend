import './WellcomeToSilentHill.css'
import { Link } from 'react-router-dom'

export function WellcomeToSilentHill() {
    return (
        <main className="wellcometosilenthill">
            <h1 className="wellcometosilenthill__header">404</h1>
            <p className="wellcometosilenthill__text">Страница не найдена</p>
            <Link className="wellcometosilenthill__link" to="/">Назад</Link>
        </main>
    )
}