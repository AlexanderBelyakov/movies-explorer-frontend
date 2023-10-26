import './AboutMe.css'
import me from "../../images/me.jpg"

export function AboutMe() {
    return (
        <section className="aboutme" id="student">
            <h2 className="aboutme__header">Студент</h2>
            <div className="aboutme__container"> 
                <div className="aboutme__info">
                    <p className="aboutme__name">Александр</p>
                    <p className="aboutme__profession">Фронтенд-разработчик, 23 года</p>
                    <p className="aboutme__bio">Я родился и живу в Нижнем, закончил факультет экономики и управления НГТУ. У меня нет ни жены 
ни дочери. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="aboutme__link" href="https://github.com/AlexanderBelyakov?tab=repositories" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="aboutme__photo" alt="Фото студента" src={me}/>
            </div>
        </section>
    )
}