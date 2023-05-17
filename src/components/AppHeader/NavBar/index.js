import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './style.scss';
import { Menu, X } from 'react-feather';

function NavBar({ isOpen, setIsOpen }) {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navBar__container">
      <Link className="navBar__link" to="/login">Connexion</Link> <span>/&nbsp;</span>
      <Link className="navBar__link" to="/register">Inscription</Link>

      <div className="navBar__container__mobile">
        <button type="button" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
        <ul onClick={toggleMenu} className={`${isOpen ? '' : 'li-close'}`}>
          <li> <Link to="/register">Inscription</Link></li>
          <li> <Link to="/login">Connexion</Link></li>
          <li> <Link to="/contact">Contact</Link></li>
          <li> <Link to="/mentionslegales">Mention Legales</Link></li>
        </ul>
      </div>

    </div>
  );
}

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default NavBar;
