import React from 'react';
import { storiesOf } from '@storybook/react';
import PrimaryNavigation from '../PrimaryNavigation';
import Button from '../Button';

storiesOf('Primary Navigation', module)
  .add('default', () => {
    return (
      <div style={{ background: '#444', padding: 20}}>
        <PrimaryNavigation
          links={[
            (<a key="foo">ddd</a>),
            (<a key="2" href="/account">Account</a>),
            (<Button key="3" onClick={() => console.log('out')}>Log out</Button>)
          ]}
        />
      </div>
    );
  });
