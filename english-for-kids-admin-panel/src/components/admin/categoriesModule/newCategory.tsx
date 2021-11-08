import React from 'react';
import { updateStore } from '../../../store/helper';
import { createCategory } from '../apiClient';

export interface CategoryComponentInterface {
  categoryName: string,
}

interface NewCategoryProps {
  toggle: () => void
}

interface NewCategoryState {
  categoryName: string,
}

class NewCategory extends React.Component<NewCategoryProps, NewCategoryState> {
  constructor(props: NewCategoryProps) {
    super(props);
    this.state = {
      categoryName: '',
    };
    this.categoryNameChange = this.categoryNameChange.bind(this);
  }

  categoryNameChange(event: { target: { value: string; }; }): void {
    this.setState((prevState) => ({ ...prevState, categoryName: event.target.value }));
  }

  render(): JSX.Element {
    const { toggle } = this.props;
    const { categoryName } = this.state;
    return (
      <div className="text-white bg-info bg-info--control ">
        <div className="front">
          <div className="card-body">
            <form className="add-new-category">
              <div className="new-word">
                <div className="admin-category-name">Category name</div>
                <input type="input" name="category" className="form__field" value={categoryName} onChange={this.categoryNameChange} />
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

                {categoryName && (
                  <button
                    className="new-category-button"
                    type="submit"
                    onClick={async (event) => {
                      event.preventDefault();
                      await createCategory(categoryName);
                      await updateStore();
                      toggle();
                    }}
                  >
                    CREATE
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCategory;
