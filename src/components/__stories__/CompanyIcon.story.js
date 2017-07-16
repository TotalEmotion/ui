import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, color } from '@storybook/addon-knobs';
import CompanyIcon from '../CompanyIcon';

storiesOf('Company Icon', module)
  .add('default', () => {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <CompanyIcon
          size={number('Size (px square)', 32)}
          fill={color('Color', '#2979ff')}
        />
      </div>
    );
  });
