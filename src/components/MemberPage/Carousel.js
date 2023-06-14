// Note pour le carousel : mettre largeur maximum d'une image importée dans le paramètre         spaceBetween (={600} par exemple) de <Swiper>

// import from react, react-redux, and react-router-dom
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules of Swiper
import { Pagination, Navigation } from "swiper";
// PropTypes
import PropTypes from 'prop-types';
// import components
import SliderFooter from './SliderFooter';
// style and icons
import './style.scss';
import { CloudLightning, Heart, MessageSquare } from 'react-feather';

import { URL_SERVER_BACK } from '../../utils/url';

function Carousel() {
  // list of this member's images in the state
  // const pictures = useSelector((state) => state.pictures.listHomePage);
  const pictures = useSelector((state) => state.user.memberListOfPictures.pictures);
  const [slideIndex, setSlideIndex] = useState(0);

  // console.log("PICTURES = ", pictures);

  const prefix = `${URL_SERVER_BACK}/uploads/images/`;

  const checkUrl = (filename) => {
    let urlCompleted = filename;
    // console.log(picture.fileName);
    if ((urlCompleted !== undefined) && urlCompleted.substring(0, 4) !== 'http') {
      urlCompleted = prefix + urlCompleted;
    }
    return urlCompleted;
  };

  return (
    <>
      <div className="memberPage__sliderContainer">

        <Swiper
          slidesPerView={'auto'}
          autoHeight={true}
          centeredSlides={true}
          spaceBetween={600}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => {
            // swiperRef.current = swiper.activeIndex;
            // console.log(swiper.activeIndex);
            setSlideIndex(swiper.activeIndex);
          }}
          className="memberPage__SwiperContainer"
        >
          {
            pictures[0].picture_id !== null
            && pictures.map((picture) => (
              <SwiperSlide key={picture.picture_id}>
                <Link to={`/picture/${picture.picture_id}`}>
                  <img
                    src={checkUrl(picture.picture_fileName)}
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
        {/* <button type="button" onClick={() => swiperRef.current.slideNext()}>
        Go to Next Slide
      </button> */}

      </div>
      {
        (pictures.length !== 0)
        && <SliderFooter {...pictures[slideIndex]} />
      }
    </>
  );
}

Carousel.propTypes = {

};

export default Carousel;
