import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import cssSides, { Side } from '@team-griffin/css-sides';
import { palette } from '../constants/css';

const stylesheet = () => reactCSS({
  default: {
    root: {
      marginTop: 'auto',
      backgroundColor: palette.lightGrey,
      position: 'relative',
      ...cssSides('padding', Side.A, 20),
    },
  },
});

export const PureModalFooter = ({
  styles,
  children,
}) => (
  <footer style={styles.root}>
    {children}
  </footer>
);

export const enhance = compose(
  setDisplayName('ModalFooter'),
  defaultProps({
    dismissible: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureModalFooter);
