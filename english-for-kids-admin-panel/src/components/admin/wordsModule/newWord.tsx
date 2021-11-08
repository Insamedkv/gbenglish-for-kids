import React from 'react';
import { updateStore } from '../../../store/helper';
import { createWord } from '../apiClient';

export interface WordComponentInterface {
  word: string,
  translation: string,
  sound: string,
  image: string,
}

interface NewWordProps {
  toggle: () => void,
  categoryId: string,
}

interface NewWordState {
  word: string,
  translation: string,
  sound: string,
  image: string,
}

class NewWord extends React.Component<NewWordProps, NewWordState> {
  fileInputSound: React.RefObject<HTMLInputElement>;

  fileInputPicture: React.RefObject<HTMLInputElement>;

  constructor(props: NewWordProps) {
    super(props);
    this.state = {
      word: '',
      translation: '',
      sound: '',
      image: '',
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
    submitdata.append('word', this.state.word);
    submitdata.append('translation', this.state.translation);
    if (this.fileInputSound.current) {
      submitdata.append('audio', this.fileInputSound.current.files![0]);
    }
    if (this.fileInputPicture.current) {
      submitdata.append('img', this.fileInputPicture.current.files![0]);
    } else {
      submitdata.append('img', '');
    }
    await createWord(this.props.categoryId, submitdata);
  };

  wordChange(event: { target: { value: string; }; }): void {
    this.setState((prevState) => ({ ...prevState, word: event.target.value }));
  }

  translationChange(event: { target: { value: string; }; }): void {
    this.setState((prevState) => ({ ...prevState, translation: event.target.value }));
  }

  soundSubmit(): void {
    if (this.fileInputSound.current) {
      this.setState({ sound: this.fileInputSound.current.files!.length ? this.fileInputSound.current.files![0].name : '' });
    }
  }

  pictureSubmit(): void {
    if (this.fileInputPicture.current) {
      this.setState({
        image: this.fileInputPicture.current.files!.length
          ? this.fileInputPicture.current.files![0].name
          : '',
      });
    }
  }

  render(): JSX.Element {
    const { toggle } = this.props;
    const {
      word, translation, sound, image,
    } = this.state;
    return (
      <div className="text-white bg-info bg-info--control">
        <div className="front">
          <div className="card-body">
            <form className="add-new-word">
              <div className="new-word">
                <div className="admin-word">Word</div>
                <input type="input" name="word" className="form__field" value={word} onChange={this.wordChange} />
              </div>
              <div className="new-translation">
                <div className="admin-translation">Translation</div>
                <input type="input" name="translation" className="form__field" value={translation} onChange={this.translationChange} />
              </div>
              <div className="file-input-wrapper">
                <div className="file-input-name">Sound:</div>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    name="sound"
                    accept=".mp3, .wav, audio/*"
                    ref={this.fileInputSound}
                    onChange={this.soundSubmit}
                  />
                  <i className="fa fa-cloud-upload" />
                  <span className="file-name">{sound || 'Select file'}</span>
                </label>
              </div>
              <div className="file-input-wrapper">
                <div className="file-input-name">Image:</div>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    name="image"
                    accept=".png, .jpg, jpeg, image/*"
                    ref={this.fileInputPicture}
                    onChange={this.pictureSubmit}
                  />
                  <i className="fa fa-cloud-upload" />
                  <span className="file-name">{image || 'Select file'}</span>
                </label>
              </div>
              <div className="new-category-buttons-wrapper">
                <button
                  className="new-category-button"
                  type="button"
                  onClick={() => {
                    toggle();
                  }}
                >
                  CANCEL
                </button>
                <button
                  className="new-category-button"
                  type="button"
                  onClick={async () => {
                    await this.onSubmit();
                    await updateStore();
                    toggle();
                  }}
                >
                  CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewWord;
