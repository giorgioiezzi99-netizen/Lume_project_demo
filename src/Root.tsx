import "./index.css";
import { Composition } from "remotion";
import { LumeShowcase } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LumeShowcase"
        component={LumeShowcase}
        durationInFrames={360}
        fps={30}
        width={1536}
        height={1024}
      />
    </>
  );
};
