import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Input from '../Input';

storiesOf('Input', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Input
          onChange={() => console.log('changed')}
          active={boolean('Active', false)}
        />
      </div>
    );
  });
