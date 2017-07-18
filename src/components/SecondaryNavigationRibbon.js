import React from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  withHandlers,
} from 'recompose';
import { createResponsiveConnect } from 'react-matchmedia-connect';
import { breakpoints, palette } from '../constants/css';
import longhand from '@team-griffin/css-longhand';
import cssSides, { Side } from '@team-griffin/css-sides';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      whiteSpace: 'nowrap',
      backgroundColor: palette.secondary,
      color: '#ffffff',
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
    link: {
      paddingLeft: 10,
      paddingRight: 10,
      textTransform: 'uppercase',
      WebkitFontSmoothing: 'antialiased',
    },
    anchor: {
      display: 'block',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: 12,
      lineHeight: 1,
      fontWeight: 'bold',
      transition: 'border-bottom-color 0.2s ease-in-out',
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
  },
  hover: {
    anchor: {
      textDecoration: 'none',
    },
  },
  medium: {
    links: {
      marginRight: -15,
      marginLeft: -15,
    },
    link: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  large: {
    links: {
      marginLeft: -30,
      marginRight: -30,
    },
    link: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
  active: {
    anchor: {
      borderBottomColor: '#fff',
    },
  },
}, {
  medium: props.isMinSm,
  large: props.isMinMd,
  active: props.isActive,
}, props);

const PureSecondaryNavigationLink = ({
  styles,
  href,
  text,
}) => (
  <a
    href={href}
    style={styles.anchor}
  >
    {text}
  </a>
);

export const SecondaryNavigationLink = compose(
  setDisplayName('SecondaryNavigationLink'),
  hover,
  withProps((ownerProps) => ({
    isActive: r.equals(ownerProps.active, true),
  })),
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
          style={styles.link}
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
