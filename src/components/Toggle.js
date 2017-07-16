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
  checked,
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
      backgroundColor: palette.primary,
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
  enabled: {
    switch: {
      left: 16,
    },
  },
  disabled: {
    switch: {
      left: 0,
      backgroundColor: '#aab2b5',
    },
  },
}, {
  enabled: r.equals(checked, true),
  disabled: r.equals(checked, false),
});

export const PureToggle = ({
  styles,
  checked,
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
      checked={checked}
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
    checked: false,
  }),
);

export default enhance(PureToggle);
