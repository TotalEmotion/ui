import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import r from 'ramda';
import { palette } from '../constants/css';

const stylesheet = ({
  on,
}) => reactCSS({
  default: {
    root: {
      display: 'block',
      cursor: 'pointer',
    },
    track: {
      position: 'relative',
      backgroundColor: palette.grey,
      width: 32,
      height: 6,
      borderRadius: 16,
    },
    switch: {
      position: 'absolute',
      top: -5,
      backgroundColor: palette.clearBlue,
      width: 16,
      height: 16,
      borderRadius: 8,
      transition: '0.2s left ease-in-out, 0.2s background-color ease-in-out',
    },
    input: {
      visibility: 'hidden',
      position: 'absolute',
    },
  },
  on: {
    switch: {
      left: 16,
    },
  },
  off: {
    switch: {
      left: 0,
      backgroundColor: palette.coolGrey,
    },
  },
}, {
  on: r.equals(on, true),
  off: r.equals(on, false),
});

export const PureToggle = ({
  styles,
  on,
  ...inputProps
}) => (
  <label
    style={styles.root}
    htmlFor={inputProps.id}
  >
    <div style={styles.track}>
      <span style={styles.switch}/>
    </div>
    <input
      style={styles.input}
      type="checkbox"
      checked={on}
      {...inputProps}
    />
  </label>
);

export const enhance = compose(
  setDisplayName('Toggle'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
  defaultProps({
    on: false,
  }),
);

export default enhance(PureToggle);
