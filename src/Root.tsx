import "./index.css";
import { Composition } from "remotion";
import { Screen01OpeningHero } from "./scenes/Screen01OpeningHero";
import { Screen02GlobeLanguages } from "./scenes/Screen02GlobeLanguages";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Screen01OpeningHero"
        component={Screen01OpeningHero}
        durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Screen02GlobeLanguages"
        component={Screen02GlobeLanguages}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
