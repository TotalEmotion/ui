import React from 'react';
import reactCSS from 'reactcss';
import radium from 'radium';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import CompanyIcon from './CompanyIcon';
import { palette } from '../constants/css';

const stylesheet = () => {
  const bubble = {
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
    opacity: 0,
  };
  const bubble1Animation = radium.keyframes({
    '0%': {
      opacity: 0,
      bottom: 0,
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
        paddingTop: 25,
        marginBottom: 25,
        position: 'relative',
      },
      bubble1: {
        ...bubble,
        left: 0,
        width: 8,
        height: 8,
        backgroundColor: palette.primaryGradient,
        animation: 'x 1.3s ease 0s infinite',
        animationName: bubble1Animation,
      },
      bubble2: {
        ...bubble,
        left: '50%',
        marginLeft: -10,
        width: 16,
        height: 16,
        backgroundColor: '#ccdcfd',
        animation: 'x 1.9s ease 0.5s infinite',
        animationName: bubble2Animation,
      },
      bubble3: {
        ...bubble,
        right: 0,
        width: 12,
        height: 12,
        backgroundColor: '#4839d8',
        animation: 'x 1.6s ease 0.2s infinite',
        animationName: bubble3Animation,
      },
    },
  });
};

export const PureProcessingIcon = ({
  styles,
}) => (
  <div style={styles.root}>
    <div style={styles.bubbleWrap}>
      <span style={styles.bubble1}/>
      <span style={styles.bubble2}/>
      <span style={styles.bubble3}/>
      <div style={styles.icon}>
        <CompanyIcon size={60}/>
      </div>
    </div>
    <p style={styles.text}>{'Nearly there!'}</p>
  </div>
);

export const enhance = compose(
  setDisplayName('ProcessingIcon'),
  radium,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureProcessingIcon);
