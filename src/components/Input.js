import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import longhand from '@team-griffin/css-longhand';
import cssSides, { Side } from '@team-griffin/css-sides';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.A, 18),
      ...longhand('border', {
        width: 1,
        style: 'solid',
        color: '#d1d8e5',
      }),
      position: 'relative',
      display: 'block',
      width: '100%',
      cursor: 'pointer',
      color: '#4e646f',
      lineHeight: 1,
      outline: 0,
      fontSize: 14,
      transition: 'box-shadow 0.3s ease-in-out',
    },
  },
  active: {
    root: {
      boxShadow: '0 0 3px rgba(0,0,0,.2)',
    },
  },
}, {
  active: r.equals(true, props.active),
});

export const PureInput = ({
  styles,
  inputProps,
}) => (
  <input
    style={styles.root}
    {...inputProps}
  />
);

export const enhance = compose(
  setDisplayName('Input'),
  defaultProps({
    type: 'text',
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    inputProps: r.omit([
      'active',
    ], ownerProps),
  })),
);

export default enhance(PureInput);
