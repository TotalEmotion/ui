import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Toggle from '../Toggle';

storiesOf('Toggle', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Toggle
          on={boolean('On', false)}
        />
      </div>
    );
  });
