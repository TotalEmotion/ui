import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import { srOnly } from '../helpers/css';
import r from 'ramda';

export const Kind = {
  JOY: 'JOY',
  SURPRISE: 'SURPRISE',
  NEGATIVE: 'NEGATIVE',
  ATTENTION: 'ATTENTION',
};

const stylesheet = ({
  on,
  kind,
}) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.Y, 15),
      ...cssSides('margin', Side.X, 25),
      ...longhand('border', {
        bottomWidth: 3,
        bottomStyle: 'solid',
        bottomColor: 'transparent',
      }),
      cursor: 'pointer',
      color: '#555555',
      fontSize: 14,
      lineHeight: 1,
      textTransform: 'uppercase',
      fontWeight: 600,
      textAlign: 'center',
      transition: `
        color, 0.3s ease-in-out,
        border-bottom-color 0.3s ease-in-out
      `,
    },
    input: {
      ...srOnly,
    },
  },
  on: {
    root: {
      borderBottomColor: r.cond([
        [ r.equals(Kind.JOY), r.always(palette.clearBlue) ],
        [ r.equals(Kind.SURPRISE), r.always(palette.orange) ],
        [ r.equals(Kind.NEGATIVE), r.always(palette.red) ],
        [ r.equals(Kind.ATTENTION), r.always(palette.jadeGreen) ],
        [ r.T, r.always(palette.clearBlue) ],
      ])(kind),
    },
  },
  off: {
    root: {
      opacity: 0.5,
    },
  },
}, {
  on: r.equals(on, true),
  off: r.equals(on, false),
});

export const PureTextToggle = ({
  styles,
  on,
  text,
  ...inputProps
}) => (
  <label
    style={styles.root}
    htmlFor={inputProps.id}
  >
    {text}
    <input
      type="checkbox"
      style={styles.input}
      checked={on}
      {...inputProps}
    />
  </label>
);

export const enhance = compose(
  setDisplayName('TextToggle'),
  defaultProps({
    on: false,
    kind: Kind.JOY,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureTextToggle);
