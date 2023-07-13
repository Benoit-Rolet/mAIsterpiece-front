// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

// import React-feather
import { useEffect, useState } from 'react';
import { AlertTriangle, Heart, MessageSquare, User } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../../AlertModal';

import { actionToggleLikeAPI } from '../../../actions/pictures';

// author={(picture !== null) ? picture.user_pseudo : ''}
// authorId={(picture !== null) ? picture.user_id : ''}
// avatar={(picture !== null) ? picture.user_avatar : null}
// ia={(picture !== null) ? picture.ia_name : null}
// iaLink={(picture !== null) ? picture.ia_link : null}
// views={(picture !== null) ? picture.nbClick : null}
// likes={(picture !== null) ? nombreLikeAside : 0}
// reviews={(picture !== null) ? nombreReviewAside : 0}
// id={picture ? picture.id : null}
// isLiked={picture ? picture.isLiked : false}
// function ZoomAside({ id, author, avatar, ia, iaLink, likes, reviews, views, authorId, isLiked }) {
function ZoomAside({ picture }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  const dispatch = useDispatch();

  // const [like, setLike] = useState(isLiked);
  // console.log('picture.isLiked = ', picture.isLiked);
  const [like, setLike] = useState(picture.isLiked);
  // console.log('like = ', like);
  const [nbLikes, setNbLikes] = useState(picture.nombre_like);
  // check in the state if the user is logged
  const isLogged = useSelector((state) => state.user.logged);

  const handleToggleLike = (event) => {
    event.preventDefault();
    setLike(!like);
    if (!like) {
      setNbLikes(nbLikes + 1);
    }
    else {
      setNbLikes(nbLikes - 1);
    }
    // toggle like via API
    dispatch(actionToggleLikeAPI(picture.id));
  };

  useEffect(
    () => {
      setNbLikes(picture.nombre_like);
    },
    [picture],
  );

  return (
    <div className="zoomPicture__zoomAside">
      <div className="zoomPicture__zoomInfo">
        {
          !picture.user_avatar
            ? <User className="zoomPicture__zoomTitleAside" />
            : <img src={picture.user_avatar} alt="avatar du créateur" className="zoomPicture__zoomTitleAside" />
        }
        <Link to={`/membre/${picture.user_id}`}><p className="zoomPicture__zoomContentAside">{picture.user_pseudo}</p></Link>
      </div>
      <div className="zoomPicture__zoomInfo">
        <p className="zoomPicture__zoomTitleAside">IA</p>
        <Link to={picture.ia_link} className="zoomPicture__zoomContentAside">{picture.ia_name}</Link>
      </div>
      <div className="zoomPicture__zoomInfo">
        <p className="zoomPicture__zoomTitleAside">Vues</p>
        <p className="zoomPicture__zoomContentAside">{picture.nbClick}</p>
      </div>
      <div className="zoomPicture__zoomInfo" onClick={isLogged ? handleToggleLike : null}>
        <Heart className={like ? 'zoomPicture__liked zoomPicture__zoomTitleAside' : 'zoomPicture__zoomTitleAside'} />
        <p className="zoomPicture__zoomContentAside">{nbLikes}</p>
      </div>
      <div className="zoomPicture__zoomInfo">
        <MessageSquare className="zoomPicture__zoomTitleAside" />
        <p className="zoomPicture__zoomContentAside">{picture.nombre_review}</p>
      </div>
      <div className="zoomPicture__zoomTags">
        <p className="zoomPicture__zoomTitleAside">Tags</p>
        <p className="zoomPicture__zoomContentAside">"Beau, coloré"</p>
      </div>
      <div className="zoomPicture__containerButtonAlert">
        <p>Signaler</p>
        <button onClick={toggleMenu} className="zoomPicture__reportButton" type="button"><AlertTriangle /> </button>
        {isVisible && <AlertModal isVisible={isVisible} setIsVisible={setIsVisible} className="alertModal" />}
      </div>
    </div>
  );
}

// ZoomAside.propTypes = {

// };

export default ZoomAside;
