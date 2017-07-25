import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  withHandlers,
} from 'recompose';
import { InlineSVG } from '@team-griffin/react-inline-svg';
import { Heading, H } from '@team-griffin/react-heading-section';
import Button from './Button';
import clapperIcon from '!svg-inline-loader!../assets/clapperboard-icon.svg';

const stylesheet = () => reactCSS({
  default: {
    root: {
      backgroundColor: '#f6f5fd',
      paddingTop: 60,
      paddingBottom: 40,
      textAlign: 'center',
    },
    icon: {
      display: 'inline-block',
      width: 78,
      fill: '#a5b2b8',
    },
    title: {
      color: '#727a7d',
      fontWeight: 500,
      fontSize: 30,
      marginTop: 20,
      marginBottom: 20,
    },
    text: {
      color: '#a5b2b8',
      marginBottom: 30,
    },
  },
});

export const PureEmptyPrompt = ({
  styles,
  title,
  text,
  buttonText,
  handleButtonClick,
}) => (
  <div style={styles.root}>
    <span style={styles.icon}>
      <InlineSVG
        src={clapperIcon}
      />
    </span>
    <Heading component={(
      <H style={styles.title}>
        {title}
      </H>
    )}
    />
    <p style={styles.text}>{text}</p>
    <Button
      onClick={handleButtonClick}
    >
      {buttonText}
    </Button>
  </div>
);

export const enhance = compose(
  setDisplayName('EmptyPrompt'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
  withHandlers({
    handleButtonClick: ({
      onButtonClick,
    }) => () => onButtonClick(),
  }),
);

export default enhance(PureEmptyPrompt);
