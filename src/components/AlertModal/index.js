import PropTypes from 'prop-types';

import { XCircle } from 'react-feather';
import './style.scss';

function AlertModal({ isVisible, setIsVisible }) {
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="alertModal">
      <div className="previousPage">
        <div>
          <button className="closeButton" type="button" onClick={toggleMenu}>
            <XCircle className="zoomPicture__closePage" />
          </button>
        </div>
      </div>
      <form className="">
        <input
          className=""
          type="text"
          name="inputLogin"
          id="inputLogin"
          placeholder="Login"
        />
        <input
          className=""
          type="text"
          name="inputReason"
          id="inputReason"
          placeholder="Raison du signalement"
        />
        <textarea
          className=""
          type="text"
          name="inputDescription"
          id="inputDescription"
          placeholder="Decriver votre signalement"
        />
        <div className="">
          <button className="" type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

AlertModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,

};

export default AlertModal;
