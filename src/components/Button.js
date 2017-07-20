import React from 'react';
import PropTypes from 'prop-types';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  setPropTypes,
  defaultProps,
  withProps,
} from 'recompose';
import { palette } from '../constants/css';
import cssSides, { Side } from '@team-griffin/css-sides';
import r from 'ramda';
import color from 'color';

export const Kind = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
};

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.X, 20),
      ...cssSides('padding', Side.Y, 15),
      position: 'relative',
      display: 'inline-flex',
      cursor: 'pointer',
      borderWidth: 0,
      borderRadius: 50,
      lineHeight: 1,
      textTransform: 'uppercase',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      outline: 0,
      fontSize: 12,
      fontWeight: 600,
      WebkitFontSmoothing: 'antialiased',
      transition: 'background-color 0.2s ease-in-out',
    },
  },
  hover: {
    root: {
      // since the hover state can be different depending on the kind
      backgroundColor: r.cond([
        [ r.equals(Kind.PRIMARY), r.always(
          color(palette.secondary).lighten(0.2)
        ) ],
        [ r.equals(Kind.SECONDARY), r.always(
          color(palette.primary).lighten(0.1)
        ) ],
        [ r.T, r.always(color(palette.secondary).lighten(0.2)) ],
      ])(props.kind),
    },
  },
  primary: {
    root: {
      backgroundColor: palette.secondary,
      color: '#fff',
    },
  },
  secondary: {
    root: {
      backgroundColor: palette.primary,
      color: '#fff',
    },
  },
}, {
  primary: r.equals(props.kind, Kind.PRIMARY),
  secondary: r.equals(props.kind, Kind.SECONDARY),
}, props);

export const PureButton = ({
  styles,
  children,
  buttonProps,
}) => (
  <button
    style={styles.root}
    {...buttonProps}
  >
    {children}
  </button>
);

export const enhance = compose(
  setDisplayName('Progress'),
  setPropTypes({
    kind: PropTypes.oneOf(r.values(Kind)),
  }),
  defaultProps({
    kind: Kind.PRIMARY,
    type: 'button',
  }),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    buttonProps: r.omit([
      'hover',
      'kind',
    ], ownerProps),
  })),
);

export default enhance(PureButton);
