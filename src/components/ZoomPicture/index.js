// import PropTypes from 'prop-types';
// import from react-router-dom and react-redux
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  // console.log('PAGE ZOOM');
  const logged = useSelector((state) => state.user.logged);

  // Retrieves the picture's id
  const { id } = useParams();
  // console.log(id, typeof id);
  // Retrieves the datas of this picture
  let picture = useSelector((state) => {
    return state.pictures.listHomePage.find((testedPicture) => {
      // "==" instead of "===" because there is a space after testedPicture.id
      if (testedPicture.id) {
        return testedPicture.id == id;
      }
      return testedPicture[0].id == id;
    });
  });
  // console.log(picture);

  // if picture is the picture of the week
  if (!picture) {
    picture = useSelector((state) => {
      // "==" instead of "===" because there is a space after pictureOfTheWeek.id
      if (id == state.pictures.pictureOfTheWeek.id) {
        return state.pictures.pictureOfTheWeek;
      }
    });
  }

  // if no picture for that id, navigate to 404
  if (!picture) {
    return <Navigate to="/error" replace />;
  }

  // console.log(picture.src.medium);
  // console.log(picture.src);

  return (
    <div className="zoomPicture">
      <div className="zoomPicture__header">
        <div className="zoomPicture__containerTitle">
          <h1 className="zoomPicture__title">Zoom sur votre image</h1>
        </div>
        <PreviousPage />
      </div>
      <ContainerPicture
        imgSrc={!picture.src ? picture[0].url : picture.src.large}
        imgPrompt={!picture[0].prompt ? 'a good picture of myself' : picture[0].prompt}
      />
      <div className="zoomPicture__reviewsAndAside">
        <div className="zoomPicture__reviewsContainer">
          <PictureReviews />
        </div>
        <ZoomAside
          author={!picture.photographer ? picture.user_pseudo : picture.photographer}
          ia={!picture[0].ia.name ? 'MidJourney' : picture[0].ia.name}
          numberLikes={!picture.nombre_like ? '0' : picture.nombre_like}
          numberReviews={!picture.nombre_review ? '0' : picture.nombre_review}
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
