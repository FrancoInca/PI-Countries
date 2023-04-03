import React from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
const Searchbar = ({countries}) => {
  const {search} = useLocation();
  const {page} = useParams();
  const arrayLength = countries;
  const totalPages = Math.ceil(arrayLength / 10);
  const nextPage = () => {
    if (page * 10 >= arrayLength) return parseInt(page);
    return parseInt(page) + 1;
  };
  const prevPage = () => {
    if (page > 1) return parseInt(page) - 1;
    return parseInt(page);
  };
  const nextPageValue = nextPage();
  const prevPageValue = prevPage();
  return (
    <>
      <Link to={`/home/${prevPageValue}${search}`}>
        <button>{'<'}</button>
      </Link>
      <h1>
        {page} / {totalPages ? totalPages : 1}
      </h1>
      <Link to={`/home/${nextPageValue}${search}`}>
        <button>{'>'}</button>
      </Link>
    </>
  );
};
export default Searchbar;
