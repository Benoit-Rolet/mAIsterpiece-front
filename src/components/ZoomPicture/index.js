// import PropTypes from 'prop-types';
// import from react-router-dom and react-redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { actionLoadPictureDatas } from '../../actions/pictures';
// import React feather
import { XCircle } from 'react-feather';

// Import components

import AddReviews from './AddReviews';
import ContainerPicture from './ContainerPicture';
import MoreReviewsButton from './MoreReviewsButton';
import PictureReviews from './PictureReviews';
import ZoomAside from './ZoomAside';
import PreviousPage from '../PreviousPage';
import AlertModal from '../AlertModal';

import './style.scss';
import { URL_SERVER_BACK } from '../../utils/url';

function ZoomPicture() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);
  const picture = useSelector((state) => state.pictures.pictureZoom);
  const [nombreLikeAside, setNombreLikeAside] = useState(0);
  const [nombreReviewAside, setNombreReviewAside] = useState(0);
  console.log('picture Zoom = ', picture);

  // Retrieves the picture's id
  const { id } = useParams();

  useEffect(
    () => {
      // Uploading the datas of the picture identified by 'id' in the state
      // window.scrollTo(0, 0);
      dispatch(actionLoadPictureDatas(id));
    },
    [], // first render
  );
  useEffect(
    () => {
      if (picture !== null) {
        setNombreLikeAside(picture.nombre_like);
        setNombreReviewAside(picture.nombre_review);
      }
    },
    [picture],
  );

  let urlCompleted = '';
  const prefix = `${URL_SERVER_BACK}/uploads/images/`;
  if (picture !== null) {
    urlCompleted = picture.fileName;
    // console.log(picture.fileName);
    if ((urlCompleted !== null) && urlCompleted.substring(0, 4) !== 'http') {
      urlCompleted = prefix + urlCompleted;
    }
  }

  return (
    <div className="zoomPicture">
      <div className="zoomPicture__header">
        <div className="zoomPicture__containerTitle">
          <h1 className="zoomPicture__title">Zoom sur votre image</h1>
        </div>
        <PreviousPage />
      </div>
      <ContainerPicture
        imgSrc={(picture !== null) ? urlCompleted : ''}
        imgPrompt={(picture !== null) ? picture.prompt : ''}
      />
      <div className="zoomPicture__reviewsAndAside">
        <div className="zoomPicture__reviewsContainer">
          <PictureReviews reviews={(picture !== null) ? picture.reviews : []} id={id} />
        </div>
        {/* <ZoomAside
          author={(picture !== null) ? picture.user_pseudo : ''}
          authorId={(picture !== null) ? picture.user_id : ''}
          avatar={(picture !== null) ? picture.user_avatar : null}
          ia={(picture !== null) ? picture.ia_name : null}
          iaLink={(picture !== null) ? picture.ia_link : null}
          views={(picture !== null) ? picture.nbClick : null}
          likes={(picture !== null) ? nombreLikeAside : 0}
          reviews={(picture !== null) ? nombreReviewAside : 0}
          id={picture ? picture.id : null}
          isLiked={picture ? picture.isLiked : false}
        /> */}
        {
          (picture !== null)
          && <ZoomAside picture={picture} />
        }
      </div>
      <MoreReviewsButton />
      {logged && (picture !== null) && <AddReviews pictureId={picture.id} />}
    </div>
  );
}

ZoomPicture.propTypes = {

};

export default ZoomPicture;
