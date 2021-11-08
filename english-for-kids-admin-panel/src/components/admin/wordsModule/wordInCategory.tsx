import React from 'react';
import { updateStore } from '../../../store/helper';
import { deleteWord, updateWord } from '../apiClient';
import { Word } from '../dataInterfaces';

interface WordInCategoryProps {
  word: Word,
  categoryId: string,
}

interface WordInCategoryState {
  isWordUpdating: boolean,
  newWord: string,
  newTranslation: string,
  newSound: string,
  newImage: string,
}

class WordInCategory extends React.Component<WordInCategoryProps, WordInCategoryState> {
  fileInputSound: React.RefObject<HTMLInputElement>;

  fileInputPicture: React.RefObject<HTMLInputElement>;

  constructor(props: WordInCategoryProps) {
    super(props);
    this.state = {
      isWordUpdating: false,
      newWord: '',
      newTranslation: '',
      newSound: '',
      newImage: '',
    };
    this.wordChange = this.wordChange.bind(this);
    this.translationChange = this.translationChange.bind(this);
    this.soundSubmit = this.soundSubmit.bind(this);
    this.pictureSubmit = this.pictureSubmit.bind(this);
    this.fileInputSound = React.createRef();
    this.fileInputPicture = React.createRef();
  }

  onSubmit = async (): Promise<void> => {
    const submitdata = new FormData();
    submitdata.append('word', this.state.newWord);
    submitdata.append('translation', this.state.newTranslation);
    if (this.fileInputSound.current) {
      submitdata.append('audio', this.fileInputSound.current.files![0]);
    }
    if (this.fileInputPicture.current) {
      submitdata.append('img', this.fileInputPicture.current.files![0]);
    }
    await updateWord(this.props.categoryId, this.props.word.id, submitdata);
  };

  toggleWordUpdating = (): void => {
    this.setState((previousState) => ({
      isWordUpdating: !previousState.isWordUpdating,
    }));
  };

  wordChange(event: { target: { value: string; }; }): void {
    this.setState((prevState) => ({ ...prevState, newWord: event.target.value }));
  }

  translationChange(event: { target: { value: string; }; }): void {
    this.setState((prevState) => ({ ...prevState, newTranslation: event.target.value }));
  }

  soundSubmit(): void {
    if (this.fileInputSound.current) {
      this.setState({ newSound: this.fileInputSound.current.files!.length ? this.fileInputSound.current.files![0].name : '' });
    }
  }

  pictureSubmit(): void {
    if (this.fileInputPicture.current) {
      this.setState({ newImage: this.fileInputPicture.current.files!.length ? this.fileInputPicture.current.files![0].name : '' });
    }
  }

  render(): JSX.Element {
    const {
      word,
    } = this.props;

    const {
      isWordUpdating, newWord, newTranslation, newSound, newImage,
    } = this.state;

    const playSound = (sound: string) => {
      new Audio(`${sound}`).play();
    };
    return (
      <div className="content-cell">
        <div className="text-white bg-info bg-info--control">
          <div className="front">
            <div className="card-header text-style">
              <div className="card-body card-body--control">
                <div className="category-control">
                  <div>Word:</div>
                  {isWordUpdating ? (
                    <input
                      type="input"
                      name="category"
                      className="form__field"
                      value={newWord}
                      onChange={this.wordChange}
                    />
                  ) : (
                    <>
                      {`${word.word}`}
                    </>
                  )}
                  <div>Translation:</div>
                  {isWordUpdating ? (
                    <input
                      type="input"
                      name="category"
                      className="form__field"
                      value={newTranslation}
                      onChange={this.translationChange}
                    />
                  ) : (
                    <>
                      {`${word.translation}`}
                    </>
                  )}
                  {isWordUpdating ? (
                    <>
                      <div>Sound:</div>
                      <label className="custom-file-upload">
                        <input
                          type="file"
                          name="sound"
                          accept=".mp3, .wav, audio/*"
                          ref={this.fileInputSound}
                          onChange={this.soundSubmit}
                        />
                        <i className="fa fa-cloud-upload" />
                        <span className="file-name">{newSound || 'Select file'}</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <button
                        className="word-control-button"
                        type="button"
                        onClick={() => { playSound(word.sound); }}
                      >
                        Sound
                      </button>
                    </>
                  )}
                  {isWordUpdating ? (
                    <>
                      <div>Image:</div>
                      <label className="custom-file-upload">
                        <input
                          type="file"
                          name="image"
                          accept=".png, .jpg, jpeg, image/*"
                          ref={this.fileInputPicture}
                          onChange={this.pictureSubmit}
                        />
                        <i className="fa fa-cloud-upload" />
                        <span className="file-name">{newImage || 'Select file'}</span>
                      </label>
                    </>
                  ) : (
                    <>
                      {word.image === ''
                        ? <img className="word-img" src="/img/default.png" alt="error" />
                        : <img className="word-img" src={`${word.image}`} alt="error" />}
                    </>
                  )}
                </div>
                <div className="category-word-control">
                  {isWordUpdating ? (
                    <div className="update-word">
                      <button
                        className="category-control-button"
                        type="button"
                        onClick={async () => {
                          await this.onSubmit();
                          await updateStore();
                          this.toggleWordUpdating();
                        }}
                      >
                        UPDATE
                      </button>
                      <button
                        className="category-control-button"
                        type="button"
                        onClick={this.toggleWordUpdating}
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="category-control-button"
                        type="button"
                        onClick={async () => {
                          await deleteWord(this.props.categoryId, this.props.word.id);
                          await updateStore();
                        }}
                      >
                        DELETE
                      </button>
                      <button
                        className="category-control-button"
                        type="button"
                        onClick={this.toggleWordUpdating}
                      >
                        UPDATE
                      </button>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default WordInCategory;
