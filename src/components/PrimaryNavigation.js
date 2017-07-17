import React from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  withHandlers,
} from 'recompose';
import { palette } from '../constants/css';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
    },
    links: {
      listStyle: 'none',
      paddingLeft: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    link: {
      marginLeft: 60,
      textTransform: 'uppercase',
    },
    anchor: {
      color: '#737acb',
      cursor: 'pointer',
      fontSize: 13,
      lineHeight: 1,
      fontWeight: 'bold',
      transition: 'color 0.2s ease-in-out',
    },
    button: {
      color: '#737acb',
      cursor: 'pointer',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      fontSize: 13,
      lineHeight: 1,
      fontWeight: 'bold',
      transition: 'color 0.2s ease-in-out',
      outline: 0,
    },
  },
  hover: {
    anchor: {
      color: '#949ae2',
      textDecoration: 'none',
    },
    button: {
      color: '#949ae2',
    },
  },
}, props);

export const PureNavigationLink = r.ifElse(
  r.propEq('component', 'button'),
  ({
    styles,
    handleClick,
    text,
  }) => (
    <button
      type="button"
      onClick={handleClick}
      style={styles.button}
    >
      {text}
    </button>
  ),
  ({
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
  )
);

export const NavigationItem = compose(
  setDisplayName('NavigationLink'),
  hover,
  withProps((ownerProps) => ({
    component: r.ifElse(
      r.isNil,
      r.always('a'),
      r.always('button'),
    )(ownerProps.onClick),
    styles: stylesheet(ownerProps),
  })),
  withHandlers({
    handleClick: ({
      onClick,
    }) => (e) => {
      e.preventDefault();
      onClick();
    },
  }),
)(PureNavigationLink);

export const PurePrimaryNavigation = ({
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
          <NavigationItem
            {...link}
          />
        </li>
      ), links)}
    </ul>
  </nav>
);

export const enhance = compose(
  setDisplayName('PrimaryNavigation'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PurePrimaryNavigation);
