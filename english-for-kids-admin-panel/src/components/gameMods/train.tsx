import React from 'react';
import '../../index.css';
import Card from '../content/cardModule/card';
import { getCategoryWords } from '../admin/apiClient';
import { Word } from '../admin/dataInterfaces';

interface TrainProps {
  categoryId: string
}

interface TrainState {
  words: Word[]
}

class Train extends React.Component<TrainProps, TrainState> {
  constructor(props: TrainProps | Readonly<TrainProps>) {
    super(props);
    this.state = {
      words: [],
    };
  }

  componentDidMount(): void {
    getCategoryWords(this.props.categoryId).then((words) => this.setState({ words }));
  }

  componentDidUpdate(prevProps: TrainProps): void {
    if (prevProps.categoryId !== this.props.categoryId) {
      getCategoryWords(this.props.categoryId).then((words) => this.setState({ words }));
    }
  }

  render(): JSX.Element {
    const { words } = this.state;
    return (
      <div className="content">
        {words && words.map((card) => (
          <Card
            src={card.image}
            word={card.word}
            audio={card.sound}
            translation={card.translation}
            isPlayMode={false}
            key={card.word}
          />
        ))}
      </div>
    );
  }
}

export default Train;
