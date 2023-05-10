// import PropTypes from 'prop-types';
// imports from react-redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { LOAD_PICTURES_FILTERED, actionLoadPictures, actionLoadPicturesFiltered, actionUpdateSortingHomepagePictures } from '../../actions/pictures';
// import list of sorts
import data from '../../data';
// style
import './style.scss';


function Gallery() {
  // sets the dispatch function
  const dispatch = useDispatch();
  // list of images
  const pictures = useSelector((state) => state.pictures.listHomePage);
  // id for sorting images
  const sortIdFromState = useSelector((state) => state.pictures.sortHomePageId);
  // extracts the choosen sort
  const sortTextContent = data.find((sortDataItem) => sortIdFromState === sortDataItem.id).textContent;
  // Handler for changing sort on click on link
  const handleChangeSort = (event) => {
    event.preventDefault();
    dispatch(actionLoadPictures(event.currentTarget.id));
    // dispatch(actionUpdateSortingHomepagePictures(event.currentTarget.id));
    // dispatch(actionLoadPicturesFiltered(event.currentTarget.id));
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
            {/* <a className="gallery__menuItem--hidden" id="optionMostRecents" href="#">les plus récentes</a>
            <a id="optionMostReviewed" href="#">les plus commentées</a>
            <a id="optionMostLiked" href="#">les plus aimées</a>
            <a id="optionMostClicked" href="#">les plus vues</a> */}
          </div>
          {/* <select name="selectSort" className="gallery__menu--dropdown">
            <option value="dates">les plus récentes</option>
            <option value="comments">les plus commentées</option>
            <option value="likes">les plus aimées</option>
            <option value="cliks">les plus vues</option>
          </select> */}
        </div>
      </div>
      <div className="gallery__content">
        {
          pictures.map((picture) => (
            <img className="gallery__img" src={picture.src.medium} key={picture.id} alt="" />
          ))
        }
      </div>
    </div>
  );
}

// Home.propTypes = {

// };

export default Gallery;
