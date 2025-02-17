import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  Audio,
  staticFile
} from "remotion";
import { useState, useEffect, useMemo } from "react";


interface MyCompositionProps {
  title: string;
  countries: string[];
  jumbledCountries: string[];
  audioFile: string;
  backgoundImage: string;
}

export const MyComposition = ({audioFile,countries,jumbledCountries,title,backgoundImage} : MyCompositionProps) => {
  const [playTimer, setPlayTimer] = useState(false);
  const [playNextAudio, setPlayNextAudio] = useState(false);
  const src = backgoundImage;
    // "https://images.unsplash.com/photo-1604311795833-25e1d5c128c6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // const title = "Country Scramble Quiz";
  const initialScript = [
    "Can",
    "you",
    "name",
    "these",
    "10",
    "countries?",
    "First",
    "one.",
    "Let's",
    "go!"
  ];
  
  const countryList = countries;
  // const countryList = useMemo(
  //   () => [
  //     "China",
  //     "United States",
  //     "India",
  //     "Russia",
  //     "Brazil",
  //     "United Kingdom",
  //     "France",
  //     "Germany",
  //     "Japan",
  //     "Canada"
  //   ],
  //   []
  // );


  const jumbledCountryList = jumbledCountries;

  // const jumbledCountryList = [
  //   "Chani",
  //   "Untied Sttaes",
  //   "Idnia",
  //   "Rssuia",
  //   "Brailz",
  //   "Untied Kigndom",
  //   "Frnace",
  //   "Germnay",
  //   "Jpaan",
  //   "Cnadada"
  // ];

  const frame = useCurrentFrame();
  const fps = 30;
  const wordFrameInterval = 12;
  const countryFrameInterval = 90; // 3 seconds per country (90 frames)

  const [revealedAnswers, setRevealedAnswers] = useState<string[]>(
    Array(10).fill(null)
  );

  useEffect(() => {
    const initialScriptDuration = initialScript.length * wordFrameInterval;
    const countryIndex = Math.floor(
      (frame - initialScriptDuration) / countryFrameInterval
    );

    if (frame > initialScriptDuration && frame % countryFrameInterval === 0) {
      if (countryIndex < countryList.length) {
        setRevealedAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[countryIndex] = countryList[countryIndex]; // Update correct country in list
          return newAnswers;
        });
        setPlayTimer(true); // Set to true to play timer audio
      }
    }
  }, [countryList, frame, initialScript.length]);

  const getWordToDisplay = (frame: number) => {
    const wordIndex = Math.floor(frame / wordFrameInterval);
    return initialScript[wordIndex] ?? null;
  };

  const getCountryToDisplay = (frame: number) => {
    const initialScriptDuration = initialScript.length * wordFrameInterval;
    const countryIndex = Math.floor(
      (frame - initialScriptDuration) / countryFrameInterval
    );

    if (frame < initialScriptDuration || countryIndex >= countryList.length) {
      return null; // Before quiz starts or after 10 countries
    }

    const isJumbledPhase =
      (frame - initialScriptDuration) % countryFrameInterval <
      countryFrameInterval / 2;
    return isJumbledPhase
      ? jumbledCountryList[countryIndex]
      : countryList[countryIndex];
  };

  const wordToDisplay = getWordToDisplay(frame);
  const countryToDisplay = getCountryToDisplay(frame);

  console.log(countryToDisplay);

  return (
    <AbsoluteFill>
      {/* Intro audio at the start */}
      <audio
        src={staticFile("/intro.mp3")}
        onEnded={() => setPlayNextAudio(true)}
        autoPlay
      />

      {/* Timer audio plays each time a new country appears */}
      {playTimer && (
        <audio
          src={staticFile("/timer.mp3")}
          onEnded={() => setPlayTimer(false)} // Reset playTimer after audio ends
          autoPlay
        />
      )}

      {playNextAudio && (
        <audio
          src={staticFile(audioFile)}
          onEnded={() => setPlayTimer(false)} // Reset playTimer after audio ends
          autoPlay
        />
      )}

      {/* Background image */}
      <AbsoluteFill>
        <Img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          src={src}
        />
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill>
        <main
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          {/* Title */}
          <div
            style={{
              width: "80%",
              backgroundColor: "white",
              color: "red",
              padding: "5px",
              borderRadius: 30,
              margin: "auto",
              marginTop: 20,
              boxShadow: "2px 2px 4px #000000"
            }}
          >
            <h1
              style={{
                fontSize: 70,
                textAlign: "center",
                fontFamily: "serif",
                fontWeight: "bold",
                WebkitTextStrokeColor: "black",
                WebkitTextStrokeWidth: "2px",
                textTransform: "uppercase"
              }}
            >
              {title}
            </h1>
          </div>

          {/* Display word (intro script) or country name */}
          <div>
            {wordToDisplay && (
              <h2
                style={{
                  fontSize: 100,
                  textAlign: "center",
                  marginTop: 30
                }}
              >
                {wordToDisplay}
              </h2>
            )}
            {countryToDisplay && (
              <h2
                style={{
                  fontSize: 100,
                  textAlign: "center",
                  marginTop: 30,
                  textTransform: "uppercase"
                }}
              >
                {countryToDisplay}
              </h2>
            )}
          </div>

          {/* Display all numbers initially & update with correct countries */}
          <div
            style={{
              
              padding: "10px",
              textAlign: "center"
            }}
          >
            {revealedAnswers.map((answer, index) => (
              <h2
                key={index}
                style={{
                  fontSize: 70,
                  textShadow: "2px 2px 4px #000000",
                  margin: "10px 0"
                }}
              >
                {index + 1}. {answer ? answer : ""}
              </h2>
            ))}
          </div>  
        </main>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
