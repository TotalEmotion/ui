import React from 'react';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import reactCSS from 'reactcss';
import { Style } from 'radium';
import Modal from 'react-modal';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import color from 'color';
import r from 'ramda';

const stylesheet = () => reactCSS({
  // https://github.com/reactjs/react-modal#styles
  default: {
    overlay: {
      // styles need to be handled in the radium <Style/>
      // as we need to hook into the react-modal CSS classes
      // to do the transitions
      backgroundColor: null,
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    content: {
      boxShadow: `0 0 20px 0 ${palette.dark}`,
      ...longhand('border', {
        width: 0,
        radius: 0,
      }),
      ...cssSides('padding', Side.A, 0),
      backgroundColor: '#ffffff',
      marginBottom: 40, // allow for scroll
    },
  },
});

// Separate stylesheet to handle making the 'pure css/classes' version
// We still adhere to the reactCSS naming convention but this is just a
// function that returns an object
const reactModalStylesheet = ({
  outSpeed,
}) => {
  return {
    default: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      content: {
        opacity: 0,
        transform: 'scale(0.95)',
      },
    },
    afterOpen: {
      body: {
        overflow: 'hidden',
      },
      overlay: {
        backgroundColor: color(palette.darkSlateBlue).alpha(0.9),
        transition: 'background-color 500ms ease-in-out',
      },
      content: {
        transform: 'scale(1)',
        opacity: 1,
        transition: `
          transform 300ms ease-in-out 100ms,
          opacity 300ms ease-in-out 100ms
        `,
      },
    },
    beforeClose: {
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        transition: 'background-color 300ms ease-in-out',
      },
      content: {
        transform: 'scale(0.95)',
        opacity: 0,
        transition: `
          transform ${outSpeed}ms ease-in-out,
          opacity ${outSpeed}ms ease-in-out
        `,
      },
    },
  };
};

const createModalStyles = (stylesheet) => (
  <Style
    rules={{
      '.ReactModal__Body--open': stylesheet.afterOpen.body,
      '.ReactModal__Overlay': stylesheet.default.overlay,
      '.ReactModal__Overlay--after-open': stylesheet.afterOpen.overlay,
      '.ReactModal__Overlay--before-close': stylesheet.beforeClose.overlay,
      '.ReactModal__Content': stylesheet.default.content,
      '.ReactModal__Content--after-open': stylesheet.afterOpen.content,
      '.ReactModal__Content--before-close': stylesheet.beforeClose.content,
    }}
  />
);

export const PureModal = ({
  styles,
  reactModalStyles,
  children,
  modalProps,
}) => (
  <div>
    {reactModalStyles}
    <Modal
      style={{
        overlay: styles.overlay,
        content: styles.content,
      }}
      {...modalProps}
    >
      {children}
    </Modal>
  </div>
);

export const enhance = compose(
  setDisplayName('Modal'),
  defaultProps({
    isOpen: false,
    contentLabel: 'Modal',
    shouldCloseOnOverlayClick: true,
    closeTimeoutMS: 300,
    outSpeed: 200,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    reactModalStyles: createModalStyles(reactModalStylesheet(ownerProps)),
    modalProps: r.pick([
      'isOpen',
      'onAfterOpen',
      'onRequestClose',
      'closeTimeoutMS',
      'contentLabel',
      'shouldCloseOnOverlayClick',
      'outSpeed',
    ], ownerProps),
  })),
);

export default enhance(PureModal);
