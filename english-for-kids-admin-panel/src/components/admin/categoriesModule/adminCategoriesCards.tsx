import React from 'react';
import { Link } from 'react-router-dom';
import { updateStore } from '../../../store/helper';
import { deleteCategory, updateCategory } from '../apiClient';
import { CategoryWithWords } from '../dataInterfaces';

interface CategoryCardProps {
  categoryWithWords: CategoryWithWords,
}

interface CategoryCardState {
  isCategoryUpdating: boolean,
  updatingCategoryName: string,
}

class AdminCategoryCard extends React.Component<CategoryCardProps, CategoryCardState> {
  constructor(props: CategoryCardProps) {
    super(props);
    this.state = {
      isCategoryUpdating: false,
      updatingCategoryName: '',
    };
    this.categoryUpdating = this.categoryUpdating.bind(this);
  }

  toggleUpdating = (): void => {
    this.setState((previousState) => ({
      isCategoryUpdating: !previousState.isCategoryUpdating,
      updatingCategoryName: this.props.categoryWithWords.categoryName,
    }));
  };

  categoryUpdating(event: { target: { value: string; }; }): void {
    this.setState((prevState) => ({ ...prevState, updatingCategoryName: event.target.value }));
  }

  render(): JSX.Element {
    const {
      categoryWithWords,
    } = this.props;

    const {
      isCategoryUpdating, updatingCategoryName,
    } = this.state;

    return (
      <div className="text-white bg-info bg-info--control">
        <div className="front">
          <div className="card-header text-style">
            {isCategoryUpdating ? (
              <input
                type="input"
                name="category"
                className="form__field"
                value={updatingCategoryName}
                onChange={this.categoryUpdating}
              />
            ) : categoryWithWords.categoryName}
          </div>
          <div className="card-body card-body--control">
            <div className="words-amount">
              {`Words amount: ${categoryWithWords.words.length}`}
            </div>

            <div className="category-control">
              {isCategoryUpdating ? (
                <>
                  <button
                    className="category-control-button"
                    type="button"
                    onClick={() => {
                      this.toggleUpdating();
                    }}
                  >
                    CANCEL
                  </button>

                  <button
                    className="category-control-button"
                    type="button"
                    onClick={async () => {
                      await updateCategory(updatingCategoryName, categoryWithWords.id);
                      await updateStore();
                      this.toggleUpdating();
                    }}
                  >
                    UPDATE
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="category-control-button"
                    type="button"
                    onClick={() => {
                      this.toggleUpdating();
                    }}
                  >
                    UPDATE
                  </button>

                  <Link to={`/Admin-category/${categoryWithWords.id}`} className="category-control-button">
                    <button
                      className="category-control-button"
                      type="button"
                    >
                      ADD WORD
                    </button>
                  </Link>

                  <button
                    className="category-control-button"
                    type="button"
                    onClick={async () => {
                      await deleteCategory(categoryWithWords.id);
                      await updateStore();
                    }}
                  >
                    DELETE
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminCategoryCard;
