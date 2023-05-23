import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

// import React-feather
import { useState } from 'react';
import { AlertTriangle, Heart, MessageSquare, User } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../../AlertModal';

import { actionToggleLikeAPI } from '../../../actions/pictures';

function ZoomAside({ id, author, avatar, ia, iaLink, likes, reviews, views }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  const dispatch = useDispatch();
  // TODO fonction d'initialisation du like si on est connecté
  const [like, setLike] = useState(false);
  const [nbLikes, setNbLikes] = useState(likes);
  // check in the state if the user is logged
  const isLogged = useSelector((state) => state.user.logged);

  const handleToggleLike = (event) => {
    event.preventDefault();
    setLike(!like);
    if (!like) {
      setNbLikes(nbLikes + 1);
      // console.log('nombre de like + = ', nbLikes);
    }
    else {
      setNbLikes(nbLikes - 1);
      // console.log('nombre de like - = ', nbLikes);
    }
    // toggle like via API
    // console.log(id);
    dispatch(actionToggleLikeAPI(id));
  };

  return (
    <div className="zoomPicture__zoomAside">
      <div className="zoomPicture__zoomInfo">
        {
          !avatar
            ? <User className="zoomPicture__zoomTitleAside" />
            : <img src={avatar} alt="avatar du créateur" className="zoomPicture__zoomTitleAside" />
        }
        <p className="zoomPicture__zoomContentAside">{author}</p>
      </div>
      <div className="zoomPicture__zoomInfo">
        <p className="zoomPicture__zoomTitleAside">IA</p>
        <Link to={iaLink} className="zoomPicture__zoomContentAside">{ia}</Link>
      </div>
      <div className="zoomPicture__zoomInfo">
        <p className="zoomPicture__zoomTitleAside">Vues</p>
        <p className="zoomPicture__zoomContentAside">{views}</p>
      </div>
      <div className="zoomPicture__zoomInfo" onClick={isLogged ? handleToggleLike : null}>
        <Heart className={like ? 'zoomPicture__liked zoomPicture__zoomTitleAside' : 'zoomPicture__zoomTitleAside'} />
        <p className="zoomPicture__zoomContentAside">{nbLikes}</p>
      </div>
      <div className="zoomPicture__zoomInfo">
        <MessageSquare className="zoomPicture__zoomTitleAside" />
        <p className="zoomPicture__zoomContentAside">{reviews}</p>
      </div>
      <div className="zoomPicture__zoomTags">
        <p className="zoomPicture__zoomTitleAside">Tags</p>
        <p className="zoomPicture__zoomContentAside">"Beau, coloré, carré"</p>
      </div>
      <div className="zoomPicture__containerButtonAlert">
        <p>Signaler</p>
        <button onClick={toggleMenu} className="zoomPicture__reportButton" type="button"><AlertTriangle /> </button>
        {isVisible && <AlertModal isVisible={isVisible} setIsVisible={setIsVisible} className="alertModal" />}
      </div>
    </div>
  );
}

ZoomAside.propTypes = {
  author: PropTypes.string,
  ia: PropTypes.string,
};

ZoomAside.defaultProps = {
  author: 'non communiqué',
  ia: 'non communiquée',
};

export default ZoomAside;
