import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AppState } from './interfaces/contextInterface';
import '../index.css';
import Content from './content/content';
import Header from './header/header';
import { GameMods } from './interfaces/appContext';
import Login from './header/hamburgerMenuModule/login';
import { updateStore } from '../store/helper';
import { isAuth } from './admin/apiClient';

class App extends React.Component <Record<string, never>, AppState> {
  toggleMode: () => void;

  showLoginPopUp: () => void;

  hideLoginPopUp: () => void;

  constructor(props: Record<string, never> | Readonly<Record<string, never>>) {
    super(props);

    this.toggleMode = () => {
      this.setState((state) => ({
        playMode: state.playMode === GameMods.Train ? GameMods.Play : GameMods.Train,
      }));
    };

    this.showLoginPopUp = () => {
      this.setState({
        popUp: GameMods.Show,
      });
    };

    this.hideLoginPopUp = () => {
      this.setState({
        popUp: GameMods.Hide,
      });
    };

    this.state = {
      playMode: GameMods.Train,
      popUp: GameMods.Hide,
      isAuthorized: false,
    };
  }

  componentDidMount(): void {
    updateStore();
    isAuth().then((res) => this.setState({ isAuthorized: res.status }));
  }

  relogIsAuth = (): void => {
    isAuth().then((res) => this.setState({ isAuthorized: res.status }));
  };

  render(): JSX.Element {
    return (
      <>
        <div>
          <HashRouter>
            <Header
              toggleMode={this.toggleMode}
              showLoginPopUp={this.showLoginPopUp}
              isAuthorized={this.state.isAuthorized}
              relogIsAuth={this.relogIsAuth}
            />
            <Content playMode={this.state.playMode} />
            <Login show={this.state.popUp} hideLoginPopUp={this.hideLoginPopUp} />
          </HashRouter>
        </div>
      </>
    );
  }
}
export default App;
