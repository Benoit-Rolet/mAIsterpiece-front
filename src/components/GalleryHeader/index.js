// import PropTypes from 'prop-types';

import './style.scss';

function GalleryHeader() {
  return (
    <div className="gallery__header">
      <p className="gallery__textHeader">Bienvenue sur A.I. Masterpiece ! Ici, vous pourrez apprécier
        et téléverser vos images générées par IA
      </p>
      <button type="button" className="gallery__registerButton">s'inscrire</button>
    </div>
  );
}

// GalleryHeader.propTypes = {

// };

export default GalleryHeader;
