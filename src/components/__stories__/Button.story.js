import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Button, { Kind } from '../Button';

storiesOf('Button', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Button
          kind={select('Kind', Kind, Kind.PRIMARY)}
        >
          {'Schedule free demo'}
        </Button>
      </div>
    );
  });
