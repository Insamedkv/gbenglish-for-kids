import React from 'react';
import NewWord from './newWord';

interface AdminNewCategoryProps {
  categoryId: string,
}

interface AdminNewCategoryState {
  isNewWordOpen: boolean,
}

class AdminNewWord extends React.Component<AdminNewCategoryProps, AdminNewCategoryState> {
  constructor(props: AdminNewCategoryProps | Readonly<AdminNewCategoryProps>) {
    super(props);
    this.state = {
      isNewWordOpen: false,
    };
  }

  toggle = (): void => {
    this.setState((previousState) => ({
      isNewWordOpen: !previousState.isNewWordOpen,
    }));
  };

  render(): JSX.Element {
    const { isNewWordOpen: isNewCategoryOpen } = this.state;
    const { categoryId } = this.props;
    return (
      <>
        <div className="addCategory content-cell">
          {isNewCategoryOpen ? <NewWord categoryId={categoryId} toggle={this.toggle} /> : (

            <div className="text-white bg-info bg-info--control">
              <div className="card-header text-style">Create new word</div>
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

export default AdminNewWord;
