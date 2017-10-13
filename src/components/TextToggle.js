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
      ...cssSides('padding', Side.A, 10),
      ...cssSides('margin', Side.X, 15),
      borderRadius: 3,
      marginBottom: 0,
      cursor: 'pointer',
      color: palette.greyishBrown,
      fontSize: 14,
      lineHeight: 1,
      textTransform: 'uppercase',
      fontWeight: 600,
      textAlign: 'center',
      backgroundColor: 'transparent',
      transition: `
        color, 0.3s ease-in-out,
        background-color 0.3s ease-in-out
      `,
    },
    input: {
      ...srOnly,
    },
  },
  joy: {
    root: {
      color: palette.clearBlue,
    },
  },
  surprise: {
    root: {
      color: palette.orange,
    },
  },
  negative: {
    root: {
      color: palette.red,
    },
  },
  attention: {
    root: {
      color: palette.jadeGreen,
    },
  },
  on: {
    root: {
      color: '#fff',
      backgroundColor: r.cond([
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
      opacity: 0.8,
    },
  },
}, {
  joy: r.equals(Kind.JOY, kind),
  surprise: r.equals(Kind.SURPRISE, kind),
  negative: r.equals(Kind.NEGATIVE, kind),
  attention: r.equals(Kind.ATTENTION, kind),
  off: r.equals(on, false),
  on: r.equals(on, true),
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
