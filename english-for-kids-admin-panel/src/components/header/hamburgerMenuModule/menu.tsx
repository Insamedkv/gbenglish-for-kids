import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { StoreType } from '../../../store/store';
import { logout } from '../../admin/apiClient';
import { Category, CategoryWithWords } from '../../admin/dataInterfaces';
import MenuList from './menuList';

interface HamburgerMenuProps extends RouteComponentProps {
  showLoginPopUp: () => void,
  relogIsAuth: () => void,
  isAuthorized: boolean,
  categoriesWithWords: CategoryWithWords[] | null,
}

interface HamburgerMenuState {
  categories: Category[]
}

class HamburgerMenu extends React.Component<HamburgerMenuProps, HamburgerMenuState> {
  render(): JSX.Element {
    const {
      showLoginPopUp, relogIsAuth, categoriesWithWords, history,
    } = this.props;
    return (
      <Menu>
        <div
          className="menu-item menu__item text-style log-in"
          onClick={async () => {
            if (this.props.isAuthorized) {
              await logout();
              relogIsAuth();
              history.push('/');
              return;
            }
            showLoginPopUp();
          }}
          role="menuitem"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          {this.props.isAuthorized ? 'LOG OUT' : 'LOG IN'}
        </div>
        <Link to="/">
          <div className="menu-item menu__item text-style">Main page</div>
        </Link>
        {categoriesWithWords && categoriesWithWords
          .map((card) => <div key={card.id}><MenuList category={card.categoryName} id={card.id} /></div>)}
      </Menu>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  const { categoriesWithWords: { categoriesWithWords } } = state;
  return { categoriesWithWords };
};

export default withRouter(connect(mapStateToProps)(HamburgerMenu));
