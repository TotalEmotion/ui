import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import Donut from '../Donut';

storiesOf('Donut', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Donut
          value={number('Value', 20)}
        />
      </div>
    );
  });
