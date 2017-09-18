import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import { palette } from '../constants/css';
import r from 'ramda';

const stylesheet = ({
  size,
  fill1Degrees,
  fill2Degrees,
  value,
}) => reactCSS({
  default: {
    root: {
      position: 'relative',
      height: size,
      width: size,
      overflow: 'hidden',
      borderRadius: (size / 2),
      ...(value < 50) ? {
        backgroundColor: palette.donutBlue,
      } : {
        backgroundColor: palette.grey,
      },
    },
    fill1: {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      clip: `rect(0 ${size}px ${size / 2}px 0)`,
      transform: `rotate(${fill1Degrees}deg)`,
      ...(value < 50) ? {
        backgroundColor: palette.grey,
      } : {
        backgroundColor: palette.donutBlue,
      },
    },
    fill2: {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      clip: `rect(0 ${size / 2}px ${size}px 0)`,
      transform: `rotate(${fill2Degrees}deg)`,
      ...(value < 50) ? {
        backgroundColor: palette.grey,
      } : {
        backgroundColor: palette.donutBlue,
      },
    },
    mask: {
      position: 'absolute',
      display: 'block',
      top: (size / 10),
      bottom: (size / 10),
      left: (size / 10),
      right: (size / 10),
      borderRadius: '50%',
      backgroundColor: 'white',
    },
  },
});

export const PureDonut = ({
  styles,
}) => (
  <div style={styles.root}>
    <div style={styles.fill1}/>
    <div style={styles.fill2}/>
    <div style={styles.mask}/>
  </div>
);

export const enhance = compose(
  setDisplayName('Donut'),
  defaultProps({
    value: 0,
    size: 50,
  }),
  withProps((ownerProps) => ({
    fill1Degrees: r.ifElse(
      r.lt(r.__, 50),
      r.always(ownerProps.value / 100 * 360 + 90),
      r.always(90),
    )(ownerProps.value),
    fill2Degrees: r.ifElse(
      r.lt(r.__, 50),
      r.always(0),
      r.always(ownerProps.value / 100 * 360),
    )(ownerProps.value),
  })),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureDonut);
