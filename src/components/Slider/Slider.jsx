import React from 'react';
import PropTypes from 'prop-types';
import { getNextRoundRobin, getRandomNumber } from '../../lib/utils/maths';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import Img from './style';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: -1,

    };
  }

  componentDidMount() {
    const { banners, duration, random } = this.props;
    this.id = setInterval(() => {
      let { counter } = this.state;

      if (random && banners.length) counter = getRandomNumber(banners.length);
      else if (banners.length) counter = getNextRoundRobin(banners.length, counter);

      this.setState({ counter });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    // console.log('inside render');
    let imagePath;
    const {
      altText, banners, defaultBanner, height,
    } = this.props;
    const { counter } = this.state;

    if (counter === -1) {
      if (defaultBanner) imagePath = `${PUBLIC_IMAGE_FOLDER}banners/${defaultBanner}`;
      else imagePath = PUBLIC_IMAGE_FOLDER + DEFAULT_BANNER_IMAGE;
    } else imagePath = PUBLIC_IMAGE_FOLDER + banners[counter];
    return (
      <Img src={imagePath} alt={altText} height={height} />
    );
  }
}
Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: 'default.png',
  duration: 1000,
  height: 200,
  random: false,
};


export default Slider;
