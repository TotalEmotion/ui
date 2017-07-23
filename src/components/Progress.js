import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import { palette } from '../constants/css';

const stylesheet = ({
  value,
  max,
}) => reactCSS({
  default: {
    root: {
      position: 'relative',
      backgroundColor: palette.grey,
      width: '100%',
      height: 4,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progress: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      height: 4,
      width: `${value}%`,
      maxWidth: `${max}%`,
      borderRadius: 2,
      backgroundColor: palette.jadeGreen,
      transition: '0.3s width ease-in-out',
    },
  },
});

export const PureProgress = ({
  styles,
}) => (
  <div style={styles.root}>
    <span style={styles.progress}/>
  </div>
);

export const enhance = compose(
  setDisplayName('Progress'),
  defaultProps({
    value: 0,
    max: 100,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureProgress);
