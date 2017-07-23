import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import ModalFooter from '../ModalFooter';
import Modal from '../Modal';
import Button, { Kind } from '../Button';

storiesOf('Modal Footer', module)
  .add('default', () => {
    return (
      <ModalFooter>
        {"I'm the modal footer"}
      </ModalFooter>
    );
  })
  .add('with actions', () => {
    return (
      <ModalFooter>
        <div className="row">
          <div className="col-6">
            <Button
              onClick={() => console.log}
              kind={Kind.SECONDARY}
            >
              {'Cancel'}
            </Button>
          </div>
          <div className="col-6">
            <div style={{textAlign: 'right'}}>
              <Button
                onClick={() => console.log}
                kind={Kind.DETRIMENTAL}
              >
                {'Remove'}
              </Button>
            </div>
          </div>
        </div>
      </ModalFooter>
    );
  })
  .add('in a <Modal/>', () => {
    return (
      <div>
        <img src="//placebeyonce.com/1000-400"/>
        <Modal
          isOpen={boolean('Open', true)}
        >
          {"Are you sure you want to remove the selected videos? This cannot be undone, selected videos and all of the corresponding data will be deleted."}
          <ModalFooter>
            <div className="row">
              <div className="col-6">
                <Button
                  onClick={() => console.log}
                  kind={Kind.SECONDARY}
                >
                  {'Cancel'}
                </Button>
              </div>
              <div className="col-6">
                <div style={{textAlign: 'right'}}>
                  <Button
                    onClick={() => console.log}
                    kind={Kind.DETRIMENTAL}
                  >
                    {'Remove'}
                  </Button>
                </div>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  });
