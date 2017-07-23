import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs'
import Modal from '../Modal';

storiesOf('Modal', module)
  .add('default', () => {
    return (
      <div>
        <img src="//placebeyonce.com/1000-400"/>
        <Modal
          isOpen={boolean('Open', true)}
        >
          <h1>I'm a modal</h1>
          <p>A real life modal. I have no padding as that's up to the rendered children.</p>
        </Modal>
      </div>
    );
  });
