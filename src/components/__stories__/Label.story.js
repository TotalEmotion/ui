import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Label from '../Label';
import Input from '../Input';

storiesOf('Label', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Label>
          {'Video path'}
        </Label>
      </div>
    );
  })
  .add('with input', () => {
    return (
      <div style={{padding: 20}}>
        <Label htmlFor="videoPath">
          {'Video path'}
        </Label>
        <Input
          id="videoPath"
          onChange={() => console.log('changed')}
          active={boolean('Active', false)}
        />
      </div>
    );
  });
