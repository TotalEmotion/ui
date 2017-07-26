import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import r from 'ramda';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      ...longhand('border', {
        width: 1,
        color: palette.cloudyBlue,
        style: 'solid',
      }),
      backgroundImage: `
        linear-gradient(${palette.lightGrey}, ${palette.lightGrey})
      `,
      color: palette.coolGrey,
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 0.3s ease-in-out',
    },
    text: {
      opacity: 1,
      transition: 'opacity 1s ease-in-out',
      fontSize: 16,
    },
  },
  withImage: {
    root: {
      backgroundImage: `url(${props.src}`,
    },
    text: {
      opacity: 0,
    },
  },
}, {
  withImage: r.pipe(
    r.prop('src'),
    r.length,
    r.gt(r.__, 10), // e.g fo.co/r.jpg
  )(props),
});

export const PureVideoPreview = ({
  styles,
}) => (
  <div style={styles.root}>
    <span style={styles.text}>
      {'Video preview'}
    </span>
  </div>
);

export const enhance = compose(
  setDisplayName('VideoPreview'),
  defaultProps({
    src: null,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureVideoPreview);
