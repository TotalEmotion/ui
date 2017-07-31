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
import longhand from '@team-griffin/css-longhand';
import r from 'ramda';
import color from 'color';

export const Kind = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  DETRIMENTAL: 'DETRIMENTAL',
};

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.X, 20),
      ...cssSides('padding', Side.Y, 12),
      position: 'relative',
      display: 'inline-flex',
      cursor: 'pointer',
      ...longhand('border', {
        width: 1,
        style: 'solid',
        radius: 50,
      }),
      minWidth: '8em', // for loading state
      lineHeight: 1,
      textTransform: 'uppercase',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      outline: 0,
      fontSize: 12,
      fontWeight: 600,
      WebkitFontSmoothing: 'antialiased',
      transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
    },
  },
  hover: {
    root: {
      textDecoration: 'none',
      // since the hover state can be different depending on the kind
      backgroundColor: r.cond([
        [ r.equals(Kind.PRIMARY), r.always(
          color(palette.jadeGreen).lighten(0.2)
        ) ],
        [ r.equals(Kind.SECONDARY), r.always(
          'transparent'
        ) ],
        [ r.equals(Kind.DETRIMENTAL), r.always(
          color(palette.red).lighten(0.2)
        ) ],
        [ r.T, r.always(color(palette.jadeGreen).lighten(0.2)) ],
      ])(props.kind),
      color: r.cond([
        [ r.equals(Kind.SECONDARY), r.always(
          color(palette.cloudyBlue).darken(0.2)
        ) ],
        [ r.T, r.always('#ffffff') ],
      ])(props.kind),
    },
  },
  primary: {
    root: {
      backgroundColor: palette.jadeGreen,
      borderColor: palette.jadeGreen,
      color: '#fff',
    },
  },
  secondary: {
    root: {
      backgroundColor: 'transparent',
      borderColor: palette.cloudyBlue,
      color: palette.cloudyBlue,
    },
  },
  detrimental: {
    root: {
      backgroundColor: palette.red,
      borderColor: palette.red,
      color: '#fff',
    },
  },
}, {
  primary: r.equals(props.kind, Kind.PRIMARY),
  secondary: r.equals(props.kind, Kind.SECONDARY),
  detrimental: r.equals(props.kind, Kind.DETRIMENTAL),
}, props);

export const PureButton = r.ifElse(
  r.propEq('component', 'a'),
  ({
    styles,
    children,
    linkProps,
  }) => (
    <a
      style={styles.root}
      {...linkProps}
    >
      {children}
    </a>
  ),
  ({
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
  ),
);

export const enhance = compose(
  setDisplayName('Button'),
  setPropTypes({
    kind: PropTypes.oneOf(r.values(Kind)),
  }),
  defaultProps({
    kind: Kind.PRIMARY,
    type: 'button',
    component: 'button',
  }),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    buttonProps: r.omit([
      'hover',
      'kind',
      'component',
    ], ownerProps),
  })),
  withProps((ownerProps) => ({
    linkProps: r.omit([
      'type',
    ], ownerProps.buttonProps),
  })),
);

export default enhance(PureButton);
