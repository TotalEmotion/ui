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
  value,
  max,
  disabled,
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
      transition: `
        width 0.3s ease-in-out,
        background-color 0.3s ease-in-out
      `,
    },
  },
  muted: {
    progress: {
      backgroundColor: palette.coolGrey,
    },
  },
}, {
  muted: r.equals(disabled, true),
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
    disabled: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureProgress);
