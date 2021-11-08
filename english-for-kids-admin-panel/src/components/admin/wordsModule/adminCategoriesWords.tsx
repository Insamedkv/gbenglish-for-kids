import React from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../../store/store';
import AdminNewWord from './adminNewWord';
import { CategoryWithWords } from '../dataInterfaces';
import WordInCategory from './wordInCategory';

interface CategoryCardsProps {
  categoryId: string,
  categoriesWithWords: CategoryWithWords[] | null
}

class AdminCategoryWords extends React.Component<CategoryCardsProps> {
  render(): JSX.Element {
    const { categoryId, categoriesWithWords } = this.props;
    const categoryWithWords = categoriesWithWords?.find((el) => el.id === categoryId);
    return (
      <>
        <div className="admin-category">
          {`Category: ${categoryWithWords?.categoryName}`}
        </div>
        <div className="content">
          {categoryWithWords?.words.map((word) => <WordInCategory key={word.id} word={word} categoryId={categoryId} />)}
          <AdminNewWord categoryId={categoryId} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  const { categoriesWithWords: { categoriesWithWords } } = state;
  return { categoriesWithWords };
};

export default connect(mapStateToProps)(AdminCategoryWords);
