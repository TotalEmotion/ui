import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import UserActions from '../UserActions';

storiesOf('UserActions', module)
  .add('default', () => {
    return (
      <div>
        <div style={{padding: 20, backgroundColor: '#2020a0', textAlign: 'right'}}>
          <div style={{display: 'inline-block'}}>
            <UserActions
              isOpen={boolean('Opened', false)}
              actions={[
                <a key="link" href="//google.com">Google</a>,
                <button key="button" onClick={() => console.log}>Logout</button>
              ]}
            />
          </div>
        </div>
        <div style={{height: 300, backgroundColor: '#fafafa'}}/>
      </div>
    );
  });
