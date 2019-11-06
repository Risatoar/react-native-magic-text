/* eslint-disable import/no-extraneous-dependencies */
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const basePropTypes = {
  text: PropTypes.string,
  textStyle: Text.propTypes.style,
  duration: PropTypes.number,
  animateType: PropTypes.oneOf(['timing', 'spring']),
  animateConfig: PropTypes.object,
  textConfig: PropTypes.object,
};

export const baseDefaultProps = {
  text: '',
  textStyle: {},
  duration: 300,
  animateType: 'timing',
  animateConfig: {},
  textConfig: {},
};
