import React from 'react';
import { Link } from 'react-router-dom';

interface MenuListProps {
  category: string,
  id: string,
}

class MenuList extends React.Component<MenuListProps> {
  render(): JSX.Element {
    const { category, id } = this.props;
    return (
      <Link to={id}>
        <div className="menu__item text-style">{category}</div>
      </Link>
    );
  }
}

export default MenuList;
