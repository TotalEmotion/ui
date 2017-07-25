import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import cssSides, { Side } from '@team-griffin/css-sides';
import { palette } from '../constants/css';
import r from 'ramda';

export const Status = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  OK: 'OK',
};

const stylesheet = ({
  status,
}) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.A, 10),
      color: '#ffffff',
      marginBottom: 0,
      boxShadow: '0 0 3px rgba(0,0,0,.5)',
    },
    icon: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 24,
      height: 24,
      marginRight: 15,
      backgroundColor: '#fff',
      borderRadius: 16,
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'middle',
      fontWeight: 300,
      fontSize: 16,
    },
  },
  error: {
    root: {
      backgroundColor: palette.red,
    },
    icon: {
      color: palette.red,
    },
  },
  warning: {
    root: {
      backgroundColor: palette.amber,
    },
    icon: {
      color: palette.amber,
    },
  },
  ok: {
    root: {
      backgroundColor: palette.green,
    },
    icon: {
      color: palette.green,
    },
  },
}, {
  error: r.equals(status, Status.ERROR),
  warning: r.equals(status, Status.WARNING),
  ok: r.equals(status, Status.OK),
});

export const PureNotice = ({
  styles,
  text,
  status,
}) => (
  <div
    style={styles.root}
  >
    <span style={styles.icon}>
      {r.cond([
        [ r.equals(Status.ERROR), r.always('!') ],
        [ r.equals(Status.WARNING), r.always('?') ],
        [ r.equals(Status.OK), r.always('\u2714') ],
        [ r.T, r.always('') ],
      ])(status)}
    </span>
    <span style={styles.text}>
      {text}
    </span>
  </div>
);

export const enhance = compose(
  setDisplayName('Notice'),
  defaultProps({
    status: Status.OK,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureNotice);
