import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardsProps {
  category: string,
  src: string,
  categoryId:string,
}

class CategoryCards extends React.Component<CategoryCardsProps> {
  render(): JSX.Element {
    const { category, src, categoryId } = this.props;
    return (
      <Link to={categoryId}>
        <div className="text-white bg-info mb-3">
          <div className="card-header text-style">{category}</div>
          <div className="card-body">
            <img className="card-img" src={src} alt="emotions" />
          </div>
        </div>
      </Link>
    );
  }
}

export default CategoryCards;
