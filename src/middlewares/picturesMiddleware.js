import axios from 'axios';
// import { createClient } from 'pexels';
import {
  LOAD_PICTURES,
  LOAD_PICTURE_OF_THE_WEEK,
  SEND_REVIEWS,
  actionReducerSendReviews,
  actionUpdatePictureOfTheWeek,
  actionUpdatePicturesHomePage,
} from '../actions/pictures';

const picturesMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case LOAD_PICTURES: {
      // console.log('picturesMiddleware executé', action);
      try {
        const sortId = action.payload;
        console.log(sortId);
        // let adressAPI = 'https://api.pexels.com/v1/curated?page=6&per_page=30';
        let adressAPI = 'http://alexandre-longeaud-server.eddi.cloud/api/pictures/filtre/liked';
        if (sortId === 'picturesMostRecents') {
          // adressAPI = 'https://api.pexels.com/v1/curated?page=9&per_page=30';
          adressAPI = 'http://alexandre-longeaud-server.eddi.cloud/api/pictures';
        }
        // const result = await axios.get(adressAPI);

        // request
        // const result = await axios.get('https://api.pexels.com/v1/curated?page=1&per_page=30', {
        const result = await axios.get(adressAPI, {
          headers: {
            Authorization: 'LHapVYEQzemuoKMIFpFcmZQtxzQm5RO0TLnvRpBshhMNJR1OJYpHVPGK',
          },
        });
        // console.log(result);
        // ici on a recu les resultats on devrait en profiter pour passer isLoading à false

        // on veut mettre dans le state le tableau result.data : on va demander au reducer en dispatchant une action
        // store.dispatch(actionUpdatePicturesHomePage(result.data.photos, sortId));
        store.dispatch(actionUpdatePicturesHomePage(result.data, sortId));
      }
      catch (e) {
        // error message
        console.log(e);
      }
      break;
    }

    case LOAD_PICTURE_OF_THE_WEEK: {
      try {
        // request
        const result = await axios.get('https://api.pexels.com/v1/photos/12488389', {
        // const result = await axios.get('http://alexandre-longeaud-server.eddi.cloud/picture-of-the-week', {
          headers: {
            Authorization: 'LHapVYEQzemuoKMIFpFcmZQtxzQm5RO0TLnvRpBshhMNJR1OJYpHVPGK',
          },
        });
        console.log(result);
        // store the datas of the picture of the week
        store.dispatch(actionUpdatePictureOfTheWeek(result.data));
      }
      catch (e) {
        // error message
        console.log(e);
      }
      break;
    }

    case SEND_REVIEWS: {
      const { inputFormReviews } = store.getState().pictures;

      try {
        const result = await axios.post('http://alexandre-longeaud-server.eddi.cloud/api/picture/id', {
          inputFormReviews,
        });
        console.log('jai cliqué l appel API se déclenche');

        store.dispatch(actionReducerSendReviews());
      }
      catch (e) {
        console.log(e);
        // afficher un message d'erreur
        console.log('jai cliqué l appel API se déclenche');
      }

      break;
    }

    default:
      next(action);
  }
};

export default picturesMiddleware;
