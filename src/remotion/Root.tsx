import React from 'react';
import {Composition} from 'remotion';
import {MyComposition} from "./Composition";
 
export const RemotionRoot: React.FC = () => {

  const fps = 30 ;
  const totalDurationInFrames = 1020;

  return (
    <>
      <Composition
        id="quizMaker"
        component={() => <MyComposition title="Title" countries={[]} jumbledCountries={[]} audioFile="audio.mp3" />}
        durationInFrames={totalDurationInFrames}
        fps={fps}
        width={1080}
        height={1920}
      />
    </>
  );
};