import { Composition, getInputProps } from 'remotion';
import { continueRender, delayRender } from 'remotion';
import { MyVideo } from '../components/edit/EditContent';
import '../styles/globals.css';
import { defaultMyCompProps } from './MyCompTypes';
import { useEffect, useState } from 'react';

export const Root: React.FC = () => {
  const [duration, setDuration] = useState(10);
  const [height, setHeight] = useState(1920);
  const [width, setWidth] = useState(1080);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    const inputProps = getInputProps();
    const aspectRatio = inputProps.aspectRatio;
    if (aspectRatio == '1:1') {
      setHeight(1080);
      setWidth(1080);
    } else if (aspectRatio == '9:16') {
      setHeight(1920);
      setWidth(1080);
    } else if (aspectRatio == '16:9') {
      setHeight(1080);
      setWidth(1920);
    }
    setDuration(inputProps.duration * 30);
    continueRender(handle);
  }, [handle]);

  return (
    <>
      <Composition
        id="MyComp"
        component={MyVideo}
        durationInFrames={duration}
        fps={30}
        width={width}
        height={height}
        defaultProps={defaultMyCompProps}
      />
    </>
  );
};
