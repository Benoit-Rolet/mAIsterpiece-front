import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { actionUpdateSearchBar } from '../../actions/pictures';

// import image de fond
// import BackgroundImage from 'https://www.zupimages.net/up/23/18/3bwm.jpg'
// import reactLogo from './react-logo.svg';
import Logo from '../../assets/proposition_logo.png';
// import composants
import NavBar from './NavBar';

// import scss
import './style.scss';

function AppHeader({ isOpen, setIsOpen }) {
  const inputSearchBar = useSelector((state) => state.pictures.inputSearchBar);

  const dispatch = useDispatch();

  const handleChangeInputSearchBar = (event) => {
    dispatch(actionUpdateSearchBar(event.target.value));
  };

  return (
    <div
      className="appHeader"
      style={{
        // backgroundImage: 'url("https://www.zupimages.net/up/23/18/3bwm.jpg")',
        backgroundImage: 'url("https://www.zupimages.net/up/23/19/oqik.jpg")',
      }}
    >
      <div className="appHeader__logoNavbar">
        <div className="appHeader__logoAndTitle">
          <Link to="/">
            <img className="appHeader__logoImg" src={Logo} alt=" logo" />
          </Link>
          <Link to="/" id="appHeader__brand">mAIsterpiece</Link>
        </div>
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="appHeader__searchBar">
        <p className="appHeader__textAboveSearchBar">Bienvenue sur mAIsterpiece ! Ici, vous pourrez apprécier
          et télécharger vos images générées par IA
        </p>
        <form>
          <input
            className="appHeader__headerSearch"
            type="text"
            name="headerSearch"
            id="headerSearch"
            placeholder="Rechercher votre image"
            value={inputSearchBar}
            onChange={handleChangeInputSearchBar}
          />
        </form>

      </div>
    </div>
  );
}

AppHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,

};

export default AppHeader;
