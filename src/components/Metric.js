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
      textAlign: 'center',
    },
    name: {
      display: 'block',
      fontSize: 12,
      color: '#b5b5b9',
      marginBottom: 5,
    },
    result: {
      display: 'block',
      color: palette.primaryLight,
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1,
    },
  },
});

export const PureMetric = ({
  styles,
  name,
  result,
}) => (
  <div style={styles.root}>
    <span style={styles.name}>
      {name}
    </span>
    <span style={styles.result}>
      {result}
    </span>
  </div>
);

export const enhance = compose(
  setDisplayName('Metric'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureMetric);
