import "./index.css";
import { Composition } from "remotion";
import { Screen01GlobeLanguages } from "./scenes/Screen01GlobeLanguages";
import { Screen02OpeningHero } from "./scenes/Screen02OpeningHero";
import { Screen03ProblemContext } from "./scenes/Screen03ProblemContext";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Screen01GlobeLanguages"
        component={Screen01GlobeLanguages}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Screen02OpeningHero"
        component={Screen02OpeningHero}
        durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Screen03ProblemContext"
        component={Screen03ProblemContext}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
