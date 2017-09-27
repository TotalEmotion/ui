import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
// import { palette } from '../constants/css';
import r from 'ramda';

const stylesheet = ({
  gutter,
  borderless,
}) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.A, 20),
      ...longhand('border', {
        width: 1,
        color: '#eae8f5',
        style: 'solid',
      }),
      backgroundColor: '#ffffff',
    },
  },
  fullBleed: {
    root: {
      ...cssSides('padding', Side.A, 0),
    },
  },
  borderless: {
    root: {
      borderWidth: 0,
    },
  },
}, {
  fullBleed: r.equals(gutter, false),
  borderless: r.equals(borderless, true),
});

export const PurePanel = ({
  styles,
  children,
}) => (
  <div style={styles.root}>
    {children}
  </div>
);

export const enhance = compose(
  setDisplayName('Panel'),
  defaultProps({
    gutter: true,
    borderless: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PurePanel);
