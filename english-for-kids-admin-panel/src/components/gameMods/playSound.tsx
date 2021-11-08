export const playAudio = (track: string): void => {
  new Audio(track).play();
};
