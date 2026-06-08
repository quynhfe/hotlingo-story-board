import "./index.css";
import { Composition } from "remotion";
import { Screen01OpeningHero } from "./scenes/Screen01OpeningHero";

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
    </>
  );
};
