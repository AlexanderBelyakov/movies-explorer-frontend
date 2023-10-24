import './Portfolio.css';

export function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__links">
                <li className="portfolio__link">
                    <a className="portfolio__link-name" href="https://github.com/AlexanderBelyakov/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
                    <a className="portfolio__link-icon" href="https://github.com/AlexanderBelyakov/how-to-learn" target="_blank" rel="noreferrer">↗</a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__link-name" href="https://github.com/AlexanderBelyakov/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                    <a className="portfolio__link-icon" href="https://github.com/AlexanderBelyakov/russian-travel" target="_blank" rel="noreferrer">↗</a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__link-name" href="https://github.com/AlexanderBelyakov/mesto" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                    <a className="portfolio__link-icon" href="https://github.com/AlexanderBelyakov/mesto" target="_blank" rel="noreferrer">↗</a>
                </li>
            </ul>
        </section>
    )
}