"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { getCountries } from "@/helper/getCountries";
import { getJumbledCountries } from "@/helper/getJumbledCountries";
import { createAudioFileFromText } from "@/helper/getAudioScript";

import { Player } from "@remotion/player";

import { Button } from "@/components/ui/button";
import { MyComposition } from "@/remotion/Composition";
import { fetchBackground } from "@/helper/fetchBackground";

export default function Home() {
  const [color, setColor] = useState("#fff");
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [jumbledCountries, setJumbledCountries] = useState<string[]>([]);
  const [audioFile, setAudioFile] = useState<string>("");
  const [backgoundImage , setBackgoundImage] = useState<string>("");
  interface QuizData {
    [key: string]: string | string[];
    title: string;
    countries: string[];
    jumbledCountries: string[];
    audioFile: string;
  }

  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const countries = getCountries();
      setCountries(countries);
      const jumbledCountries = getJumbledCountries(countries);
      setJumbledCountries(jumbledCountries);

      const backgoundImageBac = await fetchBackground();
      setBackgoundImage(backgoundImageBac);

      const script = `
    First one. <break time="3.0s"/> ${countries[0]}
    Second one. <break time="3.0s"/> ${countries[1]}
    Third one. <break time="3.0s"/> ${countries[2]}
    Fourth one. <break time="3.0s"/> ${countries[3]}
    Fifth one. <break time="3.0s"/> ${countries[4]}
    Sixth one. <break time="3.0s"/> ${countries[5]}
    Seventh one. <break time="3.0s"/> ${countries[6]}
    Eighth one. <break time="3.0s"/> ${countries[7]}
    Ninth one. <break time="3.0s"/> ${countries[8]}
    Tenth one. <break time="3.0s"/> ${countries[9]}
  `;

      const audioFile = await createAudioFileFromText(script);
      setAudioFile(audioFile);
    };

    fetchData();
  }, []);


  const onQuizMakerSubmit = async () => {
    const quizData = {
      title: quizTitle,
      countries,
      jumbledCountries,
      audioFile,
      backgoundImage,
    };
    setQuizData(quizData);
  }

  return (
    <main className={"max-w-7xl w-full h-screen mx-auto py-4"}>
      <h1 className="text-2xl text-center font-bold">Country Quiz Maker</h1>
      <Separator />
      <div className="flex flex-col gap-5 max-w-3xl mx-auto my-4">
        <Input
          name="quizTitle"
          id="quizTitleInput"
          className={"border border-black max-w-sm"}
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <Input
          name="quizBackground"
          id="quizBackgroundInput"
          className={"border border-black max-w-sm"}
          placeholder="Quiz Background"
          type={"file"}
        />
        {/* <ColorPicker color={color} onChange={(color) => setColor(color.hex)} /> */}
        <Button  className="bg-black text-white"  onClick={onQuizMakerSubmit}>
          Create Quiz  
         </Button>
      </div> {quizData && (
        <div className="mt-10">
          <Player
            component={MyComposition}
            compositionWidth={1080}
            compositionHeight={1920}
            durationInFrames={300}
            fps={30}
            inputProps={quizData}
          />
        </div>
      )}



    
    </main>
  );
}
