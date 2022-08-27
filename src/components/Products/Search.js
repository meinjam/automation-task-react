import React from 'react';
import SearchIcon from '../../assets/img/search.svg';

const Search = ({
  handleSearch,
  searchTxt,
  setSearchTxt,
  fetchData,
  setSortName,
}) => {
  const handleRefreshData = () => {
    fetchData();
    setSearchTxt('');
    setSortName('');
    const newURL = window.location.href.split('?')[0];
    window.history.pushState('object', document.title, newURL);
  };

  return (
    <>
      <form onSubmit={handleSearch} className='mb-3'>
        <div className='input-group justify-content-end'>
          <input
            type='text'
            className=''
            placeholder='Search product'
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <button type='submit' className='input-group-text'>
            <img src={SearchIcon} alt='' />
          </button>
        </div>
        <button
          type='button'
          onClick={handleRefreshData}
          className='refresh ms-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-refresh'
            width={25}
            height={25}
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#ffffff'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
            <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
          </svg>
        </button>
      </form>
    </>
  );
};

export default Search;
