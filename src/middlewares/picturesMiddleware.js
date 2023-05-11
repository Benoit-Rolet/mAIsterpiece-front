import axios from 'axios';
// import { createClient } from 'pexels';
import {
  LOAD_PICTURES,
  LOAD_PICTURE_OF_THE_WEEK,
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
        // let adressAPI = `/api/${sortId}`;
        let adressAPI = 'https://api.pexels.com/v1/curated?page=1&per_page=30';
        if (sortId === 'picturesMostRecents') {
          // adressAPI = '/api/home-list';
          // adressAPI = 'https://api.pexels.com/v1/curated?page=2&per_page=30';
          adressAPI = 'http://alexandre-longeaud-server.eddi.cloud/api/home/list';
        }
        // const result = await axios.get(adressAPI);


        // la requete
        // const result = await axios.get('https://api.pexels.com/v1/curated?page=1&per_page=30', {
        const result = await axios.get(adressAPI, {
          headers: {
            Authorization: 'LHapVYEQzemuoKMIFpFcmZQtxzQm5RO0TLnvRpBshhMNJR1OJYpHVPGK',
          },
        });
        console.log(result);
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

    default:
      next(action);
  }
};

export default picturesMiddleware;
