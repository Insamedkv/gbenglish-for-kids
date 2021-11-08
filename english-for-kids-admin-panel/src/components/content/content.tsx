import React from 'react';
import '../../index.css';
import {
  Route, Switch,
} from 'react-router-dom';
import './content.css';
import Main from '../main';
import CardsInCategory from './cardCategoryModule/cardsInCategory';
import { GameMods } from '../interfaces/appContext';
import AdminCategories from '../admin/adminContent';
import AdminCategoryWords from '../admin/wordsModule/adminCategoriesWords';

interface ContentProps {
  playMode: GameMods,
}

class Content extends React.Component<ContentProps> {
  render(): JSX.Element {
    const { playMode } = this.props;
    return (
      <>
        <div>
          <Switch>
            <Route
              exact
              path="/Admin-category/:categoryId"
              render={(props) => <AdminCategoryWords categoryId={props.match.params.categoryId} />}
            />
            <Route exact path="/Admin-category">
              <AdminCategories />
            </Route>
            <Route
              path="/:categoryId"
              exact
              render={(props) => <CardsInCategory categoryId={props.match.params.categoryId} playMode={playMode} />}
            />
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
        </div>
        <footer className="footer">
          <a className="git" href="https://github.com/Insamedkv" aria-hidden="true">
            <div className="git-logo" />
          </a>
          <div className="year">2021</div>
          <a className="school" href="https://rs.school/js/" aria-hidden="true">
            <div className="rs-logo" />
          </a>
        </footer>
      </>
    );
  }
}

export default Content;
