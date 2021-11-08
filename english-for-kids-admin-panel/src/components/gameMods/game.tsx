import React from 'react';
import '../../index.css';
import { Redirect } from 'react-router-dom';
import Card from '../content/cardModule/card';
import { getCategoryWords } from '../admin/apiClient';
import { CardInfo, Word } from '../admin/dataInterfaces';
import { playAudio } from './playSound';

const SUCCESS_AUDIO_SRC = './audio/correct.mp3';
const ERROR_AUDIO_SRC = './audio/error.mp3';

interface GameProps {
  categoryId: string
}

interface GameState {
  gameStarted: boolean,
  cardsSequence: CardInfo[] | null,
  answersArray: boolean[] | null,
  currentCardIndex: number | null,
  gameFinished: boolean,
  redirectToMainPage: boolean,
  words: Word[]
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps | Readonly<GameProps>) {
    super(props);
    this.state = {
      gameStarted: false,
      cardsSequence: null,
      answersArray: null,
      currentCardIndex: null,
      gameFinished: false,
      redirectToMainPage: false,
      words: [],
    };
  }

  componentDidMount(): void {
    getCategoryWords(this.props.categoryId).then((words) => this.setState({ words }));
  }

  componentDidUpdate(prevProps: GameProps, prevState: GameState): void {
    if (prevProps.categoryId !== this.props.categoryId) {
      getCategoryWords(this.props.categoryId).then((words) => this.setState({ words }));
    }
    const { answersArray, currentCardIndex } = this.state;
    if (currentCardIndex !== prevState.currentCardIndex) {
      if (!this.state.gameFinished) {
        this.playCurrentCardAudio();
      } else {
        const wrongAnswersCount = answersArray && (answersArray!.filter((answer) => !answer)).length;
        if (wrongAnswersCount! > 0) {
          playAudio(ERROR_AUDIO_SRC);
        } else {
          playAudio(SUCCESS_AUDIO_SRC);
        }
        setTimeout(() => { this.setState({ redirectToMainPage: true }); }, 3000);
      }
    }
  }

  startGame = (): void => {
    const { words } = this.state;

    this.setState({
      gameStarted: true,
      cardsSequence: [...words].sort(() => Math.random() - 0.5),
      answersArray: [],
      currentCardIndex: 0,
    });
  };

  playCurrentCardAudio = (): void => {
    const { cardsSequence, currentCardIndex } = this.state;
    playAudio(cardsSequence![currentCardIndex!].sound);
  };

  cardClickHandler = (word: string): void => {
    const { cardsSequence, currentCardIndex, answersArray } = this.state;
    if (word === cardsSequence![currentCardIndex!].word) {
      if (currentCardIndex !== cardsSequence!.length - 1) {
        playAudio(SUCCESS_AUDIO_SRC);
      }
      this.setState({
        currentCardIndex: currentCardIndex! + 1,
        answersArray: [...answersArray!, true],
        gameFinished: currentCardIndex === cardsSequence!.length - 1,
      });
    } else {
      playAudio(ERROR_AUDIO_SRC);
      this.setState({
        answersArray: [...answersArray!, false],
      });
    }
  };

  render(): JSX.Element {
    const {
      words, gameFinished, cardsSequence, currentCardIndex, gameStarted, answersArray, redirectToMainPage,
    } = this.state;
    const wrongAnswersCount = answersArray && (answersArray!.filter((answer) => !answer)).length;

    if (redirectToMainPage) {
      return <Redirect to="/" />;
    }

    return gameFinished ? (
      <div className="end-game">
        <div
          className="finalSmile"
          style={{ backgroundImage: wrongAnswersCount === 0 ? 'url(./assets/successSmile.svg)' : 'url(./assets/errorsSmile.svg)' }}
        />
        <div className="finalText text-style">
          { wrongAnswersCount === 0 ? 'GREAT JOB' : `BETTER LUCK NEXT TIME. WRONG ANSWERS: ${wrongAnswersCount}`}
        </div>
      </div>

    ) : (
      <>
        <div className="starContainer">
          {answersArray && answersArray!.slice(-10)
            .map((answer, index) => (
              <img
                key={index}
                src={answer ? './assets/correctAnswerStar.svg' : './assets/wrongAnswerStar.svg'}
                alt="star"
              />
            ))}
        </div>
        <div className="content">
          {words && words.map((card) => (
            <Card
              key={card.word}
              src={card.image}
              word={card.word}
              audio={card.sound}
              translation={card.translation}
              isPlayMode
              cardClickHandler={this.cardClickHandler}
              cardPlayed={gameStarted && cardsSequence!.findIndex((choosenCard) => choosenCard.word === card.word) < currentCardIndex!}
            />
          ))}
        </div>

        {this.state.gameStarted ? (
          <button
            className="button-slide slide-left"
            onClick={this.playCurrentCardAudio}
            type="button"
          >
            REPEAT
          </button>
        ) : (
          <button
            className="button-slide slide-left"
            onClick={this.startGame}
            type="button"
          >
            START GAME
          </button>
        )}
      </>
    );
  }
}

export default Game;
