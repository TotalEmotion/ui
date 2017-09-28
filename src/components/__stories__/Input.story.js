import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Input, { Status } from '../Input';

storiesOf('Input', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Input
          onChange={() => console.log('changed')}
          active={boolean('Active', false)}
          status={select('Status', Status, Status.OK)}
        />
      </div>
    );
  });
