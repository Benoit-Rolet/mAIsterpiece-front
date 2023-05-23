// import PropTypes from 'prop-types';
// import from react-router-dom and react-redux
import { useEffect } from 'react';
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
import './style.scss';
import PreviousPage from '../PreviousPage';
import AlertModal from '../AlertModal';


function ZoomPicture() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);
  const picture = useSelector((state) => state.pictures.pictureZoom);

  // console.log('picture dans le state = ', picture);
  // Retrieves the picture's id
  const { id } = useParams();

  useEffect(
    () => {
      // Uploading the datas of the picture identified by 'id' in the state
      dispatch(actionLoadPictureDatas(id));
    },
    [], // first render
  );

  // Retrieves the datas of this picture
  // let picture = useSelector((state) => {
  //   return state.pictures.listHomePage.find((testedPicture) => {
  //     // "==" instead of "===" because there is a space after testedPicture.id
  //     // return testedPicture.id == id;
  //     return testedPicture[0].id == id;
  //   });
  // });
  // console.log(picture);

  // if picture is the picture of the week
  // if (!picture) {
  //   picture = useSelector((state) => {
  //     // "==" instead of "===" because there is a space after pictureOfTheWeek.id
  //     if (id == state.pictures.pictureOfTheWeek.id) {
  //       return state.pictures.pictureOfTheWeek;
  //     }
  //   });
  // }

  // if no picture for that id navigate to 404
  // if (!picture) {
  //   return <Navigate to="/error" replace />;
  // }

  return (
    <div className="zoomPicture">
      <div className="zoomPicture__header">
        <div className="zoomPicture__containerTitle">
          <h1 className="zoomPicture__title">Zoom sur votre image</h1>
        </div>
        <PreviousPage />
      </div>
      <ContainerPicture
        imgSrc={(picture !== null) ? picture.url : ''}
        imgPrompt="a good picture of myself"
      />
      <div className="zoomPicture__reviewsAndAside">
        <div className="zoomPicture__reviewsContainer">
          <PictureReviews reviews={(picture !== null) ? picture.reviews : []} />
        </div>
        <ZoomAside
          author={(picture !== null) ? picture.user_pseudo : ''}
          avatar={(picture !== null) ? picture.user_avatar : null}
          ia={(picture !== null) ? picture.ia_name : null}
          iaLink={(picture !== null) ? picture.ia_link : null}
          views={(picture !== null) ? picture.nbClick : null}
          likes={(picture !== null) ? picture.nombre_like : 0}
          reviews={(picture !== null) ? picture.nombre_review : 0}
          id={picture ? picture.id : null}
        />
      </div>
      <MoreReviewsButton />
      {logged && <AddReviews />}
    </div>
  );
}

ZoomPicture.propTypes = {

};

export default ZoomPicture;
