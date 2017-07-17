import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
} from 'recompose';
import Masthead from './Masthead';
import CompanyLogo from './CompanyLogo';
import PrimaryNavigation from './PrimaryNavigation';
import { createResponsiveConnect } from 'react-matchmedia-connect';
import { breakpoints } from '../constants/css';

const stylesheet = ({
  isMinSm,
  isMinMd,
}) => reactCSS({
  default: {
    logo: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 30,
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  medium: {
    logo: {
      marginBottom: 0,
    },
    nav: {
      justifyContent: 'flex-end',
    },
  },
}, {
  medium: isMinSm,
  large: isMinMd,
});

export const PureHeader = ({
  styles,
  links,
  logoSize,
}) => (
  <Masthead>
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-sm-6">
          <div style={styles.logo}>
            <CompanyLogo
              height={logoSize}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div style={styles.nav}>
            <PrimaryNavigation
              links={links}
            />
          </div>
        </div>
      </div>
    </div>
  </Masthead>
);

const connect = createResponsiveConnect(breakpoints);

export const enhance = compose(
  setDisplayName('Header'),
  connect([
    'isMinSm',
    'isMinMd',
  ]),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureHeader);
