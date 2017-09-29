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
import UserActions from './UserActions';
import { createResponsiveConnect } from 'react-matchmedia-connect';
import { breakpoints } from '../constants/css';
import cssSides, { Side } from '@team-griffin/css-sides';

const stylesheet = ({
  isMinSm,
  isMinMd,
}) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.A, 20),
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 10,
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
    },
    user: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  medium: {
    root: {
      ...cssSides('padding', Side.Y, 30),
    },
    logo: {
      marginBottom: 20,
    },
  },
  large: {
    root: {
      ...cssSides('padding', Side.Y, 45),
    },
    nav: {
      justifyContent: 'center',
    },
    user: {
      justifyContent: 'flex-end',
    },
    logo: {
      marginBottom: 0,
      justifyContent: 'flex-start',
    },
  },
}, {
  medium: isMinSm,
  large: isMinMd,
});

export const PureHeader = ({
  styles,
  links,
  actions,
  logoSize,
}) => (
  <Masthead>
    <header style={styles.root}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4 col-12">
            <div style={styles.logo}>
              <CompanyLogo
                height={logoSize}
                fill="#ffffff"
              />
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div style={styles.nav}>
              <PrimaryNavigation
                links={links}
              />
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div style={styles.user}>
              <UserActions
                actions={actions}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
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
