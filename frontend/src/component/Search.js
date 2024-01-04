import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyWord, setKeyWord] = useState('');
  const navigate = useNavigate()

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    console.log(keyWord);

    if (keyWord.trim()) {
      navigate(`/products/${keyWord}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <div className="container">
        <div className="row box-boder">
          <div className='col-8  mx-auto text-center my-1'>
            <input className='search'
              type="text"
              placeholder='Search a product...'
              name="searchInput"
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
          <div className='col-2 mx-auto text-center my-1'>
            <button type='submit' className='btn'><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
