import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import TextToggle, { Kind } from '../TextToggle';

storiesOf('Text Toggle', module)
  .add('One', () => {
    return (
      <div style={{padding: 20}}>
        <TextToggle
          on={boolean('On', false)}
          text="My Emotion"
          kind={select('Kind', Kind, Kind.JOY)}
        />
      </div>
    );
  })
  .add('Many', () => {
    return (
      <div
        style={{
          paddingTop: 20,
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <TextToggle
              on={boolean('Joy On', false)}
              text="Joy"
              kind={Kind.JOY}
            />
            <TextToggle
              on={boolean('Surprise On', false)}
              text="Surprise"
              kind={Kind.SURPRISE}
            />
            <TextToggle
              on={boolean('Negative On', false)}
              text="Negative"
              kind={Kind.NEGATIVE}
            />
            <TextToggle
              on={boolean('Attention On', false)}
              text="Attention"
              kind={Kind.ATTENTION}
            />
          </div>
        </div>
      </div>
    );
  });;
