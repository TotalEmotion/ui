import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import CompanyLogo from './CompanyLogo';
import { palette } from '../constants/css';

const stylesheet = () => reactCSS({
  default: {
    root: {
      backgroundColor: palette.tertiary,
      paddingTop: 45,
      paddingBottom: 100,
      color: '#767d80',
      textAlign: 'center',
      fontSize: 11,
    },
    logo: {
      display: 'inline-block',
      marginBottom: 20,
    },
  },
});

export const PureFooter = ({
  styles,
  year,
}) => (
  <div style={styles.root}>
    <div style={styles.logo}>
      <CompanyLogo
        height={25}
        fill="#ffffff"
      />
    </div>
    <p>{`\u00A9 ${year} All rights reserved &mdash; US patents pending.`}</p>
  </div>
);

export const enhance = compose(
  setDisplayName('Footer'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    year: new Date().getFullYear(),
  })),
);

export default enhance(PureFooter);
