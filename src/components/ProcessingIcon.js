import React from 'react';
import reactCSS from 'reactcss';
import radium from 'radium';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import CompanyIcon from './CompanyIcon';
import { palette } from '../constants/css';

const stylesheet = ({
  size,
}) => {
  const bubble = {
    position: 'absolute',
    bottom: 0,
    borderRadius: (size / 2),
    opacity: 0,
  };

  const bubble1Animation = radium.keyframes({
    '0%': {
      opacity: 0,
      bottom: 0,
    },
    '35%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      bottom: '100%',
      opacity: 0,
    },
  }, 'bubble1');
  const bubble2Animation = radium.keyframes({
    '0%': {
      bottom: 0,
      opacity: 0,
    },
    '25%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      bottom: '120%',
      opacity: 0,
    },
  }, 'bubble2');
  const bubble3Animation = radium.keyframes({
    '0%': {
      bottom: 0,
      opacity: 0,
    },
    '30%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      bottom: '110%',
      opacity: 0,
    },
  }, 'bubble1');
  return reactCSS({
    default: {
      root: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#a5b2b8',
      },
      icon: {
        position: 'relative',
        zIndex: 2, // appear above bubbles
      },
      bubbleWrap: {
        paddingTop: (size / 2.5),
        marginBottom: (size / 2.5),
        position: 'relative',
      },
      bubble1: {
        ...bubble,
        left: 0,
        width: (size / 7.5),
        height: (size / 7.5),
        backgroundColor: palette.sapphire,
        animation: 'x 1.6s ease 0s infinite',
        animationName: bubble1Animation,
      },
      bubble2: {
        ...bubble,
        left: '50%',
        marginLeft: -10,
        width: (size / 3.75),
        height: (size / 3.75),
        backgroundColor: '#ccdcfd',
        animation: 'x 2.1s ease 0.3s infinite',
        animationName: bubble2Animation,
      },
      bubble3: {
        ...bubble,
        right: 0,
        width: (size / 5),
        height: (size / 5),
        backgroundColor: '#4839d8',
        animation: 'x 1.9s ease 0.1s infinite',
        animationName: bubble3Animation,
      },
      text: {
        color: palette.coolGrey,
      },
    },
  });
};

export const PureProcessingIcon = ({
  styles,
  text,
  size,
}) => (
  <div style={styles.root}>
    <div style={styles.bubbleWrap}>
      <span style={styles.bubble1}/>
      <span style={styles.bubble2}/>
      <span style={styles.bubble3}/>
      <div style={styles.icon}>
        <CompanyIcon fill={palette.clearBlue} size={size}/>
      </div>
    </div>
    <p style={styles.text}>{text}</p>
  </div>
);

export const enhance = compose(
  setDisplayName('ProcessingIcon'),
  radium,
  defaultProps({
    text: 'Nearly there!',
    size: 60,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureProcessingIcon);
