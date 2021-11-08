import { GameMods } from './appContext';

export interface AppState {
  playMode: GameMods,
  popUp: GameMods,
  isAuthorized: boolean,
}

export interface WordComponentInterface {
  word: string,
  translation: string,
  sound: string,
  imagw: string,
}
