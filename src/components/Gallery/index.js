// imports from react-redux and react-router-dom
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// actions
import {
  actionLoadPictures,
} from '../../actions/pictures';
// Components
import Card from './Card';
// import list of sorts
import data from '../../utils/data';
// style and figures
import './style.scss';

function Gallery() {
  // sets the dispatch function
  const dispatch = useDispatch();
  useEffect(
    () => {
      // loading by default : most recents pictures
      window.scrollTo(0, 0);
      // console.log('first render');
      dispatch(actionLoadPictures('picturesMostRecents'));
    },
    [], // first render
  );
  // list of images
  const pictures = useSelector((state) => state.pictures.listHomePage);
  // console.log(pictures);
  // id for sorting images
  const sortIdFromState = useSelector((state) => state.pictures.sortHomePageId);
  // extracts the choosen sort
  const sortTextContent = data.find((sortDataItem) => sortIdFromState === sortDataItem.id).textContent;
  // Handler for changing sort on click on link
  const handleChangeSort = (event) => {
    event.preventDefault();
    dispatch(actionLoadPictures(event.currentTarget.id));
  };
  return (
    <div className="gallery__container">
      <div className="gallery__title">
        <h2>
          Les Productions
        </h2>
        <div className="gallery__line" />
        <div className="gallery__menu">
          <button type="button" className="gallery__sortButton">{sortTextContent}</button>
          <div className="gallery__menu--dropdown">
            {
              data.map((sortType) => (
                (sortType.id !== sortIdFromState)
                && (
                  <a
                    id={sortType.id}
                    key={sortType.id}
                    href="#"
                    onClick={handleChangeSort}
                  >
                    {sortType.textContent}
                  </a>
                )))
            }
          </div>
        </div>
      </div>
      <div className="gallery__content">
        {
          pictures.map((picture) => (
            <Link className="gallery__imgContainer" key={picture.id} to={`/picture/${picture.id}`}>
              <Card
                id={picture.id}
                url={picture.fileName}
                isLiked={picture.isLiked}
                userId={picture.user.id}
                userPseudo={picture.user.pseudo}
                userAvatar={picture.user.avatar}
                nombreLike={picture.nombre_like}
                nombreReview={picture.nombre_review}
              />
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Gallery;
