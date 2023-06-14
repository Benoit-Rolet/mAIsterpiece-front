import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';

import './style.scss';
import { Menu, User, X } from 'react-feather';
import { actionClearJwt, actionLoadUserInfos } from '../../../actions/user';
import { actionClearHomePage, actionLoadPictureOfTheWeek, actionLoadPictures } from '../../../actions/pictures';
import { URL_SERVER_BACK } from '../../../utils/url';

function NavBar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  // check in the state if the user is logged
  const isLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) => state.user.admin);
  const memberId = useSelector((state) => state.user.userId);
  const avatarSrc = useSelector((state) => state.user.avatar);
  // console.log(avatarSrc);
  // const isLogged = (sessionStorage.getItem('jwtMaisterpiece') !== '');

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    sessionStorage.setItem('jwtMaisterpiece', '');
    dispatch(actionClearJwt(event.target.value));
    dispatch(actionClearHomePage());
    dispatch(actionLoadPictures('picturesMostRecents'));
    dispatch(actionLoadPictureOfTheWeek());
    navigate('/');
  };

  useEffect(
    () => {
      // console.log('first render');
      if (sessionStorage.getItem('jwtMaisterpiece') !== '') {
        dispatch(actionLoadUserInfos());
      }
    },
    [isLogged], // first render
  );

  return (
    <div className="navBar__container">
      {!isLogged
        ? (
          <>
            <Link className="navBar__link" to="/login">Connexion</Link> <span>/&nbsp;</span>
            <Link className="navBar__link" to="/register">Inscription</Link>
          </>
        )
        : (
          <div className="navBar__container__desktop">
            <Link to="" onClick={toggleMenu}>
              {(avatarSrc === '' || avatarSrc === null) ? <User className="logo_user" /> : <img src={avatarSrc} alt="" className="logo_user" />
              }
            </Link>
            <ul onClick={toggleMenu} className={`${isOpen ? '' : 'navBar__li--close'}`}>
              {!isLogged && (
                <>
                  <li> <Link to="/register">Inscription</Link></li>
                  <li> <Link to="/login">Connexion</Link></li>
                </>
              )}
              {isLogged && (
                <>
                  <li><Link to={`/membre/${memberId}`}>Page Membre</Link></li>
                  <li><Link onClick={handleLogout} to="">Déconnexion</Link></li>
                </>
              )}
              {isAdmin && (
                <li><Link to={URL_SERVER_BACK}>Back-Office</Link></li>
              )}
              <li> <Link to="/contact">Contact</Link></li>
              <li> <Link to="/mentionslegales">Mention Legales</Link></li>

            </ul>
            <Link onClick={handleLogout} className="navBar__link" to="">Déconnexion</Link>
          </div>
        )}
      <div className="navBar__container__mobile">
        <button type="button" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu className="navBar__button" />}
        </button>
        <ul onClick={toggleMenu} className={`${isOpen ? '' : 'navBar__li--close'}`}>
          {!isLogged && (
            <>
              <li> <Link to="/register">Inscription</Link></li>
              <li> <Link to="/login">Connexion</Link></li>
            </>
          )}
          {isLogged && (
            <>
              <li><Link to={`/membre/${memberId}`}>Page Membre</Link></li>
              <li><Link onClick={handleLogout} to="">Déconnexion</Link></li>
            </>
          )}
          {isAdmin && (
            <li><Link to={URL_SERVER_BACK}>Back-Office</Link></li>
          )}
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
