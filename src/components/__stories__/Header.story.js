import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../Header';

storiesOf('Header', module)
  .add('default', () => {
    return (
      <Header
        logoSize={40}
        links={[
          (<a key="1" href="/videos">Videos</a>),
          (<a key="2" href="/account">Account</a>),
          (<button key="3" onClick={() => console.log('out')}>Log out</button>)
        ]}
      />
    );
  });
