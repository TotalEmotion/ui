import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import { palette } from '../constants/css';

const stylesheet = () => reactCSS({
  default: {
    root: {
      textAlign: 'center',
    },
    name: {
      display: 'block',
      fontSize: 14,
      fontWeight: 400,
      color: palette.clearBlue,
      marginBottom: 0,
    },
    result: {
      display: 'block',
      color: palette.biscay,
      fontSize: 42,
      fontWeight: 300,
      lineHeight: 1,
    },
    suffix: {
      fontSize: 24,
    },
  },
});

export const PureMetric = ({
  styles,
  name,
  result,
  suffix,
}) => (
  <div style={styles.root}>
    <span style={styles.name}>
      {name}
    </span>
    <span style={styles.result}>
      {result}
      <span style={styles.suffix}>
        {suffix}
      </span>
    </span>
  </div>
);

export const enhance = compose(
  setDisplayName('Metric'),
  defaultProps({
    suffix: '%',
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureMetric);
