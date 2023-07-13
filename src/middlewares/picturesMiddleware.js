import axios from 'axios';

import {
  ACTION_DELETE_PICTURE,
  ACTION_SEARCH_BY_AUTHOR,
  ACTION_SEARCH_BY_PROMPT,
  ACTION_SEARCH_BY_TAG,
  ACTION_TOGGLE_LIKE_API,
  LOAD_PICTURES,
  LOAD_PICTURE_DATAS,
  LOAD_PICTURE_OF_THE_WEEK,
  SEND_NEW_PICTURE,
  SEND_REVIEWS,
  actionClearFormNewPicture,
  actionLoadPictureDatas,
  actionLoadSearchbyAuthor,
  actionLoadSearchbyPrompt,
  actionLoadSearchbyTag,
  actionUpdatePictureDatas,
  actionUpdatePictureOfTheWeek,
  actionUpdatePicturesHomePage,
} from '../actions/pictures';
import { actionLoadMemberPictures } from '../actions/user';
import { actionAddOneMessage } from '../actions/messages';
import { URL_SERVER_BACK } from '../utils/url';

const picturesMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case LOAD_PICTURES: {
      const jwt = sessionStorage.getItem('jwtMaisterpiece');
      try {
        const sortId = action.payload;
        let adressAPI = `${URL_SERVER_BACK}/api/pictures`;
        switch (sortId) {
          case 'picturesMostRecents':
            adressAPI = `${URL_SERVER_BACK}/api/pictures`;
            break;
          case 'picturesMostReviewed':
            adressAPI = `${URL_SERVER_BACK}/api/pictures/filtre/reviewed`;
            break;
          case 'picturesMostClicked':
            adressAPI = `${URL_SERVER_BACK}/api/pictures/filtre/clicked`;
            break;
          case 'picturesMostLiked':
            adressAPI = `${URL_SERVER_BACK}/api/pictures/filtre/liked`;
            break;
          default:
            adressAPI = `${URL_SERVER_BACK}/api/pictures`;
        }
        // request
        const result = await axios.get(
          adressAPI,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        // action for the reducer "pictures"
        store.dispatch(actionUpdatePicturesHomePage(result.data, sortId));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }
      break;
    }

    case LOAD_PICTURE_OF_THE_WEEK: {
      try {
        // load the JWT
        const jwt = sessionStorage.getItem('jwtMaisterpiece');
        // request
        const result = await axios.get(
          `${URL_SERVER_BACK}/api/pictures/week`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        // store the datas of the picture of the week
        store.dispatch(actionUpdatePictureOfTheWeek(result.data));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }
      break;
    }

    case LOAD_PICTURE_DATAS: {
      try {
        const { id } = action.payload;
        // const { jwt } = store.getState().user;
        const jwt = sessionStorage.getItem('jwtMaisterpiece');
        // request
        const result = await axios.get(
          `${URL_SERVER_BACK}/api/pictures/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        console.log('Middleware pic zoom = ', result);
        // store the datas of the picture
        store.dispatch(actionUpdatePictureDatas(result.data));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }
      break;
    }

    case SEND_REVIEWS: {
      const { inputFormReviews } = store.getState().pictures;
      // const { jwt } = store.getState().user;
      const jwt = sessionStorage.getItem('jwtMaisterpiece');

      try {
        const { id } = action.payload;
        const result = await axios.post(
          `${URL_SERVER_BACK}/api/pictures/${id}/review`,
          {
            content: inputFormReviews,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        // store.dispatch(actionReducerSendReviews());
        store.dispatch(actionLoadPictureDatas(id));
      } catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }

      break;
    }

    case ACTION_DELETE_PICTURE: {
      try {
        const { pictureId, memberId } = action.payload;
        // const { jwt } = store.getState().user;
        const jwt = sessionStorage.getItem('jwtMaisterpiece');
        // request
        const result = await axios.delete(
          `${URL_SERVER_BACK}/api/pictures/${pictureId}/delete`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        // console.log(result);
        // store the datas of the picture
        store.dispatch(actionLoadMemberPictures(memberId));
        store.dispatch(actionAddOneMessage('success', 'Image supprimée.'));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }
      break;
    }


    case SEND_NEW_PICTURE: {
      const { inputPrompt, inputTags } = store.getState().pictures;
      // const { jwt } = store.getState().user;
      const jwt = sessionStorage.getItem('jwtMaisterpiece');

      // const formDataToJson = (formData) => {
      //   const jsonObject = {};
      //   formData.forEach((value, key) => {
      //     jsonObject[key] = value;
      //   });
      //   return JSON.stringify(jsonObject);
      // };

      try {
        // console.log('num IA = ', action.payload.idAI);
        // console.log(typeof action.payload.idAI);
        const formData = new FormData();
        const data = { prompt: inputPrompt, ia: Number(action.payload.idAI), tags: [{ name: inputTags }] };
        // const data = { prompt: inputPrompt, ia: 5, tags: [{ name: inputTags }] };
        // console.log('data = ', data);
        formData.append('data', JSON.stringify(data));
        formData.append('file', action.payload.newPictureFile);
        // const jsonData = formDataToJson(formData);

        const result = await axios.post(
          `${URL_SERVER_BACK}/api/pictures/add`,
          // {
          // fileName: formData,
          // prompt: inputPrompt,
          // ia: 1,
          // name: inputTags,
          // data: {"prompt":"vert","ia":2,"tags":[]},
          // file: formData,

          // }
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Résultat de l\'importation d\'image : ', result);
        store.dispatch(actionClearFormNewPicture());
        store.dispatch(actionAddOneMessage('success', 'Nouvelle image enregistrée.'));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }

      break;
    }

    case ACTION_TOGGLE_LIKE_API: {
      // const { jwt } = store.getState().user;
      const jwt = sessionStorage.getItem('jwtMaisterpiece');
      // console.log('Middleware JWT : ', jwt);
      const { id } = action.payload;
      try {
        const result = await axios.post(
          `${URL_SERVER_BACK}/api/pictures/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        // console.log(result);
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }

      break;
    }

    case ACTION_SEARCH_BY_TAG: {
      const { searchValue } = action.payload;
      try {
        const result = await axios.post(
          `${URL_SERVER_BACK}/api/pictures/search/tag?search=${searchValue}`,
        );
        console.log(result);
        store.dispatch(actionLoadSearchbyTag(result.data));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }

      break;
    }

    case ACTION_SEARCH_BY_AUTHOR: {
      const { searchValue } = action.payload;
      try {
        const result = await axios.post(
          `${URL_SERVER_BACK}/api/pictures/search/user?search=${searchValue}`,
        );
        console.log(result);
        store.dispatch(actionLoadSearchbyAuthor(result.data));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }

      break;
    }

    case ACTION_SEARCH_BY_PROMPT: {
      const { searchValue } = action.payload;
      try {
        const result = await axios.post(
          `${URL_SERVER_BACK}/api/pictures/search/prompt?search=${searchValue}`,
        );
        console.log(result);
        store.dispatch(actionLoadSearchbyPrompt(result.data));
      }
      catch (e) {
        // error message
        console.log(e);
        store.dispatch(actionAddOneMessage('error', `Erreur de type ${e.message}. Veuillez réessayer un peu plus tard.`));
      }

      break;
    }

    default:
      next(action);
  }
};

export default picturesMiddleware;
