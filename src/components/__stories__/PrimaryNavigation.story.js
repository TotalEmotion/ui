import React from 'react';
import { storiesOf } from '@storybook/react';
import PrimaryNavigation from '../PrimaryNavigation';

storiesOf('Primary Navigation', module)
  .add('default', () => {
    return (
      <PrimaryNavigation
        links={[
          {
            href: '/videos',
            text: 'Videos',
          },
          {
            href: '/account',
            text: 'My Account',
          },
          {
            href: '/logout',
            text: 'Log Out',
            onClick: () => console.log('log out'),
          },
        ]}
      />
    );
  });
