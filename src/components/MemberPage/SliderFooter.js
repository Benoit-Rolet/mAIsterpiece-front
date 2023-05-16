import PropTypes from 'prop-types';

import './style.scss';
import { Heart, MessageSquare } from 'react-feather';

function SliderFooter({ photographer }) {
  console.log('FOOTER = ');
  console.log(photographer);
  return (
    <div className="memberPage__sliderFooter">
      {/* Martin Martin & <a href="#">MidJourney</a> */}
      {photographer}  <a href="#">MidJourney</a>
      <div className="memberPage__sliderFooter--likes">
        155 &nbsp; <Heart />
      </div>
      <div className="memberPage__sliderFooter--comments">
        18 &nbsp; <MessageSquare />
      </div>
    </div>

  );
}

SliderFooter.propTypes = {
  photographer: PropTypes.string,
};

SliderFooter.defaultProps = {
  photographer: '',
};

export default SliderFooter;