import './AboutProject.css'

export function AboutProject() {
    return (
        <section className="aboutproject" id="poject">
            <h2 className="aboutproject__header">О проекте</h2>
            <div className="aboutproject__article">
                <div className="aboutproject__shell">
                    <h3 className="aboutproject__title">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutproject__text">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="aboutproject__shell">
                    <h3 className="aboutproject__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutproject__text">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="aboutproject__plan">
                <div className="aboutproject__container">
                    <p className="aboutproject__backend-text">1 неделя</p>
                    <p className="aboutproject__span">Back-end</p>
                </div>
                <div className="aboutproject__container">
                    <p className="aboutproject__frontend-text">4 недели</p>
                    <p className="aboutproject__span">Front-end</p>
                </div>
            </div>
        </section>
    )
}