/* eslint-disable no-bitwise */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Animated } from 'react-native';
import { baseDefaultProps, basePropTypes } from './config';

export default class AnimatedText extends React.PureComponent {
  static propTypes = basePropTypes;

  static defaultProps = baseDefaultProps;

  constructor(props) {
    super(props);

    this.state = {
      magicValue: new Animated.Value(1),
      originStr: props.text,
      str: props.text,
    };
  }

  componentDidMount() {
    this.state.magicValue.addListener(({ value }) => {
      const { originStr } = this.state;
      const len = originStr.length;
      if (len === 0) return;
      const currentStrIndex = ~~(len * value);
      const str = originStr.substr(0, currentStrIndex);
      this.setState({ str });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.animateStart(nextProps);
    }
  }

  animateStart = props => {
    const { text, animateType, animateConfig } = props;
    const { magicValue } = this.state;

    Animated[animateType](magicValue, {
      toValue: 0,
      ...animateConfig,
    }).start(() => {
      this.setState({
        originStr: text,
      });

      Animated[animateType](magicValue, {
        toValue: 1,
        ...animateConfig,
      }).start();
    });
  };

  render() {
    const { textConfig, textStyle } = this.props;
    const { str } = this.state;

    return (
      <Animated.Text style={textStyle} {...textConfig}>
        {str}
      </Animated.Text>
    );
  }
}
