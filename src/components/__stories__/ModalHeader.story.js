import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import ModalHeader from '../ModalHeader';
import Modal from '../Modal';

storiesOf('Modal Header', module)
  .add('default', () => {
    return (
      <ModalHeader
        title="Remove Videos"
        dismissible={boolean('Dismissible', true)}
      />
    );
  })
  .add('long title', () => {
    return (
      <ModalHeader
        title="Upload your videos to your account and then begin magic"
        dismissible={boolean('Dismissible', true)}
      />
    );
  })
  .add('in a <Modal/>', () => {
    return (
      <div>
        <img src="//placebeyonce.com/1000-400"/>
        <Modal
          isOpen={boolean('Open', true)}
        >
          <ModalHeader
            title="I'm a modal"
            dismissible={boolean('Dismissible', true)}
          />
          {"Are you sure you want to remove the selected videos? This cannot be undone, selected videos and all of the corresponding data will be deleted."}
        </Modal>
      </div>
    );
  });
