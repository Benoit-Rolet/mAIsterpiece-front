import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Heart, MessageSquare, User } from 'react-feather';
import { Link } from 'react-router-dom';
import { actionToggleLikeAPI } from '../../actions/pictures';

import { URL_SERVER_BACK } from '../../utils/url';

import './style.scss';

function Card({
  id,
  url,
  isLiked,
  userId,
  userPseudo,
  userAvatar,
  nombreLike,
  nombreReview,
}) {
  const dispatch = useDispatch();
  // Initialize the "Like" of the picture
  const [like, setLike] = useState(isLiked);
  const [nbLikes, setNbLikes] = useState(parseInt(nombreLike, 10));
  // check in the state if the user is logged
  const isLogged = useSelector((state) => state.user.logged);

  // On click on the Heart, toggle the state of the like, and adjust the shown total of likes
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
    dispatch(actionToggleLikeAPI(id));
  };

  const prefix = `${URL_SERVER_BACK}/uploads/images/`;
  // const urlCompleted = prefix + url;
  let urlCompleted = url;
  // console.log(urlCompleted.substring(0, 3));
  if (urlCompleted.substring(0, 4) !== 'http') {
    urlCompleted = prefix + urlCompleted;
  }

  return (
    <>
      <img className="gallery__img" src={urlCompleted} alt="" />
      <div className="gallery__imgDatas">
        <div className="gallery__author">
          {userAvatar === '' ? <User /> : <img src={userAvatar} alt="" className="gallery__avatarPicture" />}
          <Link to={`/membre/${userId}`}>{userPseudo}</Link>
        </div>
        <div className="gallery__imgLikesAndComments">
          <div className="gallery__imgLikes" onClick={isLogged ? handleToggleLike : null}>
            {nbLikes} &nbsp; <Heart className={like ? 'heartFilled' : ''} />
          </div>
          <div className="gallery__imgComments">
            {nombreReview} &nbsp; <MessageSquare />
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  userPseudo: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  nombreLike: PropTypes.number.isRequired,
  nombreReview: PropTypes.number.isRequired,
};

export default Card;
