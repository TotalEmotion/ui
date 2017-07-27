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
          onClick={() => console.log('clicked')}
        >
          {'Schedule free demo'}
        </Button>
      </div>
    );
  })
  .add('as a link', () => {
    return (
      <div style={{padding: 20}}>
        <Button
          component="a"
          kind={select('Kind', Kind, Kind.PRIMARY)}
          href="emotionreader.io"
        >
          {'I\'m an <a> tag'}
        </Button>
      </div>
    );
  });
