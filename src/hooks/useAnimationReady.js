import { createContext, useContext } from "react";

export const AnimationContext = createContext({
  isReady: false,
  prefersReducedMotion: false,
});

export const useAnimationReady = () => useContext(AnimationContext);
