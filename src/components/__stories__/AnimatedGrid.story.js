import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import AnimatedGrid from '../AnimatedGrid';
import VideoCard from '../VideoCard';

storiesOf('Animated Grid', module)
  .add('default', () => {
    const selectable = boolean('Selectable', false);
    return (
      <div style={{padding: 20}}>
        <AnimatedGrid
          items={[
            <VideoCard
              key="1"
              selectable={selectable}
              selected={boolean('Maui selected', false)}
              mediaSrc={'//placebeyonce.com/500-200'}
              title="Maui By Air The Best Way Around The Island"
              date="08 Jun 2017"
            />,
            <VideoCard
              key="2"
              selectable={selectable}
              selected={boolean('Healthy Complexion selected', false)}
              mediaSrc={'//placebeyonce.com/500-201'}
              title="Tips for a Healthy Clear Complexion"
              date="08 Jun 2017"
            />,
            <VideoCard
              key="3"
              selectable={selectable}
              selected={boolean('Moon Gazing selected', false)}
              mediaSrc={'//placebeyonce.com/500-202'}
              title="Moon Gazing"
              date="08 Jun 2017"
            />,
            <VideoCard
              key="4"
              selectable={selectable}
              selected={boolean('Famous Names in Barbecue selected', false)}
              mediaSrc={'//placebeyonce.com/500-203'}
              title="Famous Names in Barbecue"
              date="08 Jun 2017"
            />,
            <VideoCard
              key="5"
              selectable={selectable}
              selected={boolean('Linux or Windows selected', false)}
              mediaSrc={'//placebeyonce.com/500-204'}
              title="Linux or Windows which is it"
              date="08 Jun 2017"
            />,
            <VideoCard
              key="6"
              selectable={selectable}
              selected={boolean('Cooking For One selected', false)}
              mediaSrc={'//placebeyonce.com/500-205'}
              title="Cooking For One"
              date="08 Jun 2017"
            />,
          ]}
        />
      </div>
    );
  });
