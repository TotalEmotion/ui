import React from 'react';
import reactCSS, { hover } from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  withHandlers,
} from 'recompose';
import cssSides, { Side } from '@team-griffin/css-sides';
import { Heading, H } from '@team-griffin/react-heading-section';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import color from 'color';

const overlayColor = color(palette.tertiaryLight).alpha(0.6);

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      ...cssSides('padding', Side.Y, 50),
      ...longhand('background', {
        size: 'cover',
        repeat: 'no-repeat',
        image: `
          linear-gradient(${overlayColor}, ${overlayColor}),
          url(${props.mediaSrc})
        `,
      }),
      overflow: 'hidden',
      position: 'relative',
      minHeight: 300,
      textAlign: 'center',
    },
    playButton: {
      position: 'relative',
      width: 80,
      height: 80,
      backgroundColor: '#212d38',
      borderRadius: 40,
      color: '#ffffff',
      borderWidth: 0,
      outline: 0,
      marginBottom: 20,
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
    },
    playButtonArrow: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      height: 0,
      width: 0,
      ...longhand('margin', {
        left: -5,
        top: -15,
      }),
      ...longhand('border', {
        ...longhand('left', {
          width: 20,
          style: 'solid',
          color: '#ffffff',
        }),
        ...longhand('top', {
          width: 15,
          style: 'solid',
          color: 'transparent',
        }),
        ...longhand('bottom', {
          width: 15,
          style: 'solid',
          color: 'transparent',
        }),
      }),
    },
    title: {
      fontSize: 26,
      lineHeight: 1.4,
      letterSpacing: 1.5,
      color: '#ffffff',
      maxWidth: 480,
      ...cssSides('margin', Side.X, 'auto'),
    },
    date: {
      fontSize: 12,
      color: '#bebebe',
    },
  },
  hover: {
    playButton: {
      transform: 'scale(1.1)',
    },
  },
}, props);

const PurePlayButton = ({
  styles,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={styles.playButton}
  >
    <span style={styles.playButtonArrow}/>
  </button>
);

const PlayButton = compose(
  setDisplayName('PlayButton'),
  hover,
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
)(PurePlayButton);

export const PureMediaHero = ({
  styles,
  title,
  date,
  handlePlayClick,
}) => (
  <div style={styles.root}>
    <PlayButton
      onClick={handlePlayClick}
    />
    <Heading
      component={(
        <H style={styles.title}>
          {title}
        </H>
      )}
    />
    <span style={styles.date}>
      {date}
    </span>
  </div>
);

export const enhance = compose(
  setDisplayName('MediaHero'),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
  withHandlers({
    handlePlayClick: ({
      onPlayClick,
      videoSrc,
    }) => () => onPlayClick(videoSrc),
  }),
);

export default enhance(PureMediaHero);
