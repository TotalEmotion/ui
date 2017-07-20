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
import companyLogoBranded from '!svg-inline-loader!../assets/logo-full-branded.svg';
import r from 'ramda';
import rA from 'ramda-adjunct/lib';

const stylesheet = ({
  width,
  height,
  fill,
  custom,
}) => reactCSS({
  default: {
    icon: {
      display: 'block',
      width: width,
      height: height,
    },
  },
  custom: {
    icon: {
      fill: fill,
    },
  },
}, {
  custom,
});

export const PureCompanyLogo = ({
  styles,
  custom,
}) => (
  <div style={styles.icon}>
    {r.ifElse(
      r.equals(true),
      r.always(<InlineSVG src={companyLogo}/>),
      r.always(<InlineSVG src={companyLogoBranded}/>)
    )(custom)}
  </div>
);

export const enhance = compose(
  setDisplayName('CompanyLogo'),
  defaultProps({
    height: 50,
  }),
  withProps((ownerProps) => ({
    custom: rA.isNotNil(ownerProps.fill),
    // aspect ratio of SVG: 6.8:1
    width: ownerProps.height * 6.8,
  })),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureCompanyLogo);
