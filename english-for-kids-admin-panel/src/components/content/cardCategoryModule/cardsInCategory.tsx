import React from 'react';
import { GameMods } from '../../interfaces/appContext';
import Game from '../../gameMods/game';
import Train from '../../gameMods/train';

interface CardCategoryProps {
  playMode: GameMods,
  categoryId: string,
}

class CardsInCategory extends React.Component<CardCategoryProps> {
  render(): JSX.Element {
    const { categoryId, playMode } = this.props;
    return (
      <div>
        {playMode === GameMods.Train && <Train categoryId={categoryId} />}
        {playMode === GameMods.Play && <Game categoryId={categoryId} />}
      </div>
    );
  }
}

export default CardsInCategory;
