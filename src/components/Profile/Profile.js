import './Profile.css'

export function Profile() {
    return (
        <main className="profile">
            <form className="profile__form" name="profile" >
                <h1 className="profile__header">Привет, Александр!</h1>
                <div className="profile__inputs">
                    <label className="profile__input">
                        <span className="profile__text">Имя</span>
                        <input
                        name="name"
                        className="profile__text"
                        value="Александр"
                        type="text"
                        required
                        />
                    </label>
                    <label className="profile__input">
                        <span className="profile__text">E-mail</span>
                        <input
                        name="email"
                        className="profile__text"
                        value="pochta@yandex.ru"
                        type="email"
                        required
                        />
                    </label>
                </div>
                <div className="profile__buttons">
                    <button type="submit" className="profile__edit">Редактировать</button>
                    <button type="submit" className="profile__exit">Выйти из аккаунта</button>
                </div>
            </form>
        </main>
    )
}