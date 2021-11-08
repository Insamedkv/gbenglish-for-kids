import React from 'react';

interface CategoryCardsProps {
  word: string,
  src: string,
  audio: string,
  translation: string,
  isPlayMode: boolean,
  cardPlayed?: boolean,
  cardClickHandler?: (word: string) => void
}

interface CategoryCardsState {
  rotation: number,
  isFront: boolean,
  displayBack: boolean,
  displayFront: string,
}

class Card extends React.Component<CategoryCardsProps, CategoryCardsState> {
  constructor(props: CategoryCardsProps) {
    super(props);
    this.rotateCardToFront = this.rotateCardToFront.bind(this);
    this.rotateCardToBack = this.rotateCardToBack.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.state = {
      rotation: 0,
      isFront: true,
      displayBack: false,
      displayFront: '',
    };
  }

  rotateCardToFront = (): void => {
    if (this.state.isFront === false) {
      this.setState({
        rotation: 0,
        isFront: true,
      });
      setTimeout(() => {
        this.setState({
          displayBack: false,
          displayFront: 'contents',
        });
      }, 250);
    }
  };

  rotateCardToBack = (): void => {
    this.setState({
      rotation: 180,
      isFront: false,
    });
    setTimeout(() => {
      this.setState({
        displayFront: 'none',
        displayBack: true,
      });
    }, 250);
  };

  playAudio = (track: string): void => {
    new Audio(track).play();
  };

  render(): JSX.Element {
    const {
      word, src, audio, translation, isPlayMode, cardPlayed, cardClickHandler,
    } = this.props;
    const {
      rotation, displayBack, displayFront,
    } = this.state;

    return (
      <div
        className="text-white bg-info mb-3"
        role="menuitem"
        tabIndex={0}
        onMouseLeave={this.rotateCardToFront}
      >
        <div style={{
          display: `${!isPlayMode ? 'contents' : 'none'}`,
        }}
        >
          <div
            className="front"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transition: 'transform 0.5s',
              display: `${displayFront}`,
              animationPlayState: 'rinning',
            }}
          >
            <div className="card-header text-style">
              {word}
              <div
                className="rotate"
                role="menuitem"
                tabIndex={0}
                onClick={this.rotateCardToBack}
                onKeyDown={() => {}}
              >
                <img src="./assets/rotate.png" alt="rotate" />
              </div>
            </div>
            <div
              className="card-body"
              role="menuitem"
              tabIndex={0}
              onClick={() => this.playAudio(audio)}
              onKeyDown={() => {}}
            >
              <img className="card-img" src={src} alt="emotions" />
              <audio src={audio}>
                <track
                  default
                  kind="captions"
                />
              </audio>
            </div>
          </div>
        </div>
        <div>
          <div
            className="back"
            style={{ display: `${displayBack || isPlayMode ? 'contents' : 'none'}` }}
            role="menuitem"
            tabIndex={0}
            onClick={() => {
              if (isPlayMode && !cardPlayed) {
                cardClickHandler!(word);
              }
            }}
            onKeyDown={() => {}}
          >
            <div
              className="card-header text-style"
              style={{
                display: `${displayBack && !isPlayMode ? 'flex' : 'none'}`,
              }}
            >
              {translation}
              <img className="rotate" src="./assets/rotate.png" alt="rotate" />
            </div>
            <div className="card-body" role="menuitem">
              <img
                className="card-img"
                src={src}
                alt="emotions"
                style={{ transform: 'rotateY(180deg)', backgroundColor: cardPlayed ? 'green' : 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
