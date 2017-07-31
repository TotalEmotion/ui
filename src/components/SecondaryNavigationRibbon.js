import React from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import { NavLink } from 'react-router-dom';
import { createResponsiveConnect } from 'react-matchmedia-connect';
import { breakpoints, palette } from '../constants/css';
import longhand from '@team-griffin/css-longhand';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      whiteSpace: 'nowrap',
      backgroundColor: palette.jadeGreen,
      color: '#ffffff',
      overflow: 'hiden',
    },
    links: {
      listStyle: 'none',
      paddingLeft: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -10,
      marginRight: -10,
      marginBottom: 0,
    },
    navItem: {
      paddingLeft: 10,
      paddingRight: 10,
      textTransform: 'uppercase',
      WebkitFontSmoothing: 'antialiased',
    },
    link: {
      display: 'block',
      color: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      fontSize: 14,
      lineHeight: 1,
      fontWeight: 600,
      textDecoration: 'none',
      transition: `
        border-bottom-color 0.2s ease-in-out,
        color 0.2s ease-in-out
      `,
      ...longhand('padding', {
        top: 15,
        bottom: 12,
        left: 5,
        right: 5,
      }),
      ...longhand('borderBottom', {
        color: 'transparent',
        width: 3,
        style: 'solid',
      }),
    },
    linkActive: {
      color: 'rgba(255, 255, 255, 1)',
      borderBottomColor: '#fff',
      textDecoration: 'none',
    },
  },
  hover: {
    link: {
      color: 'rgba(255, 255, 255, 1)',
      textDecoration: 'none',
    },
    linkActive: {
      textDecoration: 'none',
    },
  },
  medium: {
    links: {
      marginRight: -15,
      marginLeft: -15,
    },
    navItem: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  large: {
    links: {
      marginLeft: -30,
      marginRight: -30,
    },
    navItem: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
}, {
  medium: props.isMinSm,
  large: props.isMinMd,
}, props);

const PureSecondaryNavigationLink = ({
  styles,
  href,
  text,
}) => (
  <NavLink
    to={href}
    style={styles.link}
    activeStyle={styles.linkActive}
  >
    {text}
  </NavLink>
);

export const SecondaryNavigationLink = compose(
  setDisplayName('SecondaryNavigationLink'),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
)(PureSecondaryNavigationLink);

export const PureSecondaryNavigation = ({
  styles,
  links,
}) => (
  <nav style={styles.root}>
    <ul style={styles.links}>
      {r.map((link) => (
        <li
          key={link.href}
          style={styles.navItem}
        >
          <SecondaryNavigationLink {...link}/>
        </li>
      ), links)}
    </ul>
  </nav>
);

const connect = createResponsiveConnect(breakpoints);

export const enhance = compose(
  setDisplayName('SecondaryNavigation'),
  connect([
    'isMinSm',
    'isMinMd',
  ]),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureSecondaryNavigation);
