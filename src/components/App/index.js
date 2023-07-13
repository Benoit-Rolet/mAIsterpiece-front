// import of react-router-dom
import { Routes, Route } from 'react-router-dom';

// imports from react and react-redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import LoginPage from '../LoginPage';
import HomePage from '../HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import PageContact from '../PageContact';
import AppHeaderMin from '../AppHeader/AppHeaderMin';
import Error404 from '../Error404';
import ZoomPicture from '../ZoomPicture';
import MemberPage from '../MemberPage';
import AllMessages from '../AllMessages';
import DropZone from '../DropZone';
import GallerySearch from '../GallerySearch';
import LegalNotice from '../LegalNotice';

// style
import './styles.css';

// actions
import { actionLoadPictureOfTheWeek, actionLoadPictures } from '../../actions/pictures';


// Main fonction for the application
function App() {
  // state's variable to set the small menu (bool)
  const [showScrollHeader, setShowScrollHeader] = useState(false);
  // state which allows to manage the poster of the burger menu or not
  const [isOpen, setIsOpen] = useState(false);
  // check if 'jwtMaisterpiece' exists in localStorage. If not, put an empty string for this key.
  if (sessionStorage.getItem('jwtMaisterpiece') === null) {
    sessionStorage.setItem('jwtMaisterpiece', '');
  }

  useEffect(
    () => {
      // Update of the picture of the week
      // dispatch(actionLoadPictureOfTheWeek());
      // loading by default : most recents pictures
      // dispatch(actionLoadPictures('picturesMostRecents'));
      const appHeaderHeight = document.querySelector('.appHeader').offsetHeight;
      // console.log(document.querySelector('.appHeader').offsetHeight);
      const handleScroll = () => {
        // const isScrollComplete = window.scrollY >= appHeaderHeight;
        const isScrollComplete = window.scrollY >= appHeaderHeight - 49;
        setShowScrollHeader(isScrollComplete);
      };
      window.scrollTo(0, 0);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    [], // first render
  );

  // useEffect(
  //   () => {
  //     console.log(AppHeaderHeight);
  //   },
  //   [AppHeaderHeight],
  // );

  // console.log(AppHeaderHeight);
  //      (window.scrollY >= <AppHeader />.offsetHeight)
  // function showAppHeaderMin() {
  //   console.log(window.scrollY);
  //   if (window.scrollY >= AppHeaderHeight) {
  //     return <AppHeaderMin />;
  //   }
  //   return '';
  // }

  // Function that allows you to invert the state associated with the onClick for displaying the burger menu
  const toggleMenuMain = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={isOpen ? toggleMenuMain : null} className="app">
      <AppHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      {
        showScrollHeader && <AppHeaderMin isOpen={isOpen} setIsOpen={setIsOpen} />
      }
      <Routes>
        <Route path="/" element=<HomePage /> />
        <Route path="/login" element=<LoginPage /> />
        <Route path="/register" element=<RegisterPage /> />
        <Route path="/contact" element=<PageContact /> />
        <Route path="/mentionslegales" element=<LegalNotice /> />
        <Route path="/membre/:memberId" element=<MemberPage /> />
        <Route path="/picture/:id" element=<ZoomPicture /> />
        <Route path="/test" element=<DropZone /> />
        <Route path="/resultats" element=<GallerySearch /> />
        <Route path="/error" element=<Error404 /> />
        <Route path="*" element=<Error404 /> />
      </Routes>
      <AllMessages />
      <AppFooter />
    </div>
  );
}

export default App;
