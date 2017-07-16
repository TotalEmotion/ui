import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import { InlineSVG } from '@team-griffin/react-inline-svg';
import companyLogo from '!svg-inline-loader!../assets/logo-full.svg';

const stylesheet = ({
  width,
  height,
  fill,
}) => reactCSS({
  default: {
    root: {
      display: 'inline-block',
      width: width,
      height: height,
      fill: fill,
    },
  },
});

export const PureProgress = ({
  styles,
}) => (
  <div style={styles.root}>
    <InlineSVG src={companyLogo}/>
  </div>
);

export const enhance = compose(
  setDisplayName('CompanyLogo'),
  defaultProps({
    height: 50,
    fill: '#ffffff',
  }),
  withProps((ownerProps) => ({
    // aspect ratio of SVG: 6.8:1
    width: ownerProps.height * 6.8,
  })),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureProgress);
