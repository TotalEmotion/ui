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
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import color from 'color';
import r from 'ramda';
import rA from 'ramda-adjunct';

const stylesheet = () => reactCSS({
  // https://github.com/reactjs/react-modal#styles
  default: {
    overlay: {
      // styles need to be handled in radium <Style/>
      // as we need to hook into the react-modal CSS classes
      // to do the transitions
      backgroundColor: null,
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    content: {
      // flex as ModalFooter requires anchoring to bottom
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 0 20px 0 ${palette.dark}`,
      ...longhand('border', {
        width: 0,
        radius: 0,
      }),
      ...cssSides('padding', Side.A, 0),
      backgroundColor: '#ffffff',
    },
    // if header and footer provided at props level for <Modal>
    // then we use a pre-formatted body wiht padding
    body: {
      ...longhand('padding', {
        top: 30,
        left: 30,
        right: 30,
        bottom: 50,
      }),
      fontWeight: 300,
      fontSize: 18,
      lineHeight: 1.39,
      color: palette.greyishBrown,
    },
  },
});

// Separate stylesheet to handle making the 'pure css/classes' version
// We still adhere to the reactCSS naming convention but this is just a
// function that returns an object
const reactModalStylesheet = ({
  closeTimeoutMS,
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
          transform ${closeTimeoutMS}ms ease-in-out,
          opacity ${closeTimeoutMS}ms ease-in-out
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
  children,
  styles,
  hasHeaderAndFooter,
  // react-modal
  reactModalStyles,
  modalProps,
  // header
  title,
  onCloseClick,
  dismissible,
  // footer
  footer,
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
      {r.when(
        rA.isNotNil,
        r.always(
          <ModalHeader
            onCloseClick={onCloseClick}
            dismissible={dismissible}
            title={title}
          />
        ),
      )(title)}
      {r.ifElse(
        r.equals(true),
        r.always(
          <div style={styles.body}>
            {children}
          </div>
        ),
        r.always(children)
      )(hasHeaderAndFooter)}
      {r.when(
        rA.isNotNil,
        r.always(
          <ModalFooter>
            {footer}
          </ModalFooter>
        ),
      )(footer)}
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
    ], ownerProps),
    hasHeaderAndFooter: r.all(rA.isNotNil)([
      ownerProps.title,
      ownerProps.footer,
    ]),
  })),
);

export default enhance(PureModal);
