import './InfoToolTip.css'

export function InfoTooltip(props) {
    return (
      <div
        className={`popup ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__overlay" onClick={props.onClose}></div>
        <div className="popup__card popup__card_for-sign-up">
          <img className="popup__sign-up-image" src={props.signUpImage} alt={props.text} />
          <p className="popup__header popup__header_for-sign-up">{props.text}</p>
          <button
            type="button"
            className="popup__close-button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    );
  }
  