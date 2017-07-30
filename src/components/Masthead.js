import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import { palette } from '../constants/css';

const stylesheet = () => reactCSS({
  default: {
    root: {
      backgroundImage: `
        linear-gradient(
          to right,
          ${palette.clearBlue},
          ${palette.sapphire}
        )
      `,
    },
  },
});

export const PureMasthead = ({
  styles,
  children,
}) => (
  <div style={styles.root}>
    {children}
  </div>
);

export const enhance = compose(
  setDisplayName('Masthead'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureMasthead);
