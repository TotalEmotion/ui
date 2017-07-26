import React from 'react';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import VideoPreview from '../VideoPreview';

storiesOf('Video Preview', module)
  .add('default', () => {
    const image = {
      '//placebeyonce.com/360-200': 'included',
      '': 'none',
    };

    return (
      <div style={{padding: 20}}>
        <div style={{width: 360, height: 200}}>
          <VideoPreview
            src={select('Image', image, '')}
          />
        </div>
      </div>
    );
  });
