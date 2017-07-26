import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import ReactiveButton, { Kind } from '../ReactiveButton';

storiesOf('ReactiveButton', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <ReactiveButton
          kind={select('Kind', Kind, Kind.PRIMARY)}
          pending={boolean('Pending', false)}
          onClick={() => console.log('clicked')}
        >
          {'Schedule free demo'}
        </ReactiveButton>
      </div>
    );
  });
