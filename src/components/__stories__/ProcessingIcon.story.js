import React from 'react';
import { storiesOf } from '@storybook/react';
import ProcessingIcon from '../ProcessingIcon';

storiesOf('Processing Icon', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <ProcessingIcon/>
      </div>
    );
  });
