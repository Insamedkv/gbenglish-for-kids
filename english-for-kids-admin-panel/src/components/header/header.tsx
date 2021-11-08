import React from 'react';
import '../../index.css';
import './header.css';
import Switcher from './switcherModule/switcher';
import HamburgerMenu from './hamburgerMenuModule/menu';

interface CategoryCardsState {
  dataFromChild: boolean
}

interface HeaderProps {
  toggleMode: () => void,
  showLoginPopUp: () => void,
  relogIsAuth: () => void
  isAuthorized: boolean,
}

class Header extends React.Component<HeaderProps, CategoryCardsState> {
  render(): JSX.Element {
    const { toggleMode, showLoginPopUp } = this.props;
    return (
      <header className="header">
        <HamburgerMenu showLoginPopUp={showLoginPopUp} isAuthorized={this.props.isAuthorized} relogIsAuth={this.props.relogIsAuth} />
        <div className="logo">English for kids</div>
        <div className="switcher-box">
          <Switcher toggleMode={toggleMode} />
        </div>
      </header>
    );
  }
}

export default Header;
