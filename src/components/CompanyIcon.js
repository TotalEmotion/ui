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
import companyIconBranded from '!svg-inline-loader!../assets/logo-icon-branded.svg';
import r from 'ramda';
import rA from 'ramda-adjunct/lib';

const stylesheet = ({
  size,
  fill,
  custom,
}) => reactCSS({
  default: {
    icon: {
      display: 'inline-block',
      height: size,
      width: size,
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

export const PureCompanyIcon = ({
  styles,
  custom,
}) => (
  <div style={styles.icon}>
    {r.ifElse(
      r.equals(true),
      r.always(<InlineSVG src={companyIcon}/>),
      r.always(<InlineSVG src={companyIconBranded}/>)
    )(custom)}
  </div>
);

export const enhance = compose(
  setDisplayName('CompanyIcon'),
  defaultProps({
    size: 32,
  }),
  withProps((ownerProps) => ({
    custom: rA.isNotNil(ownerProps.fill),
  })),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureCompanyIcon);
