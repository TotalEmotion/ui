import React from 'react';
import { storiesOf } from '@storybook/react';
import ProcessingIcon from '../ProcessingIcon';
import { number, text } from '@storybook/addon-knobs';

storiesOf('Processing Icon', module)
  .add('default', () => {
    return (
      <div style={{marginTop:60}}>
        <ProcessingIcon
          size={number('Size', 60)}
          text={text('Text', 'Nearly there!')}
        />
      </div>
    );
  });
