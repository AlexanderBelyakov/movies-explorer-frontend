import './Footer.css'

export function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
                <p className="footer__time">© {new Date().getFullYear()}</p>
                <a className="footer__yandex" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                <a className="footer__github" href="https://github.com/AlexanderBelyakov?tab=repositories" target="_blank" rel="noreferrer">Github</a>
            </div>
        </footer>
    )
}