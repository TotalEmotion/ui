import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  setPropTypes,
} from 'recompose';
import { createResponsiveConnect } from 'react-matchmedia-connect';
import { breakpoints, typography } from '../constants/css';
import cssSides, { Side } from '@team-griffin/css-sides';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      whiteSpace: 'nowrap',
    },
    links: {
      listStyle: 'none',
      paddingLeft: 0,
      display: 'flex',
      alignItems: 'center',
      marginLeft: -10,
      marginRight: -10,
      marginBottom: 0,
    },
    linkWrapper: {
      paddingLeft: 10,
      paddingRight: 10,
      textTransform: 'uppercase',
      WebkitFontSmoothing: 'antialiased',
    },
    link: {
      display: 'inline-block',
      ...cssSides('padding', Side.X, 18),
      ...cssSides('padding', Side.Y, 11),
      color: 'rgba(255, 255, 255, 0.4)',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1,
      transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',
      outline: 0,
      textTransform: 'uppercase',
      fontFamily: typography.fontFamily,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 30,
      borderStyle: 'solid',
    },
  },
  hover: {
    link: {
      color: 'rgba(255, 255, 255, 0.5)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      textDecoration: 'none',
    },
  },
  medium: {
    links: {
      marginRight: -15,
      marginLeft: -15,
    },
    linkWrapper: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  large: {
    links: {
      marginLeft: -30,
      marginRight: -30,
    },
    linkWrapper: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
}, {
  medium: props.isMinSm,
  large: props.isMinMd,
}, props);

export const PureNavigationItem = ({
  link,
  styles,
}) => cloneElement(link, {
  style: styles.link,
});

export const NavigationItem = compose(
  setDisplayName('NavigationItem'),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
)(PureNavigationItem);

export const PurePrimaryNavigation = ({
  styles,
  links,
}) => (
  <nav style={styles.root}>
    <ul style={styles.links}>
      {r.map((link) => (
        <li
          key={link.key}
          style={styles.linkWrapper}
        >
          <NavigationItem link={link}/>
        </li>
      ), links)}
    </ul>
  </nav>
);

const connect = createResponsiveConnect(breakpoints);

export const enhance = compose(
  setDisplayName('PrimaryNavigation'),
  connect([
    'isMinSm',
    'isMinMd',
  ]),
  setPropTypes({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        $$typeof: PropTypes.symbol.isRequired,
      }),
    ),
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PurePrimaryNavigation);
