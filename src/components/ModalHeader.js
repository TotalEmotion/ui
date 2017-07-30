import React from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
  withHandlers,
} from 'recompose';
import { Heading, H } from '@team-griffin/react-heading-section';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import r from 'ramda';
import color from 'color';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      backgroundImage: `
        linear-gradient(
          to right,
          ${palette.clearBlue},
          ${palette.sapphire}
        )
      `,
      paddingTop: 25,
      paddingBottom: 25,
      position: 'relative',
    },
    title: {
      ...cssSides('padding', Side.X, '20%'),
      color: '#ffffff',
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: 16,
      lineHeight: 1.4,
      marginBottom: 0,
    },
    close: {
      position: 'absolute',
      width: 26,
      height: 26,
      right: 25,
      top: '50%',
      marginTop: -13,
      ...longhand('border', {
        radius: 13,
        width: 0,
      }),
      cursor: 'pointer',
      outline: 0,
      backgroundColor: color(palette.iceBlue).alpha(0.2),
      color: palette.powderBlue,
      fontWeight: 300,
      fontSize: 18,
      lineHeight: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.2s ease-in-out',
    },
  },
  hover: {
    close: {
      backgroundColor: color(palette.iceBlue).alpha(0.3),
    },
  },
}, props);

const PureCloseButton = r.ifElse(
  r.propEq('dismissible', true),
  ({
    styles,
    onClick,
  }) => (
    <button
      style={styles.close}
      type="button"
      onClick={onClick}
    >
      {/* × */}
      <span>{'\u00D7'}</span>
    </button>
  ),
  r.always(null)
);

const CloseButton = compose(
  setDisplayName('ModalHeaderCloseButton'),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
)(PureCloseButton);

export const PureModalHeader = ({
  styles,
  title,
  dismissible,
  handleCloseClick,
}) => (
  <header style={styles.root}>
    <Heading
      component={(
        <H style={styles.title}>
          {title}
        </H>
      )}
    />
    <CloseButton
      dismissible={dismissible}
      onClick={handleCloseClick}
    />
  </header>
);

export const enhance = compose(
  setDisplayName('ModalHeader'),
  defaultProps({
    dismissible: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
  withHandlers({
    handleCloseClick: ({
      onCloseClick,
    }) => () => onCloseClick(),
  }),
);

export default enhance(PureModalHeader);
