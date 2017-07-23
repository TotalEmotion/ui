import React from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  withHandlers,
} from 'recompose';
import { createResponsiveConnect } from 'react-matchmedia-connect';
import { breakpoints, typography } from '../constants/css';
import r from 'ramda';

const linkStyles = {
  color: 'rgba(255, 255, 255, 0.4)',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  transition: 'color 0.2s ease-in-out',
  outline: 0,
  textTransform: 'uppercase',
};

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
    link: {
      paddingLeft: 10,
      paddingRight: 10,
      textTransform: 'uppercase',
      WebkitFontSmoothing: 'antialiased',
    },
    anchor: linkStyles,
    button: {
      ...linkStyles,
      fontFamily: typography.fontFamily,
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
    },
  },
  hover: {
    anchor: {
      color: 'rgba(255, 255, 255, 0.5)',
      textDecoration: 'none',
    },
    button: {
      color: 'rgba(255, 255, 255, 0.5)',
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
}, {
  medium: props.isMinSm,
  large: props.isMinMd,
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
    }) => () => onClick(),
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

const connect = createResponsiveConnect(breakpoints);

export const enhance = compose(
  setDisplayName('PrimaryNavigation'),
  connect([
    'isMinSm',
    'isMinMd',
  ]),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PurePrimaryNavigation);
