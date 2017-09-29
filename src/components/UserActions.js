import React, { cloneElement } from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  withState,
  withHandlers,
} from 'recompose';
import { InlineSVG } from '@team-griffin/react-inline-svg';
import { palette, typography } from '../constants/css';
import r from 'ramda';
import cssSides, { Side } from '@team-griffin/css-sides';
import userIcon from '!svg-inline-loader!../assets/clapperboard-icon.svg';
import arrow from '!svg-inline-loader!../assets/arrow.svg';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      position: 'relative',
      display: 'inline-block',
    },
    button: {
      outline: 0,
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 25,
      cursor: 'pointer',
    },
    avatar: {
      width: 32,
      height: 32,
      display: 'inline-block',
      fill: '#fff',
      verticalAlign: 'middle',
    },
    arrow: {
      width: 32,
      height: 32,
      display: 'inline-block',
      fill: '#fff',
      verticalAlign: 'middle',
      transition: 'transform 0.2s ease-in-out',
    },
    popout: {
      minWidth: 250,
      backgroundColor: '#fff',
      borderRadius: 5,
      ...cssSides('padding', Side.A, 20),
      position: 'absolute',
      top: '100%',
      marginTop: 15,
      right: 0,
    },
    caret: {
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid white',
      position: 'absolute',
      top: -10,
      right: 20,
    },
    actions: {
      textAlign: 'center',
      listStyle: 'none',
      ...cssSides('padding', Side.A, 0),
      ...cssSides('margin', Side.A, 0),
    },
    action: {
      marginBottom: 10,
    },
    link: {
      color: palette.biscay,
      fontFamily: typography.fontFamily,
      backgroundColor: 'transparent',
      fontSize: 14,
      borderWidth: 0,
      outline: 0,
      cursor: 'pointer',
      ...cssSides('padding', Side.A, 0),
    },
  },
  hover: {
    link: {
      textDecoration: 'underline',
    },
  },
  open: {
    arrow: {
      transform: 'rotate(180deg)',
    },
  },
}, {
  open: r.equals(props.open, true),
}, props);

export const PureUserAction = ({
  action,
  styles,
}) => cloneElement(action, {
  style: styles.link,
});

export const UserAction = compose(
  setDisplayName('UserAction'),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
)(PureUserAction);

export const PureUserActions = ({
  styles,
  open,
  handleToggleClick,
  actions,
}) => (
  <div style={styles.root}>
    <button
      type="button"
      style={styles.button}
      onClick={handleToggleClick}
    >
      <span style={styles.avatar}>
        <InlineSVG src={userIcon}/>
      </span>
      <span style={styles.arrow}>
        <InlineSVG src={arrow}/>
      </span>
    </button>
    {r.when(
      r.equals(true),
      () => (
        <nav style={styles.popout}>
          <span style={styles.caret}/>
          <ul style={styles.actions}>
            {r.map((action) => (
              <li
                style={styles.action}
                key={action.key}
              >
                <UserAction action={action}/>
              </li>
            ), actions)}
          </ul>
        </nav>
      )
    )(open)}
  </div>
);

export const enhance = compose(
  withState('open', 'setOpen', false),
  setDisplayName('UserActions'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
  withHandlers({
    handleToggleClick: ({
      setOpen,
    }) => () => setOpen((open) => !open),
  }),
);

export default enhance(PureUserActions);
