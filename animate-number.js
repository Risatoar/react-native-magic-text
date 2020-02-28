/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { baseDefaultProps, basePropTypes } from './config';

export default class AnimatedNumber extends React.PureComponent {
  static propTypes = {
    ...basePropTypes,
    text: PropTypes.number,
    initialValue: PropTypes.number,
  };

  static defaultProps = {
    ...baseDefaultProps,
    text: 0,
    initialValue: 0,
  };

  constructor(props) {
    super(props);
    const magicValue = new Animated.Value(props.initialValue);
    this.state = {
      magicValue,
      displayValue: props.text,
    };
    magicValue.addListener(({ value }) => {
      this.setState({ displayValue: ~~value });
    });
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.animateStart();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.animateStart(nextProps);
    }
  }

  animateStart = props => {
    const { text, animateType = 'timing', animateConfig } = props || this.props;
    Animated[animateType](this.state.magicValue, {
      toValue: text,
      easing: Easing.ease,
      ...animateConfig,
    }).start();
  };

  render() {
    const { textConfig, textStyle } = this.props;
    const { displayValue } = this.state;
    return (
      <Animated.Text style={textStyle} {...textConfig}>
        {displayValue}
      </Animated.Text>
    );
  }
}
