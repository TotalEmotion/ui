import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import { palette } from '../constants/css';

const stylesheet = () => reactCSS({
  default: {
    root: {
      color: palette.slate,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: 0,
    },
  },
});

export const PureLabel = ({
  styles,
  children,
  htmlFor,
}) => (
  <label
    style={styles.root}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

export const enhance = compose(
  setDisplayName('Label'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureLabel);
