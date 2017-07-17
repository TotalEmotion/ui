import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../Header';

storiesOf('Header', module)
  .add('default', () => {
    return (
      <Header
        logoSize={40}
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
