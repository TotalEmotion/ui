import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import Progress from '../Progress';

storiesOf('Progress', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Progress
          value={number('Value', 20)}
        />
      </div>
    );
  });
