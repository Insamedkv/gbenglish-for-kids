import React from 'react';
import NewCategory from './newCategory';

interface AdminNewCategoryState {
  isNewCategoryOpen: boolean,
}

class AdminNewCategory extends React.Component<Record<string, never>, AdminNewCategoryState> {
  constructor(props: Record<string, never> | Readonly<Record<string, never>>) {
    super(props);
    this.state = {
      isNewCategoryOpen: false,
    };
  }

  toggle = (): void => {
    this.setState((previousState) => ({
      isNewCategoryOpen: !previousState.isNewCategoryOpen,
    }));
  };

  render(): JSX.Element {
    const { isNewCategoryOpen } = this.state;
    return (
      <>
        <div className="addCategory content-cell">
          {isNewCategoryOpen ? <NewCategory toggle={this.toggle} /> : (
            <div className="text-white bg-info bg-info--control">
              <div className="card-header text-style">Create new category</div>
              <div
                role="menuitem"
                tabIndex={0}
                onFocus={() => undefined}
                onKeyDown={() => {}}
                className="card-body plus"
                onClick={this.toggle}
              >
                +
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default AdminNewCategory;
