import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import { InlineSVG } from '@team-griffin/react-inline-svg';
import companyIcon from '!svg-inline-loader!../assets/logo-icon.svg';

const stylesheet = ({
  size,
  fill,
}) => reactCSS({
  default: {
    root: {
      display: 'inline-block',
      height: size,
      width: size,
      fill: fill,
    },
  },
});

export const CompanyIcon = ({
  styles,
}) => (
  <div style={styles.root}>
    <InlineSVG src={companyIcon}/>
  </div>
);

export const enhance = compose(
  setDisplayName('CompanyIcon'),
  defaultProps({
    size: 32,
    fill: '#ffffff',
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(CompanyIcon);
