/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes, Text } from 'react-native';
import AnimatedText from './animate-text';
import AnimatedNumber from './animate-number';
import splitStringByNumber from './splitTextByNumber';
import { baseDefaultProps, basePropTypes } from './config';

const MagicText = ({ text, duration, style, textStyle, animateConfig, ...rest }) => (
  <View style={[styles.animateContainer, style]}>
    {splitStringByNumber(text).map((it, _idx) => {
      const isString = typeof it === 'string';
      const Item = isString ? AnimatedText : AnimatedNumber;
      const key = `${it}${_idx}`;
      return (
        <Item
          key={key}
          text={it}
          style={styles.contentText}
          textStyle={textStyle}
          animateConfig={{
            duration,
            useNativeDriver: true,
            ...animateConfig
          }}
          {...rest}
        />
      );
    })}
  </View>
);

MagicText.propTypes = {
  text: PropTypes.string,
  duration: PropTypes.number,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  animateType: basePropTypes.animateType,
  animateConfig: basePropTypes.animateConfig,
  textConfig: basePropTypes.animateConfig,
};

MagicText.defaultProps = {
  text: '',
  duration: 300,
  style: null,
  textStyle: null,
  animateType: baseDefaultProps.animateType,
  animateConfig: baseDefaultProps.animateConfig,
  textConfig: baseDefaultProps.animateConfig,
};

const styles = StyleSheet.create({
  animateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '500',
  },
});

export default MagicText;
