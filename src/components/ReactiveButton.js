import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  setPropTypes,
  withProps,
  defaultProps,
} from 'recompose';
import Button, { Kind } from './Button';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import r from 'ramda';

export { Kind };

const stylesheet = (props) => {
  const loaderAnimation = radium.keyframes({
    '0%': {
      transform: 'scale(0)',
      opacity: 0,
    },
    '50%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  }, 'loader-dot-scale');

  const loaderDotStyles = {
    width: '1em',
    height: '1em',
    float: 'left',
    display: 'block', // only block elements can be animated
    ...longhand('border', {
      width: '0.2em',
      style: 'solid',
      color: '#ffffff',
      radius: '0.5em',
    }),
    ...cssSides('margin', Side.X, '0.5em'),
    transform: 'scale(0)',
    animation: 'x 1s ease infinite forwards',
    animationName: loaderAnimation,
  };

  return reactCSS({
    default: {
      text: {
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out',
      },

      loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-0.5em',
        marginLeft: '-3em',
      },

      loaderDot1: loaderDotStyles,
      loaderDot2: {
        ...loaderDotStyles,
        animationDelay: '0.3s',
      },
      loaderDot3: {
        ...loaderDotStyles,
        animationDelay: '0.6s',
      },
    },

    pending: {
      text: {
        opacity: 0,
      },
    },

    secondary: {
      loaderDot1: {
        borderColor: palette.cloudyBlue,
      },
      loaderDot2: {
        borderColor: palette.cloudyBlue,
      },
      loaderDot3: {
        borderColor: palette.cloudyBlue,
      },
    },
  }, {
    pending: r.equals(props.pending, true),
    secondary: r.equals(props.kind, Kind.SECONDARY),
  });
};

export const PureReactiveButton = ({
  styles,
  children,
  pending,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
  >
    <span style={styles.text}>
      {children}
    </span>

    {r.when(
      r.equals(true),
      r.always(
        <div style={styles.loader}>
          <span style={styles.loaderDot1}/>
          <span style={styles.loaderDot2}/>
          <span style={styles.loaderDot3}/>
        </div>
      )
    )(pending)}

  </Button>
);

export const enhance = compose(
  setDisplayName('ReactiveButton'),
  setPropTypes({
    kind: PropTypes.oneOf(r.values(Kind)),
    pending: PropTypes.bool,
  }),
  radium,
  defaultProps({
    pending: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureReactiveButton);
