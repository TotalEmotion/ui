import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Notice, { Status } from '../Notice';

storiesOf('Notice', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Notice
          status={select('Status', Status, Status.ERROR)}
          text="Notice text"
        />
      </div>
    );
  });
