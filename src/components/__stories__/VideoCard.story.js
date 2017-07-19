import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import VideoCard from '../VideoCard';

storiesOf('Video Card', module)
  .add('One', () => {
    return (
      <div
        style={{
          paddingTop: 20,
        }}
      >
        <VideoCard
          selectable={boolean('Selectable', false)}
          selected={boolean('Selected', false)}
          mediaSrc={'//placebeyonce.com/500-200'}
          title="Maui By Air The Best Way Around The Island"
          date="08 Jun 2017"
        />
      </div>
    );
  })
  .add('Many', () => {
    const selectable = boolean('Selectable', false);

    return (
      <div
        style={{
          paddingTop: 20,
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <VideoCard
                selectable={selectable}
                selected={boolean('First Selected', false)}
                mediaSrc={'//placebeyonce.com/500-200'}
                title="Tips for a Healthy Clear Complexion"
                date="08 Jun 2017"
              />
            </div>
            <div className="col-sm-4">
              <VideoCard
                selectable={selectable}
                selected={boolean('Second Selected', false)}
                mediaSrc={'//placebeyonce.com/500-200'}
                title="Maui By Air The Best Way Around The Island"
                date="08 Jun 2017"
              />
            </div>
            <div className="col-sm-4">
              <VideoCard
                selectable={selectable}
                selected={boolean('Third Selected', false)}
                mediaSrc={'//placebeyonce.com/500-200'}
                title="Moon Gazing"
                date="08 Jun 2017"
              />
            </div>
          </div>
        </div>
      </div>
    );
  });
