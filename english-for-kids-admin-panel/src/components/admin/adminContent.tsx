import React from 'react';
import { connect } from 'react-redux';
import { AppDispatchType, StoreType } from '../../store/store';
import AdminCategoryCard from './categoriesModule/adminCategoriesCards';
import AdminNewCategory from './categoriesModule/adminNewCategory';
import { CategoryWithWords } from './dataInterfaces';

interface AdminCategoriesState {
  categoriesWithWords: CategoryWithWords[] | null
}

interface AdminCategoriesProps {
  categoriesWithWords: CategoryWithWords[] | null,
  dispatch: AppDispatchType,
}

class AdminCategories extends React.Component <AdminCategoriesProps, AdminCategoriesState> {
  render(): JSX.Element {
    const { categoriesWithWords } = this.props;
    return (
      <>
        <div className="content">
          {categoriesWithWords && categoriesWithWords.map((categoryWithWords) => (
            <div key={categoryWithWords.id} className="content-cell">
              <AdminCategoryCard categoryWithWords={categoryWithWords} />
            </div>
          ))}
          <AdminNewCategory />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  const { categoriesWithWords: { categoriesWithWords } } = state;
  return { categoriesWithWords };
};

export default connect(mapStateToProps)(AdminCategories);
