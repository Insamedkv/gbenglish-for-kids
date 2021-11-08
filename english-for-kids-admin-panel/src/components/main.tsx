import React from 'react';
import { getCategoriesAndWords } from './admin/apiClient';
import { CategoryWithWords } from './admin/dataInterfaces';
import CategoryCards from './content/categoryModule/categoryCards';

interface MainState {
  categories?: CategoryWithWords[]
}

class Main extends React.Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount(): void {
    getCategoriesAndWords().then((categories) => this.setState({ categories }));
  }

  render(): JSX.Element {
    const { categories } = this.state;
    return (
      <div className="content">
        {categories && categories.filter((categoryWithWords) => categoryWithWords.words.length !== 0).map((card) => (
          <div key={card.id}>
            <CategoryCards src={card.words[0].image} category={card.categoryName} categoryId={card.id} />
          </div>
        ))}
      </div>
    );
  }
}

export default Main;
