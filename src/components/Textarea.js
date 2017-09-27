import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import longhand from '@team-griffin/css-longhand';
import cssSides, { Side } from '@team-griffin/css-sides';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.A, 10),
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
      lineHeight: 1.3,
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

export const PureTextarea = ({
  styles,
  children,
  value,
  inputProps,
}) => (
  <textarea
    style={styles.root}
    {...inputProps}
  >
    {value || children}
  </textarea>
);

export const enhance = compose(
  setDisplayName('Textarea'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    inputProps: r.omit([
      'active',
    ], ownerProps),
  })),
);

export default enhance(PureTextarea);
